import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Matslumparn</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Matslumparn
        </h1>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h4>1 Mars 2021</h4>
            <h3>Måndag</h3>
            <p>Idag blir det soppa.</p>
          </a>
          <a href="#" className={styles.card}>
            <h4>2 Mars 2021</h4>
            <h3>Tisdag</h3>
            <p>Imorgon blir det pizza.</p>
          </a>
          <a href="#" className={styles.card}>
            <h4>3 Mars 2021</h4>
            <h3>Onsdag</h3>
            <p>I övermorgon blir det pasta.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
