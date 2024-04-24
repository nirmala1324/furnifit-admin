import React, { Children, useState } from "react";
import FileInput from "../components/CropPhotoTrial/FileInput";
import CustomModal from "../components/CropPhotoTrial/Modal";

const TrialCropper = () => {
  const [image, setImage] = useState("");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  // Callback function when an image is selected
  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setIsOpen(true)
  };

  // Callback function when cropping is done
  const onCropDone = (imgCroppedArea) => {
    const canvasWidth = 500;
    const canvasHeight = 500;
    // Create canvas element to crop the image
    const canvasEle = document.createElement("canvas");
    canvasEle.width = canvasWidth;
    canvasEle.height = canvasHeight;

    const context = canvasEle.getContext("2d");

    // Load the selected image
    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
        // Draw the cropped portion of the image onto teh canvas
        context.drawImage(
            imageObj1,
            imgCroppedArea.x,
            imgCroppedArea.y,
            imgCroppedArea.width,
            imgCroppedArea.height,
            0,
            0,
            canvasWidth,
            canvasHeight,
        );

        // Convert the canvas content to a data URL (base64)
        const dataURL = canvasEle.toDataURL()

        setImgAfterCrop(dataURL)
        setIsOpen(false)
        console.log(imgAfterCrop)
    }
  }

  // Callback function when cropping is done
  const onCropCancel = () => {}

  return (
    <div className="container">
      <FileInput onImageSelected={onImageSelected} />
      <div className="cropped-container">
        <img src={imgAfterCrop} alt="cropped-img" />
      </div>
      <CustomModal onCropDone={onCropDone} onCropCancel={onCropCancel} image={image} isOpen={isOpen} onClose={closeModal}>
        This is the content of the modal.
      </CustomModal>
    </div>
  );
};

export default TrialCropper;
