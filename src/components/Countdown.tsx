import { TIMEOUT } from 'dns';
import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown (){
  const [time, setTime] = useState(0.05*60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time/60);
  const seconds = time % 60;

  const [firstNumberOfMinute, secondNumberOfMinute] = String(minutes).padStart(2,'0').split('');
  const [firstNumberOfSecond, secondNumberOfSecond] = String(seconds).padStart(2,'0').split('');

  function startCountdown(){
    setIsActive(true);
  }
  function stopCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
  }

  useEffect(()=>{
    if(isActive && time> 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time-1);
      }, 1000)
    } else if(isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
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

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Desafio concluído!
        </button>
      ):(
        <>
        {
          isActive? (
          <button onClick={stopCountdown} type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
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