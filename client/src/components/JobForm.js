import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import { useGlobalContext } from "../context/appContext";

const JobForm = ({ jobId }) => {
  const { isLoading, singleJob, createJob, editJob, editComplete } =
    useGlobalContext();

  const initialFormData = jobId
    ? singleJob
    : {
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

  const setInitialFormData = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    jobId ? editJob(jobId, formData) : createJob(formData, setInitialFormData);
  };

  useEffect(() => {
    if (jobId && singleJob) setFormData(singleJob);
  }, [jobId, singleJob]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="position"
          value={formData?.position}
          handleChange={handleChange}
          label="Position*"
        />
        <FormInput
          name="company"
          value={formData?.company}
          handleChange={handleChange}
          label="Company*"
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
          <>
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">pending</option>
              <option value="interview">interview</option>
              <option value="declined">declined</option>
            </select>
          </>
        )}
        <button type="submit" disabled={isLoading}>
          {jobId ? "Save changes" : "Add job"}
        </button>
        {editComplete && <p className="success">Edit successful!</p>}
      </form>
      <button onClick={setInitialFormData}>
        {jobId ? "Reset" : "Clear form"}
      </button>
    </>
  );
};

export default JobForm;
