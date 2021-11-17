import React, { useEffect, useState } from 'react';
import styles from '../styles/candidate.module.css';

const Candidate = ({match}) => {
    const [filteredCandidate, setFilteredCandidate] = useState({});
    useEffect(() => {
        fetchItem();
    },[]);

    const fetchItem =async () =>{
        const fetchedItem = await fetch(`https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json`);
        const candidateList = await fetchedItem.json();
        const [filteredCandidate] = candidateList.filter(candidate => {
            return candidate.id === match.params.id ? candidate : null;
        })
        console.log(filteredCandidate);
        setFilteredCandidate(filteredCandidate);
    }
    return (
        <div className={styles.candidate}>
           <img src={filteredCandidate.Image} alt={filteredCandidate.name} className={styles.candidateimg} />
           <div className={styles.candidatename}>{filteredCandidate.name}</div>
           <div className={styles.btngroup}>
               <button className={styles.btn}>Select</button>
               <button className={styles.btn}>Reject</button>
           </div>          
        </div>
    )
}

export default Candidate



