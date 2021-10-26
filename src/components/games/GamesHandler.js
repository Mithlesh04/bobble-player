import { useEffect , useState } from 'react'

import ScrambleSearch from "./scramble-search-game/ScrambleSearch"
import BiddingGame from "./bidding-game"
import VotingGame from "./voting-game"


function GamesHandler(props){
    const { currentPlayerTeamData , gameSession , currentUser } = props
    const [gameType,setGameType] = useState('')

useEffect(()=>{
 if(gameSession.gameId && !gameType ){
     if(Number(gameSession.gameId)===1){
        setGameType('voting-game')
        console.log('gameSession = ',gameSession)
     }
 }
},[gameSession])

return<>
        {
            
            gameType === 'voting-game' ? <VotingGame {...props} /> : 
            gameType === 'bidding-game' ? <BiddingGame {...props} /> : 
            gameType === 'scramble-search-game' ? <ScrambleSearch {...props} /> : ''
        }
        
    </>
}

export default GamesHandler