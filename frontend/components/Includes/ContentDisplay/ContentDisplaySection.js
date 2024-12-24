
// // /* READ ABOUT THIS COMPONENT BELOW */

import React, { useEffect, useState, useRef } from "react";
import MoreContentLoader from "../Loader/MoreContentLoader";
import NoContent from "../NoContent/NoContent";



const ContentDisplaySection = ({
  contentUri,
  contentQueryFilters = "",
  limit = typeof window !== "undefined" && window.innerWidth < 700 ? 5 : 10, // smaller screens 5, larger 10 default
  totalPages = 1000000,
  loggedInUser,
  showEmptyContentMessage = false,
  emptyContentMessage = "",
  contentDisplay = (props) => <></>,
  nextSectionToDisplay = (props) => <></>
}) => {
  const [sections, setSections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [canShowEmptyContentMessage,setCanShowEmptyContentMessage] = useState(false)
  const loaderRef = useRef(null);
  

  const fetchContent = async (page) => {
    try {
      setIsLoading(true);
      const queryFilters = contentQueryFilters? contentQueryFilters+"&" : ""
      const response = await fetch(
        `${contentUri}?${queryFilters}pagination[page]=${page}&pagination[pageSize]=${limit}`
      );
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Failed to fetch content:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

 const updateSections = (newPage, newContent) => {
    setSections((prev) => [...prev, { page: newPage, content: newContent }]);
 };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMoreContent && !isLoading) {
        setCurrentPage((prev) => prev + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMoreContent, isLoading]);

  useEffect(() => {
    const runFetchContent = async () => {
      if (!hasMoreContent) return;

      const newContent = await fetchContent(currentPage);
      if(showEmptyContentMessage && newContent.length === 0 && currentPage === 1){
        setCanShowEmptyContentMessage(true)
      }
      if (newContent.length === 0 || currentPage >= totalPages) {
        setHasMoreContent(false);
      } else {
        updateSections(currentPage,newContent)
      }
    };

    runFetchContent();
  }, [currentPage, totalPages, hasMoreContent]);

  
  if(canShowEmptyContentMessage){
    return <NoContent message={emptyContentMessage}/>
  }
  return (
    <div>
      {sections.map((section)=>{
        
  console.log("section-" + section);
           return (<div key={section.page} style={{marginBottom:'10px'}}>
                     {contentDisplay({content:section.content,loggedInUser:loggedInUser})}
                  </div>)
      })}
      {hasMoreContent ? (
        <div
          ref={loaderRef}
          style={{ height: 100, background: "#f0f0f0", marginTop: 20 }}
        ></div>
      ) : (
        nextSectionToDisplay()
      )}
      {isLoading && <MoreContentLoader />}
    </div>
  );
};

export default ContentDisplaySection;



// // /*  IMPORTANT INFO TO NOTE FOR MYSELF IN THE FUTURE

// // since the return object of the content when reaches the limit is an
// // empty array, like {data:[]} then we do not need to use the explicit
// // contentLimit prop stop getting the content and display the next section

// // you don't have to use the start and limit strapi pagination styles
// // because in the query filters you can use something like
// // id > 10 0r id < 10 just like you can use id=10, which will
// // begin the content from a certain id

// // the  totalPages = 1000000 is just the setting for the total number 
// // of pages of content you would desire to display(content pages, not sections)
// // so if you just want to display one page of say limt=10, then if there
// // is 100 pages of the content, only 1 page with 10 content shall show
// // id limit=100 then all shall show

// // we must load the first page of the content by default, because the aim 
// // of using this component is to display content anyway

// // such that with that, if you set the totalPages to 1, then at least you
// // get to show the content once
// // */