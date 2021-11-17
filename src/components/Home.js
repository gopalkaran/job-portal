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
        const modifiedList = items.map(item => {
            return {...item, visible : true, shortlisted : false}
        })
        setCandidateList(modifiedList);
        localStorage.setItem('candidateList', JSON.stringify(modifiedList));
    }
    const onChangeHandler = (e) => {
        setSearchText(e.target.value);
    }

    useEffect(() => {
        const searchData = searchText.toLowerCase();
        setCandidateList(candidateList => candidateList.map((candidate) => {
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
                candidateList.map(candidate => {
                    return(
                        candidate.visible ?
                        <Link to={`/${candidate.id}`} key={candidate.id} className={styles.candidate}>
                        {/* <div > */}
                            <img src={candidate.Image} alt={candidate.name} className={styles.candidateimg}></img>
                            <div className={styles.candidatename}>{candidate.name}</div>
                        {/* </div> */}
                        </Link> : null
                    ) 
                })
            }
        </div>
        </div>
    )
}

export default Home
