import React, { useState } from "react";

const ReadMoreLess = ({ text, length, buttonStyle = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault()
    e.stopPropagation(); // Prevent parent click handler
    setIsExpanded(!isExpanded);
  };
  
  if(!text){
    return // there is nothing here, so don't bother
  }

  const displayedText = isExpanded ? text : text.slice(0, length);
  return (
    <div>
      <p>
        {displayedText}
        {text.length > length && !isExpanded && "..."}
      </p>
      {text.length > length && (
        <button
          style={{ 
            border: "none", 
            background: "none", 
            color: "blue", 
            cursor: "pointer", 
            padding: 0, 
            ...buttonStyle 
          }}
          onClick={handleToggle}
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ReadMoreLess;
