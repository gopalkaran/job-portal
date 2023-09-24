import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "../styles/rejected.module.css";

const Rejected = () => {
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

export default Rejected;
