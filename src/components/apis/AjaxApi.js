import { Fetch } from './Ajax'
import SessionStorage from './../global/SessionStorage'

async function CreateLogin({ name , pin }){
    const res = await Fetch({ data : { name , pin } , type : 'POST', url : 'checklogin' })
    console.log('createPin = ',res)
    return res
}


async function GetAllTeams(){
    const res = await Fetch('getAllTeams')
    console.log('GetAllTeams = ',res)
    return res.data
}


async function CreatePlayerprefer(teamId){
    let userData= SessionStorage('userInfo').get()
    const res = await Fetch({ type : 'post' , url : 'createPlayerprefer' ,  data : { sessionid : userData.sessionId , pin : userData.pin ,teamid : teamId } })
    console.log('CreatePlayerprefer = ',res)
    return res
}

async function GetPlayerfinalprefer(pin){
    const res = await Fetch(`getPlayerfinalprefer/${pin}`)
    console.log('GetPlayerfinalprefer = ',res)
    return res
}

async function CreateVotingGameResult(payload){
    const res = await Fetch({ type : 'post' , url : 'createVotinggameresult' ,  data : payload })
    console.log('createVotinggameresult = ',res)
    return res
}




export { 
    CreateLogin , GetAllTeams , CreatePlayerprefer ,
    GetPlayerfinalprefer, CreateVotingGameResult
}

