const FormInput = ({ name, label, type, value, handleChange }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        id={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
