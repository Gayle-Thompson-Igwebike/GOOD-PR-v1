import "./DeveloperProfile.css";

const DeveloperProfile = ({ person }) => {
  return (
    <div className="person-card">
      <h2 className="person-name"> Name: {person.name}</h2>
      <p className="person-role"> Role: {person.role}</p>
      <p className="person-github">
         Github: 
        <a href={person.githubLink} target="_blank" rel="noopener noreferrer">
           {person.githubLink}
        </a>
      </p>
      <p className="person-linkedin">
         Linkedin:
        <a href={person.linkedinLink} target="_blank" rel="noopener noreferrer"> 
           {person.linkedinLink}
        </a>
      </p>
    </div>
  );
};

export default DeveloperProfile;
