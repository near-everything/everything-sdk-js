function RadioButton({ label, group, checked, setChecked, disabled = false }) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text mr-2">{label}</span>
        <input
          type="radio"
          name={group}
          className="radio"
          checked={checked}
          onChange={() => setChecked(!checked)}
          disabled={disabled}
        />
      </label>
    </div>
  );
}

export default RadioButton;
