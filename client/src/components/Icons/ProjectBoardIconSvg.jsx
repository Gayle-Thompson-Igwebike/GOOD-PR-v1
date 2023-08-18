import ProjectBoardIcon from "../../images/Kanban-Board-Project.webp";
import "./ProjectBoardIcon.css";

const ProjectBoardIconSvg = ({ teamBoard }) => {
  return (
    <div className="icons-container">
      <a className="project-board-icon" href={teamBoard}>
        <img src={ProjectBoardIcon} alt="github icon" />
      </a>
    </div>
  );
};

export default ProjectBoardIconSvg;
