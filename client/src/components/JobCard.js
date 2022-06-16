import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import { useGlobalContext } from "../context/appContext";

const JobCard = ({
  _id: id,
  position,
  company,
  contactPerson,
  location,
  applicationDate,
  comment,
  url,
  status,
  createdAt,
}) => {
  const navigate = useNavigate();
  const { deleteJob } = useGlobalContext();

  return (
    <article className={status}>
      <h5>{position}</h5>
      <p>{company}</p>
      <p>{contactPerson}</p>
      <p>{location}</p>
      <p>{comment}</p>
      {url && (
        <a href={url} target="_blank" rel="noreferrer">
          job ad
        </a>
      )}
      <p>applied for on {moment(applicationDate).format("MMMM Do, YYYY")}</p>
      <p>added {moment(createdAt).fromNow()}</p>
      <div>
        <button onClick={() => navigate(`/edit/${id}`)} title="Edit job">
          <FaEdit />
        </button>
        <button type="button" onClick={() => deleteJob(id)} title="Delete job">
          <FaTrashAlt />
        </button>
      </div>
    </article>
  );
};

export default JobCard;
