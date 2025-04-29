"use client"
import React, { useState } from "react";
import styles from "./TopNav.module.css"
import { FaHome, FaSignInAlt } from "react-icons/fa";

const TopNav = () => {

  const [language, setLanguage] = useState('english');
  const toggleLanguage = () =>{
    setLanguage(language==='english'?'kannada':'english')
  }
  return (
    <nav className={styles.topnav}>
      <div className={styles.searchcontainer}>
        <input type="text" placeholder="Search ..." className={styles.searchinput} />
      </div>

      {/* Navigation Buttons */}
      <div className={styles.navbuttons}>
        <button className={styles.navbtn}>
          { <FaHome className={styles.icon} >  Home </FaHome> }
        </button>
        <button className={styles.navbtn}>
          { <FaSignInAlt className={styles.icon}> Login </FaSignInAlt>}
        </button>

        
        <div className={styles.languagecontainer}>
        <div className={styles.togglewrapper}>
          <span className={`${styles.languagelabel} ${language === 'english' ? styles.active : ''}`}>
            English
          </span>
          <button 
            onClick={toggleLanguage}
            className={styles.togglebutton}
            aria-pressed={language === 'kannada'}
          >
            <span className={styles.sronly}>
              {language === 'english' ? 'Switch to Kannada' : 'Switch to English'}
            </span>
            <span className={`${styles.toggletrack} ${language === 'kannada' ? styles.active : ''}`}>
              <span className={`${styles.togglethumb} ${language === 'kannada' ? styles.active : ''}`}></span>
            </span>
          </button>
          <span className={`${styles.languagelabel} ${language === 'kannada' ? styles.active : ''}`}>
            ಕನ್ನಡ
          </span>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
