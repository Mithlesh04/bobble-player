import { func } from "prop-types";
import { io } from "socket.io-client";
import SessionStorage from './../../global/SessionStorage'



function GetPlayerFinalPrefer(pin,cb){
    const socket = io(`ws://13.232.184.252:5000/api/v1/socketgetplayerfinalprefer?pin=${pin}`);
      socket.on("socketgetplayerfinalprefer",(data)=>{
        cb(data)
      })
  }

function GetGameSession(pin,cb){
  const socket = io(`ws://13.232.184.252:5000/api/v1/getgamesession?pin=${pin}`);
      socket.on("getgamesession",(data)=>{
        cb(data)
      })
}

function GetVotingGame(pin,cb){
  const socket = io(`ws://13.232.184.252:5000/api/v1/getvotinggame?pin=${pin}`);
      socket.on("getVotinggame",(data)=>{
        cb(data)
      })
}


const SocketApis = () => {
    const socketServerURL = "ws://13.232.184.252:5000/api/v1/checksocket";
  let socket = io(socketServerURL);


  return {
        GetPlayerFinalPrefer,
        GetGameSession,
        GetVotingGame,
        CreatePlayerprefer(teamId){
            let userData= SessionStorage('userInfo').get()
            console.log('socket_emited_CreatePlayerprefer')
            socket.emit(`createPlayerprefer`,{ sessionid : userData.sessionId , pin : userData.pin ,teamid : teamId })
        },
        PlayerPrefer(){
            socket.emit(`player_prefer`, { id : 1, sessionId :"avcoj8ieRWZ9rewrQsOQEw==" , teamid :2 })
        }

    }
    // socket.on('connect', (e) => {
    //     console.log("Socket Link is connected = ",e);
    // });

    // socket.on("Start_Chat",function(e){
    //     console.log("Socket Link is connected = ",e);
    // })

    // socket.on("checksocket",function(e){

    // })

    // socket.on('disconnect', (e) => {
    //     console.log("Socket Link is disconnect = ",e);
    // });
    
    // socket.on('reconnect', (e) => {
    //     console.log("Socket Link is reconnect = ",e);
    // });

   // socket.on('stats', (e) => {
    //     console.log("stats = ",e);
    // });

};

export default SocketApis


