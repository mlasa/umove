import styles from '../styles/components/ChallengeBox.module.css';
import {useChallenge} from '../hooks/Challenges';

export function ChallengeBox(){
  const {hasActiveChallenge, completeChallenge, challenge, changeStatusChallenge} = useChallenge();

  return(
    <div className={styles.challengeBoxContainer}>
      {
        hasActiveChallenge?(
          <div className={styles.challengeBoxActive}>
            <header>{`Ganhe ${challenge.amount} xp`}</header>
            <main>
              {
                challenge.type === 'body'? (
                  <img src="icons/body.svg" alt="exercício para o corpo"/>
                ):(
                  <img src="icons/eye.svg" alt="exercício para os olhos"/>
                )
              }
              <strong>Novo desafio</strong>
              <p>{challenge.description}</p>
            </main>
            <footer>
              <button
                onClick= {()=>changeStatusChallenge(false)}
                type="button"
                className={styles.challengeFailedButton}>
                Falhei
              </button>
              <button
                onClick={()=>completeChallenge(challenge.amount)}
                type="button"
                className={styles.challengeSuccededButton}>
                Completei
              </button>
            </footer>
          </div>
        ):(
          <div className={styles.challengeNotActive}>
            <strong>Inicie um ciclo para receber desafios</strong>       
            <p>
              <img src="icons/level-up.svg" alt="level up icon"/>
              Avance de level completando os desafios.
            </p>
          </div>
        )
      }
    </div>
  )
};