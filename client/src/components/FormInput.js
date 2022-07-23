import { useGlobalContext } from "../context/appContext";

const FormInput = ({ name, label, type, value, handleChange, required }) => {
  const { isLoading } = useGlobalContext();
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
        disabled={isLoading}
      />
    </div>
  );
};

export default FormInput;
