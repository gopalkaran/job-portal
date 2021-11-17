import React,{useEffect, useState} from 'react';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
    const [candidateList, setCandidateList] = useState([]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems =async () =>{
        const data = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json');
        const items = await data.json();
        console.log(items);
        setCandidateList(items);
        
    }
    const onChangeHandler = (e) => {
        setSearchText(e.target.value);
    }
    return (
        <div>
        <input type="search" onChange={onChangeHandler} className={styles.searchbar} />
        <div className={styles.gridlist}>
            {
                candidateList.map(candidate => {
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

export default Home
