import styles from '../styles/components/ExperienceBar.module.css';

import {useChallenge} from '../hooks/Challenges';

export  function ExperienceBar () {
  const {xp, xpToNextLevel} = useChallenge();

  const nextLevel = Math.round(xp*100)/xpToNextLevel;

  return(
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width:`${nextLevel}%`}}/>
        <span className={styles.currentExperience} style={{left: `${nextLevel}%`}} >{`${xp} xp`} </span>
      </div>
      <span>{`${xpToNextLevel} xp`}</span>
    </header>
  );
};