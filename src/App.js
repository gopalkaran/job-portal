import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shortlisted from "./components/Shortlisted";
import Rejected from "./components/Rejected";
import Candidate from "./components/Candidate";
import Home from "./components/Home";
import { useCandidateDispatch } from "./context";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";

function App() {
  const dispatch = useCandidateDispatch();
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json"
    );
    const items = await data.json();
    dispatch({ type: "STORE_LIST", payload: items });
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<Dashboard />}>
              <Route index element={<Home />} />
              <Route path="/shortlisted" element={<Shortlisted />} />
              <Route path="/rejected" exact element={<Rejected />} />
            </Route>
            <Route path="/:id" element={<Candidate />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
