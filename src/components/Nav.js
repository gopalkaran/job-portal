import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.module.css';

const Nav = () => {
    const linkStyle = {
       color : 'white',
       textDecoration : 'none'
    }
    
    return (
        <nav>
           <ul>
               <li><Link style={linkStyle} to='/'>All Candidate</Link></li>
               <li><Link style={linkStyle} to='/shortlisted'>Shortlisted</Link></li>
               <li><Link style={linkStyle} to='/rejected'>Rejected</Link></li>
           </ul>
            
        </nav>
    )
}

export default Nav
