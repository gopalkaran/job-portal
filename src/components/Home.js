import React,{useEffect, useState} from 'react';
import '../styles/home.css';
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
        <input type="search" onChange={onChangeHandler} className="search-bar" />
        <div className="grid-list">
            {
                candidateList.map(candidate => {
                    return(
                        <Link to={`/${candidate.id}`} key={candidate.id} className="candidate">
                        {/* <div > */}
                            <img src={candidate.Image} alt={candidate.name} className="candidate-img"></img>
                            <div className="candidate-name">{candidate.name}</div>
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
