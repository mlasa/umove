import styles from '../styles/components/Profile.module.css';

export  function Profile(){
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/mlasa.png" alt="Marcella Amorim S.A."/>
      <div>
        <strong>Marcella Amorim S.A.</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 2
        </p>
      </div>
    </div>
  );
}