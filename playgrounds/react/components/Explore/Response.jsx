
function Response({ data, error }) {
  return (
    <>
      <p className="pb-1">response:</p>
      <textarea
        className="textarea h-full w-full"
        disabled
        value={
          "" ||
          (data && JSON.stringify(data, null, 2)) ||
          (error && JSON.stringify(error, null, 2))
        }
      />
    </>
  );
}

export default Response;
