import { useState } from "react";

import { useGlobalContext } from "../context/appContext";
import FormInput from "../components/FormInput";
import { Page } from "../styles/App.styles";

const Auth = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const { register, login, errorMessage } = useGlobalContext();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    if (isRegister) {
      register({ name, email, password });
    } else {
      login({ email, password });
    }
  };

  const toggleIsRegister = () => {
    setIsRegister((prev) => !prev);
  };
  return (
    <Page>
      <form onSubmit={handleSubmit}>
        <h4>{isRegister ? "Register" : "Login"}</h4>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {isRegister && (
          <FormInput
            name="name"
            label="Name"
            value={formData.name}
            handleChange={handleChange}
          />
        )}
        <FormInput
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          handleChange={handleChange}
        />
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <p>
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button type="button" onClick={toggleIsRegister}>
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </Page>
  );
};

export default Auth;
