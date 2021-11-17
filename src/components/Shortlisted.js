import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import styles from '../styles/shortlisted.module.css';

const Shortlisted = () => {
    const [shortlistedList, setShortlistedList] = useState([]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const candidateList = JSON.parse(localStorage.getItem("candidateList"));
        const shortlistedList = candidateList.filter(candidate => {
            return candidate.shortlisted ? candidate : null;
        })
       
        setShortlistedList(shortlistedList);
    }, [])

    const onChangeHandler = (e) => {
        setSearchText(e.target.value);
    }

    useEffect(() => {
        const searchData = searchText.toLowerCase();
        setShortlistedList(shortlistedList => shortlistedList.map((candidate) => {
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
                shortlistedList.map(candidate => {
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

export default Shortlisted
