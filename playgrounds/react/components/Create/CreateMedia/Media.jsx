import MediaReel from "./MediaReel";

function Media({ files, setFiles }) {
  // const [showCamera, toggleShowCamera] = useState(false);
  return (
    <div id="media-container">
      {/* {showCamera ? (
        <Camera
          images={files}
          setImages={setFiles}
          hideCamera={() => toggleShowCamera(false)}
        />
      ) : (
        <> */}
      <MediaReel images={files} setImages={setFiles} />
      {/* </>
      )}
      <ToggleShowCameraButton toggleShowCamera={() => toggleShowCamera(!showCamera)} showCamera={showCamera} /> */}
    </div>
  );
}

export default Media;
