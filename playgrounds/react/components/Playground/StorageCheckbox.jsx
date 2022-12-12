function StorageCheckbox({name, disabled = false, checked, setChecked}) {
  return (<div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text">{name}</span>
    <input
      type="checkbox"
      disabled={disabled}
      checked={checked}
      className="checkbox"
      onChange={setChecked}
    />
  </label>
</div>)
}

export default StorageCheckbox;