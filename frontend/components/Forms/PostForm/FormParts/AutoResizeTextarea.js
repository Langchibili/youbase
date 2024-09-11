import React, { useState } from 'react';

const AutoResizeTextarea = (props) => {
  const [text, setText] = useState('');

  const handleInput = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    setText(e.target.value)
    props.setPostDescription(e.target.value);
  };


  return (
    // <textarea
    //   placeholder={props.description.length > 0? props.description : props.descriptionPlaceholder}
    //   value={text}
    //   onChange={handleInput}
    //   rows={1}
    //   style={{
    //     width: '100%',
    //     border: 'none',
    //     outline: 'none',
    //     resize: 'none',
    //     overflow: 'hidden',
    //     fontSize: '16px',
    //     lineHeight: '1.5',
    //   }}
    // />
    <textarea
  value={props.description || ""}
  // in case of title, description is title
  placeholder={props.description && props.description.length > 0 ? '' : props.descriptionPlaceholder}
  onChange={(e) => props.setPostDescriptionOrTitle(e.target.value)}
  style={{
    border: props.bordered === "yes"? '1 px solid gray' : 'none',
    outline: 'none',
    width: '100%',
    height: 'auto',
    resize: 'none',
    marginTop:"10px",
    padding: props.bordered === "yes"? "10px" : "none",
    fontSize: '16px',
    lineHeight: '1.5',
  }}
/>
  )
};

export default AutoResizeTextarea;
