import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

const LoginPage: NextPage = () => {

    const router = useRouter()

    return(
        <div className={styles.container}>
            <Head>
                <title>Login</title>    
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Bem Vindo ao  Guess the Drawing
                </h1>
                <p className={styles.description}>
                    Fazer Login
                </p>
            </main>
        </div>

    )
}

export default LoginPage;