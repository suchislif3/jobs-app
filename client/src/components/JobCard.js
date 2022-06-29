import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaTrashAlt, FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { MdLocationPin, MdNotInterested } from "react-icons/md";
import { ImOffice } from "react-icons/im";
import { GrContactInfo, GrNote } from "react-icons/gr";
import { BsCalendarCheck } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { HiOutlineChatAlt2 } from "react-icons/hi";

import { useGlobalContext } from "../context/appContext";
import { Wrapper } from "../styles/JobCard.styles";

const JobCard = ({
  _id: jobId,
  position,
  company,
  contactPerson,
  location,
  applicationDate,
  comment,
  url,
  status,
  createdAt,
  cardHeight,
}) => {
  const navigate = useNavigate();
  const { deleteJob } = useGlobalContext();

  return (
    <Wrapper className="job-card" status={status} height={cardHeight}>
      <div>
        <h5 className="ellipsis">{position}</h5>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Open job ad"
            className="btn url"
          >
            <FaExternalLinkAlt />
          </a>
        )}
        <div className="item">
          <ImOffice className="icon" title="company" />
          <span className="ellipsis">{company}</span>
        </div>
        {location && (
          <div className="item">
            <MdLocationPin className="icon" title="location" />
            <span className="ellipsis">{location}</span>
          </div>
        )}
        {contactPerson && (
          <div className="item">
            <GrContactInfo className="icon" title="contact person" />
            <span className="ellipsis">{contactPerson}</span>
          </div>
        )}
        <div className="item">
          <BsCalendarCheck className="icon" title="application date" />
          <span className="ellipsis">
            {moment(applicationDate).format("MMMM Do, YYYY")}
          </span>
        </div>
        {comment && (
          <div className="item">
            <GrNote className="icon" title="comment" />
            <span className="ellipsis-multiline">{comment}</span>
          </div>
        )}
        <span className="created-at">added {moment(createdAt).fromNow()}</span>
      </div>
      <div>
        <div className="status-bar" title="status">
          <div className={`${status} status-base with-icon`}>
            {status === "pending" && <CgSandClock />}
            {status === "declined" && <MdNotInterested />}
            {status === "interview" && <HiOutlineChatAlt2 />}
            {status}
          </div>
        </div>
        <div className="job-actions">
          <button
            onClick={() => navigate(`/edit/${jobId}`)}
            title="Edit job"
            className="btn secondary-btn with-icon"
          >
            <FaEdit />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => deleteJob(jobId)}
            title="Delete job"
            className="btn delete-btn with-icon"
          >
            <FaTrashAlt />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default JobCard;
