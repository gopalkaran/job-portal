import React from "react";
import styles from "../styles/home.module.css";
import { Link, useOutletContext } from "react-router-dom";

const Home = () => {
  const { filterList = [] } = useOutletContext();
  return (
    <div>
      <div className={styles.gridlist}>
        {filterList?.map((candidate) => {
          return (
            <Link
              to={`/${candidate.id}`}
              key={candidate.id}
              className={styles.candidate}
            >
              <img
                src={candidate.Image}
                alt={candidate.name}
                className={styles.candidateimg}
              ></img>
              <div className={styles.candidatename}>{candidate.name}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
