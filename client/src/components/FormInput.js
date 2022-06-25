const FormInput = ({ name, label, type, value, handleChange, required }) => {
  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        id={name}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default FormInput;
