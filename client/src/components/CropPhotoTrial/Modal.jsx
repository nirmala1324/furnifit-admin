// Modal.js
import React, { useState } from "react";
import { Modal, Button } from "@mui/material";
import Cropper from "react-easy-crop";

const CustomModal = ({
  isOpen,
  onClose,
  children,
  image,
  onCropDone,
  onCropCancel,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(1 / 1);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    // Store the cropped area in pixels
    setCroppedArea(croppedAreaPixels);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="cropper">
        <h2 id="modal-modal-title">Modal</h2>
        <div className="image-cropper-container">
          {/* Image Cropper Component */}
          <Cropper
            image={image}
            aspect={aspectRatio}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: "100%",
                height: "80%",
                backgroundColor: "#fff",
              },
            }}
          />
        </div>

        <div className="action-buttons">
          <div className="close-button">
            <Button variant="primary" size="small" onClick={onCropCancel}>
              Close
            </Button>
          </div>
          <div className="apply-button">
            <Button variant="primary" size="small" onClick={() => { onCropDone(croppedArea) }}>
              Crop & Apply
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CustomModal;
