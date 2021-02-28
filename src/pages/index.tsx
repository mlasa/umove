import Head from 'next/head';
import {GetServerSideProps} from 'next';

import { CountdownProvider} from '../hooks/Countdown';
import { ChallengeProvider} from '../hooks/Challenges';

import {ExperienceBar} from '../components/ExperienceBar';
import {Profile} from '../components/Profile';
import {CompletedChallenges} from '../components/CompletedChallenges';
import {Countdown} from '../components/Countdown';
import {ChallengeBox} from '../components/ChallengeBox';


import styles from '../styles/pages/Home.module.css';

interface HomeProps{
  level: number;
  xp: number;
  challengesCompleted: number;
}

export default function Home(props:HomeProps) {
  return (

    <ChallengeProvider
    level={props.level}
    challengesCompleted={props.challengesCompleted} 
    xp={props.xp}
    >
      <div className={styles.container}>
        <Head> 
          <title>Início | Umove</title>
        </Head>
        <ExperienceBar/>

        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChallenges/>
              <Countdown/>
            </div>
            <div>
              <ChallengeBox/>
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx)=> {
  
  const {umoveXp, umoveLevel, umoveChallengesCompleted}= ctx.req.cookies;

  return{
    props:{
      xp: Number(umoveXp),
      level: Number(umoveLevel),
      challengesCompleted: Number(umoveChallengesCompleted)
    }
  }
};