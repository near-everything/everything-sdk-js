function Collapse({ tabIndex, title, checked, setChecked, children }) {
  return (
    <div
      tabIndex={tabIndex}
      className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box"
    >
      <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
      <div className="collapse-title text-xl font-medium">
        {title}
      </div>
      <div className="collapse-content">
        {children}
      </div>
    </div>
  );
}

export default Collapse;
