import {useState , useEffect} from "react"
import UserNameButton from "../global/buttons/UserNameButton"
import GetTeamData from "../global/GetTeamsData"
import Modal from './../global/Modal'
import SessionStorage from "../global/SessionStorage"
import TeamPlayers from './Modals/TeamPlayers'
import SocketApis from './../apis/sockets/SocketApis'

var gemeSessionInterval = null
function ButtonsList({ players = [] , onGameStart , GetPlayerFinalPreferInterval }){

    const [isOpenModal,setIsOpenModal] = useState({
        isOpen : false,
        type : ''
    })

    const [currentPlayerTeamData,setCurrentPlayerTeamData] = useState()
    const currentUser = SessionStorage('userInfo').get() || {}
    const [gameSession,setGameSession] = useState({
        gameId : '',
        gameSessionid : ''
    })

    const handleModalOpen = (o,t)=>{
        setIsOpenModal({isOpen:o,type:t})
    }

    const GetGameSession = (pin)=>{
        SocketApis().GetGameSession(pin,data=>{
            if(data){
                let d = data.data
                if(data.status===1 && d){
                    let lst = d[d.length - 1]
                    if(lst.status===1 && lst.pin===pin){
                        const gameId = lst.gameid
                        const gameSessionid = lst.id
                        console.log("gameSessionid = ",gameSessionid)
                        setGameSession({...gameSession,gameId,gameSessionid})
                        if(GetPlayerFinalPreferInterval){
                            clearInterval(GetPlayerFinalPreferInterval)
                        }
                    }
                }
            }
            console.log('GetGameSession = ',data)
        })
    }

    useEffect(()=>{
        const pin = SessionStorage('userInfo').get('pin')
        gemeSessionInterval = setInterval(()=>{
            GetGameSession(pin)
        },2000)


    },[])

    useEffect(()=>{
        players.reduce((playerList, player) => {
            if (player.sessionid === currentUser.sessionId) {
                setCurrentPlayerTeamData({
                    ...GetTeamData('id',Number(player.teamid)),
                    __teamData : player
                })
            }
        }, [])


    },[players])

    useEffect(()=>{
        if(gameSession.gameId){
            if(onGameStart){
                if(gemeSessionInterval){
                    clearInterval(gemeSessionInterval)
                }
                onGameStart({currentPlayerTeamData , gameSession , currentUser})
            }
        }
    },[gameSession])

    return(
        <div className="ButtonsList" style={{marginTop : -70}}>
            <h3 style={{marginBottom:20}}>Welcome to the Party!</h3>
            <UserNameButton userName={currentUser.name || ''} color="#E57934"  />
           
           {
               currentPlayerTeamData ? 
                    <div className="team-name">
                        {currentPlayerTeamData.name}
                        <div><img src={currentPlayerTeamData.icon} alt={currentPlayerTeamData.name} /></div>
                    </div>
                : null
           }

            <div style={{marginTop:100}}>
                <div className="team-dtls">
                    <button onClick={() => handleModalOpen(true,"TEAM_PLAYERS")}>
                        Who's on My Team?
                    </button>
                </div>
                <div className="team-dtls">
                    <button onClick={() => handleModalOpen(true,"Scoreboard")}>
                        Scoreboard
                    </button>
                </div>
                
                <div className="team-dtls">
                    <button onClick={() => handleModalOpen(true,"RULES")}>
                        Rules
                    </button>
                </div>

                <div className="team-dtls">
                    <button onClick={() => handleModalOpen(true,"GAMES_CATEGORIES")}>
                        Mini Game Types
                    </button>
                </div>
            </div>

         <Modal isOpen={isOpenModal.isOpen} CloseNow={_=>{handleModalOpen(false,'')}} title={isOpenModal.type}>
            <div>
                {
                    isOpenModal.type === 'TEAM_PLAYERS' ? <TeamPlayers players={players} teamData={currentPlayerTeamData} currentUserId={currentUser.sessionId} /> : ''
                }
                
            </div>
         </Modal>
        </div>
    )
}

export default ButtonsList