const FormInput = ({ name, type, value, placeholder, handleChange }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        name={name}
        type={type}
        value={value}
        id={name}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormInput;
