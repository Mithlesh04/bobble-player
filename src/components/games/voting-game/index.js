
import { useEffect, useState } from "react"
import Waiting from "./Waiting"
import GameEntrance from "./GameEntrance"
import { GlobalStyle } from '../../global/GlobalStyle'
import './../../scss/bidding-game.scss'
import './../../scss/voting-game.scss'
import SocketApis from "../../apis/sockets/SocketApis"
import SessionStorage from "../../global/SessionStorage"

var getVotingGameDataInterver = null

function VotingGame(){
    const [isWaiting,setIsWaiting] = useState(true)
    const [votingGameData,setVotingGameData] = useState()

    const getVotingGameData = (pin)=>{
        SocketApis().GetVotingGame(pin,data=>{
            console.log('GetVotingGame = ',data)
            if(data.status===1){
                let lst = data.data[data.data.length - 1]
                setVotingGameData(lst)
                setIsWaiting(false)
            }
        })
    }

    useEffect(()=>{
        const pin = SessionStorage('userInfo').get('pin')
        getVotingGameDataInterver = setInterval(() => {
            getVotingGameData(pin)
        }, 2000);
    },[])


    return (
        <>
        <GlobalStyle gameType="voting-game" />
           <div className="main-container">
                <div className='main-front-container'>
                {
                        isWaiting 
                        ? 
                            <Waiting /> 
                        :
                            <GameEntrance votingGameData={votingGameData} />
                    }
                </div>
            </div>
        </>
    )
}

export default VotingGame