"use client"
import React, { useState } from "react";
import styles from "./LeftNav.module.css"
import Link from "next/link";
import { FaFileImport, FaHome, FaProjectDiagram, FaSlidersH, FaTasks, FaUser, FaUserCheck } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { FiMenu } from "react-icons/fi";

const LeftNav = () => {
const[collapsed,setCollapsed] = useState(true)
const toggleMenu = ()=>{
  setCollapsed(!collapsed)
}
  return (
    <nav className={styles.nav}>
        
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        <button className={styles.menubtn} onClick={toggleMenu} ><FiMenu className={styles.icon}/></button>
        <h2 className={styles.brand}>Namma Kshetra</h2>
        <ul className={styles.menu}>
            <li><i ><Link href="/." className={styles.menuItem}><FaHome  className={styles.icon} /><span>Home</span></Link></i></li>
            <li><i ><Link href="/zillapanchayat" className={styles.menuItem}><FaSlidersH className={styles.icon} /><span>Configuration</span></Link></i></li>
            <li><i ><Link href="/configuration" className={styles.menuItem}><FaUser className={styles.icon} /><span>User</span></Link></i></li>
            <li><i ><Link href="/configuration" className={styles.menuItem}><FaTasks className={styles.icon} /><span>Tickets</span></Link></i></li>
            <li><i ><Link href="/configuration" className={styles.menuItem}><FaProjectDiagram className={styles.icon} /><span>Project</span></Link></i></li>
            <li><i ><Link href="/configuration" className={styles.menuItem}><FaUserCheck className={styles.icon} /><span>Voters</span></Link></i></li>
            <li><i ><Link href="/configuration" className={styles.menuItem}><GoReport className={styles.icon} /> <span>Reports</span></Link></i></li>
            <li><i ><Link href="/configuration"className={styles.menuItem}><FaFileImport className={styles.icon} /><span>Imports</span></Link></i></li>
        </ul>
    </div>

    </nav>
  );
};

export default LeftNav;
