"use client"
import Head from 'next/head';
import styles from './Configuration.module.css';
import Activities from './Activities';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const dataEntities = [
    {
      title: 'Zilla Panchayat',
      route: 'zillapanchayat',
      action: 'Click here to configure / Upload/ Edit/ Delete / Manage the Zilla panchayat.'
    },
    {
      title: 'Taluk Panchayat',
      route: 'zillapanchayat',
      action: 'Click here to configure / Upload/ Edit/ Delete / Manage the taluk panchayat.'
    },
    {
      title: 'Gram Panchayat',
      route: 'zillapanchayat',
      action: 'Click here to configure / Upload/ Edit/ Delete / Manage the Gram panchayat.'
    },
    {
      title: 'Village',
      route: 'zillapanchayat',
      action: 'Click here to configure / Upload/ Edit/ Delete / Manage the Village.'
    },
    {
      title: 'Booth',
      route: 'zillapanchayat',
      action: 'Click here to configure / Upload/ Edit/ Delete / Manage the Booth.'
    },
    {
      title: 'Cast',
      route: 'zillapanchayat',
      action: 'Click here to configure / Upload/ Edit/ Delete / Manage the Cast.'
    }
  ];

  const handleCardClick = (title: String, route: string) => {
    console.log(`Clicked on ${title}`);
    router.push(`/${route}`);

    // Add your logic for handling card clicks
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Master Data Model</title>
        <meta name="description" content="Master Data Model Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Master data Model</h1>

        <div className={styles.grid}>
          {dataEntities.slice(0, 6).map((entity, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleCardClick(entity.title, entity.route)}
            >
              <h2>{entity.title}</h2>
              <p>{entity.action}</p>
            </div>
          ))}
        </div>

      </main>

      <Activities/>
    </div>
  );
}