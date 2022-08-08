import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import * as Yup from 'yup'
import userService from '../services/user.service'
import { SignUpDto } from '../schemas/session'
import { Formik, FormikHelpers } from 'formik';
import { useCallback } from 'react';

const RegisterPage: NextPage = () => {

    const router = useRouter()
    const SignUpSchema = Yup.object().shape({
        username: Yup.string().required(),
        email: Yup.string().email('Invalid email').required(),
        password: Yup.string().required(),
      });

    const onSubmit = useCallback(async (values: SignUpDto, helpers: FormikHelpers<SignUpDto>) => {
        try {
    
        const response = await userService.create(values)
        router.push('/login')
        } catch (error: any) {
          alert(error + " ocorreu algum erro no cadastro, tente novamente mais tarde")
        }
      }, []);

    return(
        <div className={styles.container}>
            <Head>
                <title>Register</title>    
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Bem Vindo ao  <p className={styles.GTD}>
                        Guess the Drawing
                        </p>
                </h1>
                <p className={styles.description}>
                    Fazer cadastro
                </p>
                <Formik<SignUpDto>
        initialValues={{ username: '',email: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={SignUpSchema}>
                     {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <div className={styles.formContainer}>

            <input className={styles.input}  
              placeholder='Digite seu nome'               
              value={values.username}
              onChange={handleChange('username')}
              onBlur={handleBlur('username')} />
            
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
                Cadastrar
            </button>
          </div>
        )}
                </Formik>
            </main>
        </div>

    )
}

export default RegisterPage;