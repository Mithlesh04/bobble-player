import React,{useEffect,useMemo,useState} from 'react'
import TimerStyle from "./TimerStyle"

const padLeadingZeros = (num, size) => {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

const Timer = ({time=60,onComplete}) => {
    const [counter, setCounter] = useState(time);
    
    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter((curCount) => curCount - 1), 1000);
        if(counter===0){
            onComplete(time);
        }
      }, [counter]);
    
      let min = padLeadingZeros(Math.floor(counter/60),2)
      
    return (
        <TimerStyle className="timer-clock">
          <div className="main-timer">
                {
                Number(min) ?
                    <>
                        <div className="min">{min}</div>:
                    </> : null
            }
            <div className="sec">{
                padLeadingZeros(counter%60,1)
            }</div>
          </div>
        </TimerStyle>
    )
}

export default Timer
