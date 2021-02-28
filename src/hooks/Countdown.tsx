import {createContext, ReactNode, useContext, useState, useEffect} from 'react';

import {useChallenge} from './Challenges';

interface CountdownProps{
  children: ReactNode;
}

interface CountdownContextData{
  startCountdown(): void;
  resetCountdown(): void;
  hasFinished: boolean;
  isActive: boolean;
  seconds: number;
  minutes: number;
}

let countdownTimeout: NodeJS.Timeout;

const CountdownContext = createContext<CountdownContextData>({} as CountdownContextData);

function CountdownProvider({children}:CountdownProps) {
  const [time, setTime] = useState(0.00*60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time/60);
  const seconds = time % 60;

  const {startNewChallenge} = useChallenge();

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountdown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0 * 60);
    setHasFinished(false);
  }

  useEffect(()=>{
    if(isActive && time> 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time-1);
      }, 1000)
    } else if(isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive, time]);

  return(
    <CountdownContext.Provider value={{seconds, minutes, hasFinished, isActive,startCountdown, resetCountdown}}>
      {children}
    </CountdownContext.Provider>
  )
}

function useCountdown():CountdownContextData {
  const countdownContext = useContext(CountdownContext);
  if(!countdownContext)
    throw new Error('contexto de countdown deve ser usado dentro do seu provider');

    return countdownContext;
}

export {useCountdown, CountdownProvider};