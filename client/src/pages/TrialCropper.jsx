import React, { Children, useState } from "react";
import FileInput from "../components/CropPhotoTrial/FileInput";
import CustomModal from "../components/CropPhotoTrial/Modal";

const TrialCropper = () => {
  const [image, setImage] = useState("");
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    furni_id: "",
    furni_name: "",
    space_cat: "",
    sub_space_cat: "",
    detail_material: "",
    furni_desc: "",
    furni_dimension: ['', '', ''],
    furni_picture: { public_id: "", url: "" },
    furni_type: "",
    furni_style: "",
    material_tag: [],
    vectary_link: "",
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  // Callback function when an image is selected
  const onImageSelected = (selectedImg) => {
    setImage(selectedImg);
    setIsOpen(true);
  };

  // Callback function when cropping is done
  const onCropDone = (imgCroppedArea) => {
    const canvasWidth = 200;
    const canvasHeight = 200;
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
        canvasHeight
      );

      // Convert the canvas content to a data URL (base64)
      const dataURL = canvasEle.toDataURL();

      setImgAfterCrop(dataURL);
      setIsOpen(false);
      console.log(imgAfterCrop);

      // Set the imageURL to input form hidden
      // Get the input element by its id
      var inputElement = document.getElementById("url-image-input");

      // Set the value of the input element
      inputElement.value = "Hello, World!";
    };
  };

  // Callback function when cropping is done
  const onCropCancel = () => {};

  return (
    <div className="container">
      <div
        className="furni-picture-inner-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FileInput onImageSelected={onImageSelected} />
        <div className="cropped-container">
          <img style={{ borderRadius: "15px" }} src={imgAfterCrop} />
          <input id="url-image-input" value={formData.furni_picture} onChange={handleChange} name="furni_pic" />
        </div>
      </div>
      <CustomModal
        onCropDone={onCropDone}
        onCropCancel={onCropCancel}
        image={image}
        isOpen={isOpen}
        onClose={closeModal}
      >
        This is the content of the modal.
      </CustomModal>
    </div>
  );
};

export default TrialCropper;
