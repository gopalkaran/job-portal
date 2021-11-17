import React, { useEffect, useState } from 'react';
import styles from '../styles/candidate.module.css';

const Candidate = ({match}) => {
    const [filteredCandidate, setFilteredCandidate] = useState({});
    const [shortlisted, setShortlisted] = useState(false);
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

    const onClickHandler = (id) =>{
        setShortlisted(shortlisted => !shortlisted);
        console.log(id);
        console.log(shortlisted)
        const candidateList = JSON.parse(localStorage.getItem("candidateList"))
        console.log(candidateList);
        const modifiedList = candidateList.map(candidate => {
            return candidate.id === id ? {...candidate , shortlisted : shortlisted} : candidate;
        })
        console.log(modifiedList)
        localStorage.setItem('candidateList', JSON.stringify(modifiedList));
    }

    // useEffect(() => {
    //     const candidateList = JSON.parse(localStorage.getItem("candidateList"))
    //     console.log(candidateList);
    //     const modifiedList = candidateList.map(candidate => {
    //         return {...candidate , shortlisted : shortlisted}
    //     })
    //     console.log(modifiedList)
    // }, [shortlisted])

    return (
        <div className={styles.candidate}>
           <img src={filteredCandidate.Image} alt={filteredCandidate.name} className={styles.candidateimg} />
           <div className={styles.candidatename}>{filteredCandidate.name}</div>
           <div className={styles.btngroup}>
               <button className={styles.btn} onClick={() => onClickHandler(filteredCandidate.id)}>{shortlisted? "Reject" : "Shortlist"}</button>
               {/* <button className={styles.btn} onClick={onClickHandler}>Reject</button> */}
           </div>          
        </div>
    )
}

export default Candidate



