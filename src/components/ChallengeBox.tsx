import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
  const hasActiveChallenge = true;

  return(
    <div className={styles.challengeBoxContainer}>
      {
        hasActiveChallenge?(
          <div className={styles.challengeBoxActive}>
            <header>Ganhe 400 xp</header>
            <main>
              <img src="icons/body.svg" alt="exercício físico"/>
              <strong>Novo desafio</strong>
              <p>Exercite-se por 3 minutos</p>
            </main>
            <footer>
              <button
                type="button"
                className={styles.challengeFailedButton}>
                Falhei
              </button>
              <button
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