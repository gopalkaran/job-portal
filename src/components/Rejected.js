import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import styles from '../styles/rejected.module.css';

const Rejected = () => {
    const [rejectedList, setRejectedList] = useState([]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const candidateList = JSON.parse(localStorage.getItem("candidateList"));
        const rejectedList = candidateList.filter(candidate => {
            return candidate.shortlisted ? null : candidate;
        })
        setRejectedList(rejectedList);
    }, [])

    const onChangeHandler = (e) => {
        setSearchText(e.target.value);
    }

    useEffect(() => {
        const searchData = searchText.toLowerCase();
        setRejectedList(rejectedList => rejectedList.map((candidate) => {
          const name = candidate.name.toLowerCase();
          const flag = name.includes(searchData);
          return { ...candidate, visible: flag };
        }));
      }, [searchText]);


    return (
        <div>
            <input type="search" onChange={onChangeHandler} className={styles.searchbar} />
            <div className={styles.gridlist}>
            {
                rejectedList.map(candidate => {
                    return(
                        
                        <Link to={`/${candidate.id}`} key={candidate.id} className={styles.candidate}>
                        {/* <div > */}
                            <img src={candidate.Image} alt={candidate.name} className={styles.candidateimg}></img>
                            <div className={styles.candidatename}>{candidate.name}</div>
                        {/* </div> */}
                        </Link>
                    ) 
                })
            }
        </div>
            
        </div>
    )
}

export default Rejected
