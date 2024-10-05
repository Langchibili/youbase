'use client'

import React, { useState } from 'react';

const AutoResizeTextarea = (props) => {
  const [text, setText] = useState('');

  const handleInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setText(e.target.value)
    props.setPostDescription(e.target.value);
  };

  const renderTextArea = ()=>{
    if(props.bordered === "yes"){
        return (<textarea
          value={props.description || ""}
          // in case of title, description is title
          placeholder={props.description && props.description.length > 0 ? '' : props.descriptionPlaceholder}
          onChange={(e) => props.setPostDescriptionOrTitle(e.target.value)}
          style={{
            border: props.bordered === "yes"? '1 px solid lightgray' : 'none',
            outline: 'none',
            width: '100%',
            height: 'auto',
            resize: 'none',
            marginTop:"10px",
            fontWeight:'lighter',
            borderColor:'ghostwhite',
            padding: props.bordered === "yes"? "10px" : "none",
            fontSize: '16px',
            lineHeight: '1.5',
          }}
        />)
    }
    else{
      return (<textarea
              value={props.description || ""}
              // in case of title, description is title
              placeholder={props.description && props.description.length > 0 ? '' : props.descriptionPlaceholder}
              onChange={(e) => props.setPostDescriptionOrTitle(e.target.value)}
              style={{
                border:'none',
                outline: 'none',
                width: '100%',
                height: '50vh',
                resize: 'none',
                marginTop:"10px",
                fontSize: '16px',
                lineHeight: '1.5',
              }}
            />)
          // return(
          //   <div className="ui form swdh30">
          //     <div className="field">
          //       <textarea
          //         rows={3}
          //         name="description"
          //         id="id_about"
          //         placeholder="Write a little description about you..."
          //         style={{ height: 39 }}
          //         defaultValue={""}
          //       />
          //     </div>
          //   </div>
          // )
    }
  }
  return renderTextArea()
}



export default AutoResizeTextarea;
