import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown (){
  const [time, setTime] = useState(25*60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time/60);
  const seconds = time % 60;

  const [firstNumberOfMinute, secondNumberOfMinute] = String(minutes).padStart(2,'0').split('');
  const [firstNumberOfSecond, secondNumberOfSecond] = String(seconds).padStart(2,'0').split('');

  function startCountdown(){
    setActive(!active);
  }

  useEffect(()=>{
    if(active && time> 0) {
      setTimeout(() => {
        setTime(time-1);
      }, 1000)
    }
  },[active, time]);

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
      {
        !active?(<button onClick={startCountdown} type="button" className={styles.countdownButton}>
        Iniciar ciclo
      </button>): (<button onClick={startCountdown} type="button" className={styles.countdownButton}>
        Parar ciclo
      </button> )
      }     
    </div>
  )
}