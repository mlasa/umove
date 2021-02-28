import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';

interface ChallengesProviderProps{
  children: ReactNode;
}

interface ChallengesProperties{
  type: string;
  description: string;
  amount:number;
}

interface ChallengeContextData{
  xp: number;
  level:number;
  challengesCompleted:number;
  challenge: ChallengesProperties;
  xpToNextLevel: number;
  startNewChallenge(): void;
  completeChallenge(): void;
  levelUp(): void;
  giveUp(): void;
}

const ChallengesContext = createContext <ChallengeContextData> ({} as ChallengeContextData);

function ChallengeProvider({children}:ChallengesProviderProps){
  
  const [challenge, setChallenge] = useState(null);
  const [challengesCompleted, setChallengesCompleted] = useState(() => {
    const challengesCompleted = parseInt(Cookies.get('umoveChallengesCompleted'));
    if (challengesCompleted) return challengesCompleted;

    return 0;
  });
  const [xp, setXp] = useState(() => {
    const xp = parseInt(Cookies.get('umoveXp'));
    if (xp) return xp;

    return 0;
  });
  const [level, setLevel] = useState(() => {
    const level = parseInt(Cookies.get('umoveLevel'));
    if (level) return level;

    return 1;
  });

  const xpToNextLevel = Math.pow(( level+ 1) * 4, 2) // 4 sendo fator de dificuldade
  
  useEffect(()=>{Notification.requestPermission();});

  useEffect(()=>{
    Cookies.set('umoveXp', xp.toString());
    Cookies.set('umoveLevel', level.toString());
    Cookies.set('umoveChallengesCompleted', challengesCompleted.toString());

  },[xp, level, challengesCompleted]) 

  function startNewChallenge(){
    console.log("Start new challenge")
    const sortedNumber = Math.floor(Math.random() * (1 + challenges.length) + 1);
    const newChallenge = challenges[sortedNumber];
    setChallenge(newChallenge);

    new Audio('/notification.mp3').play();
    if(Notification.permission === 'granted'){
      new Notification('Novo desafio 🎊',{
        body:`Vem ver qual é seu novo desafio`
      });
    }
  };
  
  function levelUp(){
    setLevel(level + 1);
  };

  function giveUp(){
    setChallenge(null);
  };
  
  function completeChallenge(){
    if(!challenge){
      console.log('não tem desafio', challenge)
      return;
    }
    let totalXP = xp + challenge.amount;
    if(totalXP >= xpToNextLevel){
      levelUp();
      totalXP = totalXP - xpToNextLevel;
    }

    setXp(totalXP);
    setChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  };

  return(
    <ChallengesContext.Provider value={{
      xp,
      level,
      challengesCompleted,
      challenge,
      xpToNextLevel,
      completeChallenge,
      startNewChallenge,
      levelUp,
      giveUp,
      }}>
      {children}
    </ChallengesContext.Provider>
  )
};

function useChallenge():ChallengeContextData{
  const challengesContext = useContext(ChallengesContext);
  
  if(!challengesContext)
  throw new Error('contexto de challenges deve ser usado dentro do provider');

  return challengesContext;
}

export {ChallengeProvider, useChallenge};