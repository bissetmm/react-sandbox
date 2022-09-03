import React, { useRef } from "react";
import { render } from "react-dom";

const PageB = () => {
  const inputRef = useRef(null);

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
  };

  const fileUpload = () => {
    console.log(inputRef.current);
    inputRef.current.click();
    
  };

  return (
    <div>
      <button onClick={fileUpload}>ファイルアップロード</button>
      <input
        hidden
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onFileInputChange}
      />
    </div>
  )
};

export default PageB;
