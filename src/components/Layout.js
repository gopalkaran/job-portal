import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import { useCandidateStore } from "../context";

export default function Layout() {
  const [list, setList] = useState([]);

  const candidateList = useCandidateStore();
  const location = useLocation();

  function getListByRoute(candidateList, route) {
    const listBasedOnRoute = {
      "/": "allCandidates",
      "/shortlisted": "shortlistedCandidates",
      "/rejected": "rejectedCandidates"
    };
    return candidateList[listBasedOnRoute[route]];
  }

  useEffect(() => {
    if (location.pathname) {
      const list = getListByRoute(candidateList, location.pathname);
      setList(list);
    }
  }, [location.pathname, candidateList]);

  return (
    <div>
      <Nav />
      <Outlet context={{ list: list }} />
    </div>
  );
}
