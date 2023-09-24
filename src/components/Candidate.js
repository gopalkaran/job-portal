import React, { useEffect, useState } from "react";
import styles from "../styles/candidate.module.css";
import { useCandidateDispatch, useCandidateStore } from "../context";
import { useParams } from "react-router-dom";

const Candidate = () => {
  const [candidate, setCandidate] = useState({});
  const list = useCandidateStore();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const getCandidate = list.allCandidates?.find(
        (candidate) => candidate?.id === params?.id
      );
      setCandidate(getCandidate);
    }
  }, [params.id, list]);

  const dispatch = useCandidateDispatch();

  return (
    <div className={styles.candidate}>
      <img
        src={candidate?.Image}
        alt={candidate?.name}
        className={styles.candidateimg}
      />
      <div className={styles.candidatename}>{candidate?.name}</div>
      {candidate.shortlisted ? (
        <h3>Shortlisted</h3>
      ) : candidate.rejected ? (
        <h3>Rejected</h3>
      ) : (
        <div className={styles.btngroup}>
          <button
            className={styles.btn}
            onClick={() =>
              dispatch({
                type: "SHORTLIST",
                payload: { candidateId: candidate?.id }
              })
            }
          >
            Shortlist
          </button>
          <button
            className={styles.btn}
            onClick={() =>
              dispatch({
                type: "REJECT",
                payload: { candidateId: candidate?.id }
              })
            }
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default Candidate;
