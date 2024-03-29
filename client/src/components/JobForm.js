import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { useGlobalContext } from "../context/appContext";

const JobForm = ({ jobId }) => {
  const {
    isLoading,
    singleJob,
    createJob,
    editJob,
    editComplete,
    clientErrorMessage,
    setClientErrorMessage,
  } = useGlobalContext();

  const initialFormData = {
    position: "",
    company: "",
    contactPerson: "",
    location: "",
    applicationDate: new Date().toLocaleDateString("en-CA"),
    comment: "",
    url: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData(jobId ? singleJob : initialFormData);
    setClientErrorMessage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    jobId ? editJob(jobId, formData) : createJob(formData, resetForm);
  };

  useEffect(() => {
    if (jobId && singleJob) setFormData(singleJob);
  }, [jobId, singleJob]);

  return (
    <form onSubmit={handleSubmit}>
      <h4>{jobId ? "Edit job" : "New job"}</h4>
      <FormInput
        name="position"
        value={formData?.position}
        handleChange={handleChange}
        label="Position*"
        required
      />
      <FormInput
        name="company"
        value={formData?.company}
        handleChange={handleChange}
        label="Company*"
        required
      />
      <FormInput
        name="contactPerson"
        value={formData?.contactPerson}
        handleChange={handleChange}
        label="Contact person"
      />
      <FormInput
        name="location"
        value={formData?.location}
        handleChange={handleChange}
        label="Location"
      />
      <FormInput
        name="applicationDate"
        type="date"
        value={formData?.applicationDate}
        handleChange={handleChange}
        label="Application date*"
      />
      <FormInput
        name="comment"
        value={formData?.comment}
        handleChange={handleChange}
        label="Comment"
      />
      <FormInput
        name="url"
        type="url"
        value={formData?.url}
        handleChange={handleChange}
        label="URL"
      />
      {jobId && (
        <div className="form-input">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="pending">pending</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
          </select>
        </div>
      )}
      {clientErrorMessage && <p className="error">{clientErrorMessage}</p>}
      <div className="form-btns">
        <button type="submit" disabled={isLoading} className="btn primary-btn">
          {jobId ? "Save changes" : "Add job"}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="btn reset-btn"
          disabled={isLoading}
        >
          {jobId ? "Reset" : "Clear form"}
        </button>
      </div>
      {editComplete && <p className="success">Edit successful!</p>}
    </form>
  );
};

export default JobForm;
