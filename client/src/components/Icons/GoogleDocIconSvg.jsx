import GoogleDocIcon from "../../images/GoogleDocsLogo.svg";
import "./GoogleDocIcon.css";

const GoogleDocsLogoSvg = ({ teamBrief }) => {
  return (
    <div className="icons-container">
      <a className="google-doc-project-brief-icon" href={teamBrief}>
        <img src={GoogleDocIcon} alt="google-doc-project-brief-icon-img" />
      </a>
    </div>
  );
};

export default GoogleDocsLogoSvg;
