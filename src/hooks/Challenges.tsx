import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { useCountdown} from './Countdown';

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
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [challenge, setChallenge] = useState(null);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const xpToNextLevel = Math.pow(( level+ 1) * 4, 2) // 4 sendo fator de dificuldade
  
  function startNewChallenge(){
    console.log("Start new challenge")
    const sortedNumber = Math.floor(Math.random() * (1 + challenges.length) + 1);
    setChallenge(challenges[sortedNumber]);
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