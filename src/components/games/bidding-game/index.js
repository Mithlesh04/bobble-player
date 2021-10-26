
import { useState } from "react"
import Waiting from "./Waiting"
import GameEntrance from "./GameEntrance"
import { GlobalStyle } from '../../global/GlobalStyle'
import './../../scss/bidding-game.scss'

function BiddingGame(){
    const [isWaiting,setIsWaiting] = useState(false)
    return (
        <>
        <GlobalStyle gameType="bidding-game" />
           <div className="main-container">
                <div className='main-front-container'>
                    {
                        isWaiting 
                        ? 
                            <Waiting /> 
                        :
                            <GameEntrance />
                    }
                </div>
            </div>
        </>
    )
}

export default BiddingGame