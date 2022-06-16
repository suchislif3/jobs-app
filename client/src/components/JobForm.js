import { useState } from "react";
import FormInput from "./FormInput";
import { useGlobalContext } from "../context/appContext";

const JobForm = () => {
  const initialFormData = {
    position: "",
    company: "",
    contactPerson: "",
    location: "",
    applicationDate: new Date().toLocaleDateString("en-CA"),
    comment: "",
    url: "",
  };
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const { isLoading, createJob } = useGlobalContext();

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const clearForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createJob(formData, clearForm);
  };

  return (
    <>
      {isOpen && (
        <form onSubmit={handleSubmit}>
          <FormInput
            name="position"
            value={formData.position}
            handleChange={handleChange}
            label="Position*"
          />
          <FormInput
            name="company"
            value={formData.company}
            handleChange={handleChange}
            label="Company*"
          />
          <FormInput
            name="contactPerson"
            value={formData.contactPerson}
            handleChange={handleChange}
            label="Contact person"
          />
          <FormInput
            name="location"
            value={formData.location}
            handleChange={handleChange}
            label="Location"
          />
          <FormInput
            name="applicationDate"
            type="date"
            value={formData.applicationDate}
            handleChange={handleChange}
            label="Application date*"
          />
          <FormInput
            name="comment"
            value={formData.comment}
            handleChange={handleChange}
            label="Comment"
          />
          <FormInput
            name="url"
            type="url"
            value={formData.url}
            handleChange={handleChange}
            label="URL"
          />
          <button type="submit" disabled={isLoading}>
            Add job
          </button>
        </form>
      )}
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {isOpen ? "Hide form" : "Add new job"}
      </button>
    </>
  );
};

export default JobForm;
