import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import styles from "../styles/nav.module.css";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <Link className={styles.navTitle} to="/">
        Job Portal
      </Link>
      <ul>
        <CustomLink to="/">All Candidate</CustomLink>
        <CustomLink to="/shortlisted">Shortlisted</CustomLink>
        <CustomLink to="/rejected">Rejected</CustomLink>
      </ul>
    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? styles.active : null}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default Nav;
