import { FormikHelpers, Formik } from 'formik'
import type { NextPage } from 'next'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { LoginDto } from '../schemas/session'
import sessionService from '../services/session.service'
import storageService from '../services/storage.service'
import userService from '../services/user.service'
import styles from '../styles/Home.module.css'
import * as Yup from 'yup'
import api from '../services/api'

const LoginPage: NextPage = () => {

    const router = useRouter()
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().required(),
      });

    const onSubmit = useCallback(async (values: LoginDto, helpers: FormikHelpers<LoginDto>) => {
        try {
    
        const {token} = await sessionService.login(values.email, values.password)

        await storageService.storeData("token", token);

        api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const account = await userService.whoami();

        console.log(account)
    


        } catch (error: any) {
          alert(error + " ocorreu algum erro no cadastro, tente novamente mais tarde")
        }
      }, []);

    return(
        <div className={styles.container}>
            <Head>
                <title>Login</title>    
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Bem Vindo ao <p className={styles.GTD}>
                        Guess the Drawing
                        </p>
                </h1>
                <Formik<LoginDto>
        initialValues={{email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={LoginSchema}>
                     {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <div className={styles.formContainer}>
            
            <input className={styles.input}
              placeholder='Digite seu e-mail'
              autoCapitalize='none'
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')} />
            <label className={styles.textError}>{errors.email || ''}</label>

            <input className={styles.input}
              placeholder='Digite sua senha' 
              type='password'               
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')} />
            <label className={styles.textError}>{errors.password || ''}</label>
            <button className={styles.buttons} onClick={() => handleSubmit()}>
                Entrar
            </button>
          </div>
        )}
                </Formik>
            </main>
        </div>

    )
}

export default LoginPage;