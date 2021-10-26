import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import Timer from "../../global/Timer/Timer"
import Ninjazzy from "./../../assets/Bobbles/O7.png"
import CheckMarkIcon from './../../assets/png-icons/Check-shadow.png'
import TeamIconWithUserName from "./../../global/buttons/TeamIconWithUserName"
import { CreateVotingGameResult } from './../../apis/AjaxApi'
import SessionStorage from "../../global/SessionStorage"

const GameEntrance = ({ votingGameData }) => {
    const [isTimerEndend, setIsTimerEndend] = useState(false)
    const [isTimer, setIsTimer] = useState(true)
    const [isVotingGameData, setIsVotingGameData] = useState({ option_values: [] })
    const [optionSelectedIndex,setOptionSelectedIndex] = useState()
    const [isAnswerSubmitted,setIsAnswerSubmitted] = useState(false)

    const handleGameResultSubmit = async ()=>{
        let userInfo = SessionStorage('userInfo').get()
        let data = {
            "votingid": votingGameData.id,
            "sessionid": userInfo.sessionId,
            "gamesessionid":votingGameData.gamesessionid,
            "result": Object.values(isVotingGameData.option_values[optionSelectedIndex] || {})[0],
            "pin": votingGameData.pin
        }
       console.log("CreateVotingGameResult__data = ",data)
       const res = await CreateVotingGameResult(data)
       if(res.status===1){
           setIsAnswerSubmitted(true)
           console.log("CreateVotingGameResult__res = ",res)
       }
    }

    useEffect(() => {
        setIsVotingGameData({
            ...votingGameData,
            option_values: JSON.parse(votingGameData.option_values)
        })
    }, [votingGameData])

    useEffect(()=>{
        if(isTimerEndend && !isAnswerSubmitted){
            handleGameResultSubmit()
        }
    },[isTimerEndend])
    console.log("votingGameData_____________ = ", votingGameData)
    return (
        (isTimerEndend || isAnswerSubmitted) ?
            <div>
                <TeamIconWithUserName userName="Batman" teamIcon={Ninjazzy} teamName='Ninjazzy' />
                
                <div className="voting-heading" style={{ marginTop: 100 }}>You voted for:</div>
                <div className="voting-section" style={{ marginTop: 200 }}>
                    <div className="voting-buttons">
                        {
                            (optionSelectedIndex || optionSelectedIndex===0) ? 
                                <div>
                                    <button className='checked'>
                                        <div><img src={CheckMarkIcon} alt="CheckMarkIcon" /></div>
                                        {Object.values(isVotingGameData.option_values[optionSelectedIndex])[0]}
                                    </button>
                                </div>
                            : null
                        }
                    </div>
                </div>
                <div className="voting-message" style={{ marginTop: 50 }}>Waiting for Host</div>
            </div>
            :
            <div>
               { isVotingGameData.timer ? 
                    <Box className='container'>
                        <Timer time={Number(isVotingGameData.timer)} onComplete={_ => { setIsTimerEndend(true) }} />
                    </Box>
                : null
                }
                <div className="voting-heading" style={{ marginTop: 200 }}>Vote Now!</div>
                <div className="voting-section">
                    <div className="voting-buttons">
                        {isVotingGameData?.option_values.map((option, index) => {

                            let s = optionSelectedIndex===index
                            return (
                                <React.Fragment key={index + Math.random()}>
                                    <div>
                                          <button className={s ? 'checked' : '' } onClick={_=>setOptionSelectedIndex(index)}>
                                              {
                                                  s ? 
                                                  <div><img src={CheckMarkIcon} alt="CheckMarkIcon" /></div>
                                                  : null
                                              }
                                            {Object.values(option)[0]}
                                          </button>
                                        </div>
                                </React.Fragment>
                            )

                        })}
                    </div>
                </div>
                <div className="voting-message" style={{ marginTop: 50 }}>You can change your answer until times runs out</div>
            </div>
    )
}


export default GameEntrance
