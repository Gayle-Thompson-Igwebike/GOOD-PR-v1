
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
// import CardInfo from "./components/CardInfo/CardInfo";
import TeamCard from "./components/TeamCard/TeamCard";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import TeamAlphaDetails from "./components/TeamAlphaDetails/TeamAlphaDetails"; 
import Search from "./components/Search/Search"
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/:id" element={<CardInfo />} /> */}
        <Route path="/:id" element={<TeamCard />} />
        <Route path="/form" element={<Form />} />
        <Route path="/team-alpha" element={<TeamAlphaDetails />} />
        <Route path="/search" element={<Search/> } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
