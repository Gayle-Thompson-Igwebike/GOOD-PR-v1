import React, { useState } from "react";
import "./Form.css";
const Form = () => {
  const initialFormState = {
    teamName: "",
    projectBrief: "",
    githubRepo: "",
    githubProject: "",
    deployedApp: "",
    slackChannel: "",
    memberName1: "",
    memberName2: "",
    memberName3: "",
    memberName4: "",
    role1: "",
    role2: "",
    role3: "",
    role4: "",
    githubUsername1: "",
    githubUsername2: "",
    githubUsername3: "",
    githubUsername4: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tableData = {
      teamName: formData.teamName,
      projectBrief: formData.projectBrief,
      githubRepo: formData.githubRepo,
      githubProject: formData.githubProject,
      deployedApp: formData.deployedApp,
      slackChannel: formData.slackChannel,
      memberName1: formData.memberName1,
      memberName2: formData.memberName2,
      memberName3: formData.memberName3,
      memberName4: formData.memberName4,
      role1: formData.role1,
      role2: formData.role2,
      role3: formData.role3,
      role4: formData.role4,
      githubUsername1: formData.githubUsername1,
      githubUsername2: formData.githubUsername2,
      githubUsername3: formData.githubUsername3,
      githubUsername4: formData.githubUsername4,
    };

    try {
      const response = await fetch(
        "https://good-pr-v1-server.onrender.com/submit-form",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tableData),
        }
      );

      const data = await response.json();
      console.log("Success:", data);

      setFormData(initialFormState);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="teamName">Team Name:</label>
        <input
          type="text"
          id="teamName"
          name="teamName"
          value={formData.teamName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="projectBrief">Project Brief:</label>
        <input
          type="url"
          id="projectBrief"
          name="projectBrief"
          value={formData.projectBrief}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="githubRepo">GitHub Repo:</label>
        <input
          type="url"
          id="githubRepo"
          name="githubRepo"
          value={formData.githubRepo}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="githubProject">GitHub Project Board:</label>
        <input
          type="url"
          id="githubProject"
          name="githubProject"
          value={formData.githubProject}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="deployedApp">Deployed App:</label>
        <input
          type="url"
          id="deployedApp"
          name="deployedApp"
          value={formData.deployedApp}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="slackChannel">Slack Channel:</label>
        <input
          type="text"
          id="slackChannel"
          name="slackChannel"
          value={formData.slackChannel}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="memberName1">Member 1:</label>
        <input
          type="text"
          id="memberName1"
          name="memberName1"
          value={formData.memberName1}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role1">Role:</label>
        <input
          type="text"
          id="role1"
          name="role1"
          value={formData.role1}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="githubUsername1">GitHub Username:</label>
        <input
          type="text"
          id="githubUsername1"
          name="githubUsername1"
          value={formData.githubUsername1}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="memberName2">Member 2:</label>
        <input
          type="text"
          id="memberName2"
          name="memberName2"
          value={formData.memberName2}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role2">Role:</label>
        <input
          type="text"
          id="role2"
          name="role2"
          value={formData.role2}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="githubUsername2">GitHub Username:</label>
        <input
          type="text"
          id="githubUsername2"
          name="githubUsername2"
          value={formData.githubUsername2}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="memberName3">Member 3:</label>
        <input
          type="text"
          id="memberName3"
          name="memberName3"
          value={formData.memberName3}
          onChange={handleChange}
          
        />
      </div>
      <div className="form-group">
        <label htmlFor="role3">Role:</label>
        <input
          type="text"
          id="role3"
          name="role3"
          value={formData.role3}
          onChange={handleChange}
          
        />
      </div>

      <div className="form-group">
        <label htmlFor="githubUsername3">GitHub Username:</label>
        <input
          type="text"
          id="githubUsername3"
          name="githubUsername3"
          value={formData.githubUsername3}
          onChange={handleChange}
          
        />
      </div>

      <div className="form-group">
        <label htmlFor="memberName4">Member 4:</label>
        <input
          type="text"
          id="memberName4"
          name="memberName4"
          value={formData.memberName4}
          onChange={handleChange}
          
        />
      </div>
      <div className="form-group">
        <label htmlFor="role4">Role:</label>
        <input
          type="text"
          id="role4"
          name="role4"
          value={formData.role4}
          onChange={handleChange}
          
        />
      </div>

      <div className="form-group">
        <label htmlFor="githubUsername4">GitHub Username:</label>
        <input
          type="text"
          id="githubUsername4"
          name="githubUsername4"
          value={formData.githubUsername4}
          onChange={handleChange}
          
        />
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
      <p></p><p></p>
    </form>
  );
};

export default Form;
