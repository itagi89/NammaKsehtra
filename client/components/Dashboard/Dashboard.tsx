import React from 'react';
import styles from "./Dashboard.module.css" 
import { 
  CardItem, 
  ProjectDetail, 
  PersonInfo 
} from '../../types';

const Dashboard: React.FC = () => {
  const activitiesData: CardItem = {
    id: 1,
    title: 'Upcoming Activities',
    content: [
      'Activities-01',
      'Activities-02',
      'Activities-03',
      'Activities-04',
      'Activities-05',
      'Activities-06',
      'Activities-07',
      'Activities-08',
      'Activities-09'
    ]
  };

  const newsData: CardItem = {
    id: 2,
    title: 'Recent News',
    content: [
      'News-01',
      'News-02',
      'News-03',
      'News-04',
      'News-05',
      'News-06',
      'News-07',
      'News-08',
      'News-09'
    ]
  };

  const projectDetails: ProjectDetail[] = [
    {
      id: 1,
      title: 'Completed Projects',
      description: '',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 2,
      title: 'Projects Progress',
      description: 'The Project Progress In Sagar Shimoga. I Will Build New Whater Tank And Road And Other New Airport Road. Since 2026',
      imageUrl: '/api/placeholder/400/300'
    },
    {
      id: 3,
      title: 'Upcoming Projects',
      description: '',
      imageUrl: '/api/placeholder/400/300'
    }
  ];

  const personInfo: PersonInfo = {
    name: 'Anima Agrawal',
    location: 'U.P, India',
    imageUrl: '/Users/chaitalisen/Projects/NammaKsehtra/img/person.png'
  };

  return (
    <div className={styles.dashboardcontainer}>
      <div className={styles.gridcontainer}>
        <div className={styles.card}>
          <div className={styles.cardheader}>{activitiesData.title}</div>
          <div className={styles.cardcontent}>
            {activitiesData.content.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>

        <div className={styles.personcard}>
          <img 
            src={personInfo.imageUrl} 
            alt={personInfo.name} 
            className={styles.personimage}
          />
          <div className={styles.persondetails}>
            <h2>{personInfo.name}</h2>
            <p>{personInfo.location}</p>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardheader}>{newsData.title}</div>
          <div className={styles.cardcontent}>
            {newsData.content.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      <h2 className={styles.projectstitle}>Projects Detail</h2>

      <div className={styles.projectssection}>
        {projectDetails.map((project) => (
          <div key={project.id} className={styles.projectcard}>
            <img 
              src={project.imageUrl} 
              alt={project.title} 
            />
            <div className={styles.projectcardcontent}>
              <h3>{project.title}</h3>
              {project.description && <p>{project.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;