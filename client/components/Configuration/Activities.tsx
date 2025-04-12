import styles from './Configuration.module.css'
import { useState } from 'react';

const Activities:React.FC = () =>{

const [activeTab, setActiveTab] = useState('infrastructure');
return (
    <div className={styles.tabContainer}>
      <div className={styles.tabs}>
        <div
          className={`${styles.tab} ${activeTab === 'infrastructure' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('infrastructure')}
        >
          Infrastructure
        </div>
        <div
          className={`${styles.tab} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Activities
        </div>
      </div>
      <div className={styles.tabContent}>
        {activeTab === 'infrastructure' && (
          <div>
            <h3>Infrastructure Content</h3>
            <p>Infrastructure data and management options will appear here.</p>
          </div>
        )}
        {activeTab === 'upcoming' && (
          <div>
            <h3>Upcoming Activities</h3>
            <p>Upcoming activities and events will appear here.</p>
          </div>
        )}
      </div>
    </div>
    )
}
export default Activities;