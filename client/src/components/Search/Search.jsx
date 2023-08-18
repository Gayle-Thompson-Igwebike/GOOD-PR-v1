import { useEffect } from "react";
import { useState } from "react";
import "./Search.css";

const Search = ({ teamData }) => {
  const [input, setInput] = useState("");
  const [teamInfo, setTeamInfo] = useState(null);
  const [loadingTeamData, setLoadingTeamData] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/team-members?term=${input}`)
      .then((response) => response.json())
      .then((data) => {
        setTeamInfo(data);
        setLoadingTeamData(false);
      })
      .catch((error) => console.log(error));
  }, [input]);

  function handleSearch(event) {
    setInput(event.target.value);
  }

  return (
    <section>
      <form className="search-form">
        <label htmlFor="search">Search Teams or Trainees Names</label>
        <input
          id="search"
          name="search"
          type="text"
          value={input}
          onChange={handleSearch}
        />
      </form>
      {loadingTeamData ? (
        <p>Please wait while we load team information</p>
      ) : (
        <div>
          {" "}
          {input && (
            <aside className="team-info">
              {teamInfo.map((eachInfo) => (
                <div key={eachInfo.id}>
                  <p className="team-name">{eachInfo.team_name}</p>
                  <p className="member-name">{eachInfo.member_name}</p>
                </div>
              ))}
            </aside>
          )}
        </div>
      )}
    </section>
  );
};

export default Search;
