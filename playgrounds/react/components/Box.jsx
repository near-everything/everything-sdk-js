function Box({ children }) {
  return (
    <div className="border border-base-300 bg-base-100 rounded-box p-4 flex flex-1 flex-col">
      {children}
    </div>
  );
}

export default Box;
