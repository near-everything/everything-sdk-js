import { useRef } from "react";
import Webcam from "react-webcam";
import CameraOverlay from "./CameraOverlay";

function Camera({ hideCamera, images, setImages }) {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const base64Data = new Buffer.from(
      imageSrc.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const file = {
      data: {
        type: "image/jpeg"
      },
      base64: true,
      body: base64Data,
      url: imageSrc
    };
    setImages([...images, file]);
  };

  return (
    <div className="relative">
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <CameraOverlay
        capture={capture}
        hideCamera={hideCamera}
        images={images}
      />
    </div>
  );
}

export default Camera;
