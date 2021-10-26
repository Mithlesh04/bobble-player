import React , { useEffect , useState } from 'react'
import GlobalConfig from "../../global/GlobalConfig"
import UserNameButton from "../../global/buttons/UserNameButton"
import styled from "styled-components"
import BobbleIcon from './../../assets/png-icons/Bobble-Orange.png'
import GetTeamData from "../../global/GetTeamsData"
import { Box } from "@mui/system"
import SessionStorage from "../../global/SessionStorage"

const Styles = styled.div`
overflow-y:auto;
height:100%;
position:relative;
scrollbar-color: #4f2db8 #e4e4e4;
scrollbar-width: thin;
&::-webkit-scrollbar {
    width: 10px;
  }
  
&::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
    width:1px;
  }
  
&::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-image: linear-gradient(180deg, #4f2db8 0%, #7030b1 99%);
    box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
  }
  .scrollable{
      padding:10px 20px;
  }
.player-btn{
    margin-bottom:15px;
    padding : 15px;
    postion:relative;
    &:last-of-type{
        margin-bottom:0;
    }
    button{
        background-color: transparent;
        border: none; 
        color: #000; 
        font-size: 20px; 
        cursor: pointer; 
    }
    .you-bobble-icon{
        width:30px;
        transform:translateY(-50%);
        position:absolute;
        margin-top:14px;
        img{
            width:30px;
            position:relative;
            left:-7rem
        }
        .you-icon{
              color:white;
              position:fixed;
              left:-5rem;
              transform:rotate(60deg);
              font-family:Dimbo;
            }
    }
}
.teamNameWithIcon{
   justify-content:center;
   margin-top:30px;
   margin-bottom:30px;
   button{
    background:#E57934;
    border:0;
    border-radius:10px;
    font-family:'Dimbo';
    font-weight:400;
    font-size:33px;
    width:100%;
    padding:15px;
    fontSize:27px;
    text-transform:capitalize;
    img{
        width : 100px;
        position:absolute;
        top : 20px;
    }
   }
}
`

const PlayersList = ({ players , teamData , currentUserId}) => {
    // let players = [
    //     {
    //         name: 'p1',
    //         sessionId: 3
    //     },
    //     {
    //         name: 'p2',
    //         sessionId: 30
    //     }
    // ]    
    // 

    console.log("players= ",players)

    return (
        <Styles>
            <div className="scrollable">
                {
                    (teamData && teamData) ? 
                    <div className="teamNameWithIcon">
                        <button>
                            { teamData.name}
                            <img src={teamData.icon} />
                        </button>
                    </div>
                    :
                    null
                }
                {
                    players.reduce((playerList, player) => {
                        if (player.sessionid === currentUserId) {
                            player['teamData'] = player.teamid
                            playerList.unshift(player);
                        }
                        else {
                            playerList.push(player)
                        }
                        return playerList
                    }, []).map((players,index) => {
                            const { name, sessionid , teamid } = players
                            if(teamData?.__teamData?.teamid!==teamid){
                                return null
                            }
                            return (
                                <div style={{ justifyContent: 'center' , marginTop : 20 }} key={sessionid + Math.random()+index} >
                                   <Box>

                                    <div className="player-btn"
                                            style={{
                                                background: currentUserId === sessionid ? GlobalConfig.COLORS.DARK_ORANGE : GlobalConfig.COLORS.ORANGE,
                                                color: 'black',
                                                fontWeight: 500,
                                                fontSize: 20,
                                                fontFamily: 'Montserrat',
                                                width: '100%',
                                                textAlign: 'center',
                                                borderRadius : 10
                                            }}

                                        >
                                           <button>
                                           {
                                               currentUserId === sessionid ?
                                               <div className="you-bobble-icon">
                                                        <div className="you-icon">
                                                            You
                                                        </div>
                                                        <img src={BobbleIcon} />
                                                    </div> : null

                                            }
                                            {(name || sessionid).slice(0,8)}
                                           </button>
                                      </div>
                                    </Box>
                                </div>
                            )
                        })
                }

            </div>
        </Styles>
    )
}

export default PlayersList