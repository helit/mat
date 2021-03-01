import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer'

import { Button, TextField } from '@material-ui/core'

export default function NyttRecept() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Matslumparn | Nytt recept</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <TextField id="standard-basic" label="Namn" />
        <TextField id="standard-basic" label="Länk" />
        <TextField id="standard-basic" label="Ingrediens" />
        <Button variant="contained" color="primary" disableElevation>
          klicka
        </Button>
      </main>
      <Footer />
    </div>
  )
}
