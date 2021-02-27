import { useEffect, useState } from 'react';

import styles from '../styles/components/Countdown.module.css';
import {useChallenge} from '../hooks/Challenges';

let countdownTimeout: NodeJS.Timeout;

export function Countdown (){
  const [time, setTime] = useState(0.05*60);
  const [isActive, setIsActive] = useState(false);

  const {changeStatusChallenge, hasActiveChallenge} = useChallenge();

  const minutes = Math.floor(time/60);
  const seconds = time % 60;

  const [firstNumberOfMinute, secondNumberOfMinute] = String(minutes).padStart(2,'0').split('');
  const [firstNumberOfSecond, secondNumberOfSecond] = String(seconds).padStart(2,'0').split('');

  function startCountdown(){
    setIsActive(true);
  }
  function resetCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
  }

  useEffect(()=>{
    if(!hasActiveChallenge)
      resetCountdown();
  },[hasActiveChallenge])

  useEffect(()=>{
    if(isActive && time> 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time-1);
      }, 1000)
    } else if(isActive && time === 0){
      setIsActive(false);
      changeStatusChallenge(true);
    }
  },[isActive, time]);

  return(
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{firstNumberOfMinute}</span>
          <span>{secondNumberOfMinute}</span>
        </div>
        <span>:</span>
        <div>
          <span>{firstNumberOfSecond}</span>
          <span>{secondNumberOfSecond}</span>
        </div>
      </div>

      {hasActiveChallenge ? (
        <button disabled className={styles.countdownButton}>
          Desafio concluído!
        </button>
      ):(
        <>
        {
          isActive? (
          <button onClick={resetCountdown} type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
            Abandonar ciclo
          </button>
         ): (
          <button onClick={startCountdown} type="button" className={styles.countdownButton}>
            Iniciar ciclo
          </button>
        )
        } 
        </>   
      )}

      
    </div>
  )
}