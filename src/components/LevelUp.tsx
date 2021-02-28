import { useChallenge } from '../hooks/Challenges';
import styles from '../styles/components/LevelUp.module.css';

export function LevelUp(){
  const{level, closeModalLevelUp} = useChallenge();
  return(
    <div className={styles.overlay}>
      <div className={styles.LevelUpContainer}>
        <header>{level}</header>

        <strong>Level Up</strong>
        <p>Você subiu de level!</p>

        <button type="button" onClick={closeModalLevelUp}>
          <img src="/icons/close.svg" alt="Fechar aviso"/>
        </button>
      </div>
    </div>
  )
}