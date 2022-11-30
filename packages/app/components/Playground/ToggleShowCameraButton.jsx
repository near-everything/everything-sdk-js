// import { faCamera } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToggleShowCameraButton({ showCamera, toggleShowCamera }) {
  return (
    <div className="relative">
      <div className="absolute bottom-4 left-4 z-50">
        <div className="flex justify-center items-center">
          <button
            className="btn btn-primary btn-circle text-gray-200 shadow-lg"
            onClick={toggleShowCamera}
          >
            {showCamera ? "Upload" : "Camera"}
            {/* <FontAwesomeIcon size="xl" icon={faCamera} /> */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToggleShowCameraButton;
