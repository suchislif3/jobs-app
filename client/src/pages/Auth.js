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
  const { register, login, errorMessage, clientErrorMessage } =
    useGlobalContext();

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
    <Page display="centered">
      <form onSubmit={handleSubmit} className="auth">
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
        {clientErrorMessage && <p className="error">{clientErrorMessage}</p>}
        <button type="submit" className="btn primary-btn">
          {isRegister ? "Register" : "Login"}
        </button>
        <div className="auth-mode">
          <span>
            {isRegister ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button
            type="button"
            onClick={toggleIsRegister}
            className="btn secondary-btn"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </Page>
  );
};

export default Auth;
