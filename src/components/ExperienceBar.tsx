import styles from '../styles/components/ExperienceBar.module.css';

import {useChallenge} from '../hooks/Challenges';

export  function ExperienceBar () {
  const {xp} = useChallenge();
  return(
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width: '50%'}}/>
        <span className={styles.currentExperience} style={{left: '50%'}} >{`${xp} xp`} </span>
      </div>
      <span>600 xp</span>
    </header>
  );
};