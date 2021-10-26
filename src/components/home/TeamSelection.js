import React,{useState,useEffect} from "react"
import { GetAllTeams , CreatePlayerprefer , GetPlayerfinalprefer } from "../apis/AjaxApi"
import GetTeamData from "../global/GetTeamsData"
import SessionStorage from "../global/SessionStorage"
import GlobalConfig from "../global/GlobalConfig"
import { makeStyles } from "@mui/styles"
import UserNameButton from "../global/buttons/UserNameButton"
import SocketApis from "../apis/sockets/SocketApis"

const useStyles = makeStyles(theme => ({
    root: {
        padding : '5%',
        cursor : 'pointer',
        borderRadius : 20,
        transition:"background 0.2s ease",
        "& img" : {
            width : 96,
            height : 96,
        },
        "&>img":{
            objectFit:"contain",
            objectPosition:"center",
            width:"100%",
            height:"100%"
        }
    },
    col:{
        float: 'left',
        width: '50%'
    },
    row : {
        display:'table',
        clear:'both'
    },
    selectedTeam :{
        background:GlobalConfig.COLORS.BLUE
    },
    selectTeam : {
        "&:hover" : {
            background:GlobalConfig.COLORS.BLUE
        }
    }

 }));

function TeamSelection({ isNext , getPlayers=_=>{} , GetPlayerFinalPreferInterval }){
    const className = useStyles()
    const [teams,setTeams] = useState([])
    const [userData,setUserData] = useState({
        name : '',
        pin : '',
        sessionId: ''
    })
    const [selectedTeamId,setSelectedTeamId] = useState()
    const getAllTeams = async()=>{
        let result = await GetAllTeams()
        console.log('result = ',result)
        setTeams(result)
    }

    const handleTeamSelection = async(id)=>{
        if(!selectedTeamId){
            setSelectedTeamId(id)
            const result = await CreatePlayerprefer(id)
            if(result && result.status===1){
                let pin = SessionStorage('userInfo').get('pin')
                if(pin){
                    var isNextPresed = false
                    GetPlayerFinalPreferInterval = setInterval(_=>{
                        SocketApis().GetPlayerFinalPrefer(pin,data=>{
                            if(data.status===1){
                                if(!isNextPresed){
                                    isNext(true)
                                    isNextPresed = true
                                }
                                getPlayers(data.data)
                            }
                        })
                    },1500)
                    
                    // if(finalPlayer && finalPlayer.status===1 && finalPlayer.data.length){
                    // }

                }
            }else{
                //handle errors
            }
        }
    }

    useEffect(()=>{
        setUserData(SessionStorage('userInfo').get())
        getAllTeams()
    },[])


    return(
        <div style={{marginTop:350,textAlign:'center'}}>
            <h3 style={{marginBottom:20}}>Welcome to the Party!</h3>
            <UserNameButton userName={userData.name}  />
            <p style={{marginTop:80}}>
                Want to be particular time?<br />
                Go ahead and click on the<br />
                Booble color you like !<br /><br />
                No guarateees you will be on<br />
                that team but it helps.You will be<br />
                assigned when the game starts!
            </p>
            <div style={{marginTop:50}} className={className.row}>
                {
                    
                    teams.map((responseTeams,index)=>{
                        let team = GetTeamData('name',responseTeams.team_name)
                        return(
                            <div className={`${className.root} ${className.col} ${selectedTeamId===responseTeams.id ? className.selectedTeam : className.selectTeam} team-select-icon`} key={team.name+index}>
                                <div>
                                    <img src={team.colorIcon} onClick={_=>{
                                        handleTeamSelection(responseTeams.id)
                                }} style={{ 
                                    ...((selectedTeamId && selectedTeamId!==responseTeams.id)? {opacity:0.6} : {})
                                 }} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>





            
        </div>
    )
}

export default TeamSelection