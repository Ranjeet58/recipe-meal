import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import '../styles/TopHeading.scss'

const SectionTopHeading = ({ title, linkUrl }) => {
  return (
    <div className="app__heading">
      <h4>{title}</h4>
      <Link to={linkUrl} className="cta">
        <span className="hover-underline-animation"> View All </span>
        <svg
          id="arrow-horizontal"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="10"
          viewBox="0 0 46 16"
        >
          <path
            id="Path_10"
            data-name="Path 10"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            transform="translate(30)"
          ></path>
        </svg>
      </Link>
    </div>
  );
};

SectionTopHeading.prototype = {
  title: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
};

export default SectionTopHeading;
