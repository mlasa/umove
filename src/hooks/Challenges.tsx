import { createContext, ReactNode, useContext, useState } from 'react';

import challengesArray from '../../challenges.json';

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
  hasActiveChallenge: boolean;
  challenge: ChallengesProperties;
  changeStatusChallenge(bool:boolean):void;
  completeChallenge(score:number): void;
}

const ChallengesContext = createContext <ChallengeContextData> ({} as ChallengeContextData);

function ChallengeProvider(props:ChallengesProviderProps){
  const [hasActiveChallenge, setHasActiveChallenge] = useState(false);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [challenge, setChallenge] = useState<ChallengesProperties>({} as ChallengesProperties);
  const [challengesCompleted, setChallengesCompleted] = useState(0);


  function changeStatusChallenge(bool:boolean):void{
    setHasActiveChallenge(bool);
  };
  
  function levelUp():void{
    setLevel(level+1);
    setXp(0);
  };

    function completeChallenge(score:number){
      if(!score)
        throw new Error('completeChallenge function needs receive a score');
        
      setXp(xp + score);
      setChallengesCompleted(challengesCompleted + 1);
      setHasActiveChallenge(false);

      if(xp === 600 || xp > 600)
        levelUp();

      const sortedNumber = Math.floor(Math.random() * (1+12) + 1);
      setChallenge(challengesArray[sortedNumber]);
    };

  return(
    <ChallengesContext.Provider value={{xp, level, hasActiveChallenge, challengesCompleted, challenge, changeStatusChallenge, completeChallenge}}>
      {props.children}
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