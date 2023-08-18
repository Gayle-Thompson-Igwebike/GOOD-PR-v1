import DeployedAppIcon from "../../images/DeployedSite.svg";
import "./DeployedAppIconSvg.css";

const DeployedAppIconSvg = ({ teamSite }) => {
  return (
    <div className="icons-container">
      <a className="deployed-site-icon" href={teamSite}>
        <img src={DeployedAppIcon} alt="desktop icon" />
      </a>
    </div>
  );
};

export default DeployedAppIconSvg;
