import styles from '../styles/components/Countdown.module.css';
import { useCountdown } from '../hooks/Countdown';

export function Countdown () {
  const {minutes, seconds,isActive, hasFinished, resetCountdown, startCountdown} = useCountdown();

  
  const [firstNumberOfMinute, secondNumberOfMinute] = String(minutes).padStart(2,'0').split('');
  const [firstNumberOfSecond, secondNumberOfSecond] = String(seconds).padStart(2,'0').split('');

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