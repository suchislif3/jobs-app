import { Link } from "react-router-dom";

import { Page } from "../styles/App.styles";
import main from "../assets/main.svg";

const Home = () => {
  return (
    <Page display="grid">
      <div className="info">
        <h1>Job Tracking App</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad
          cupiditate et distinctio nemo dolor? Nihil iste nesciunt consequatur,
          eaque eius voluptatem qui ut quia perspiciatis impedit maiores,
          pariatur debitis. Et?
        </p>
        <Link to="/auth" className="btn primary-btn">
          Login
        </Link>
      </div>
      <img src={main} alt="job interview" className="job-interview-img" />
    </Page>
  );
};

export default Home;
