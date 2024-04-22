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
        onImageSelected(reader.result);
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

      <div className="theButton" style={{ width: "100%" }}>
        {/* Button to trigger open modal */}
        <Button
          aria-required
          sx={{ mt: 1.5 }}
          color="violet"
          variant="contained"
          size="small"
          className="btn-modal"
          onClick={onChooseImage}
        >
          Choose Image
        </Button>
      </div>
    </>
  );
};

export default FileInput;
