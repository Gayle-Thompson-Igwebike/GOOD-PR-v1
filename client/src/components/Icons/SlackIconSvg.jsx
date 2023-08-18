import SlackIcon from "../../images/Slack_icon.svg.png";

const SlackIconSvg = ({ teamSlack }) => {
  return (
    <a className="slack-icon" href={teamSlack}>
      <img src={SlackIcon} alt="slack icon" />
    </a>
  );
};
export default SlackIconSvg;
