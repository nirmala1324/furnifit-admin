import { Button } from "@mui/material";
import React, { useRef } from "react";

const FileInput = ({ onImageSelected }) => {
  const inputRef = useRef();

  // Handle the change event when a file is selected
  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (e) {
            onImageSelected(reader.result)
        };
    }
  };

  const onChooseImage = () => {
      inputRef.current.click();
  };

  return (
    <>
      <div>
        {/* Hidden file input element */}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleOnChange}
          style={{ display: "none" }}
        />
      </div>

        {/* Button to trigger open modal */}
      <Button color="primary" variant="contained" size="small" className="btn-modal"  onClick={onChooseImage}>Choose Image</Button>
    </>
  );
};

export default FileInput;
