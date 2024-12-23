"use client"

import React from 'react';
import ContactSupportForm from '@/components/Forms/ContactSupportForm/ContactSupportForm';
import ContentDisplaySection from '@/components/Includes/ContentDisplay/ContentDisplaySection';
import { api_url } from '@/Constants';
import PortraitContentDisplay from '@/components/Includes/ContentDisplay/PortraitContentDisplay';
import { useUser } from "@/Contexts/UserContext";
import LandscapeContent from '@/components/Includes/ContentDisplay/LandscapeContent';

const Support = () => {
  const loggedInUser = useUser()
  const nextComponent = (props)=>{
    return  <ContentDisplaySection
                loggedInUser={loggedInUser}
                contentDisplay={(props)=><PortraitContentDisplay content={props.content} loggedInUser={props.loggedInUser} />}
                contentUri={api_url+"/posts"}
                totalPages={10}
                limit={20}
                contentQueryFilters='populate=user,featuredImages,media'
              />
  }
  return (
    <>
    <ContactSupportForm/>
    <ContentDisplaySection
      loggedInUser={loggedInUser}
      contentDisplay={(props)=><PortraitContentDisplay content={props.content} loggedInUser={props.loggedInUser} />}
      contentUri={api_url+"/posts"}
      totalPages={8}
      limit={10}
      // nextSectionToDisplay={(props)=> nextComponent(props)}
      contentQueryFilters='populate=user,featuredImages,media'
    />
    <ContentDisplaySection
      loggedInUser={loggedInUser}
      contentDisplay={(props)=><LandscapeContent content={props.content} loggedInUser={props.loggedInUser} />}
      contentUri={api_url+"/posts"}
      contentQueryFilters='populate=user,featuredImages,media'
    />
    
    </>
  );
};
//contentQueryFilters
// contentUri, // the actual content uri to use to get the content, the filters and oder bys, the query itself
// limit = 10, // this is the conent pageSize 
// totalPages = 1000000, // we have to provide the total number of pages, default makes it practicaly endless
// contentDisplay = (props)=>{ return <></> },
// nextSectionToDisplay = ()=>{ return <></> } // th
export default Support;
