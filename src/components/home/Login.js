import React , { useEffect, useState } from "react";
import { CreateLogin } from "../apis/AjaxApi";
import SessionStorage from "../global/SessionStorage";
import { Box , TextField  } from '@mui/material';

function Login({ isNext }){
   const [data,setData]=useState({
       name : '',
       pin : ''
   })
   const [errorMsg,setErrorMsg] = useState('')

    const handlePlay = async ()=>{
        let name = data.name
        let pin = data.pin

        if(name){
            if(pin){
                const result = await CreateLogin({ name , pin  })
                console.log('response = ',result)
                if(result && result.status===1){
                    SessionStorage('userInfo').set({
                        name:result.data.dataname,
                        sessionId:result.data.sessionid,
                        pin:result.data.data,
                    })
                    if(isNext){
                        isNext(data)
                    }
                }else{
                    setErrorMsg(result.message)
                }
            }else setErrorMsg("Enter your name")
        }else setErrorMsg("Enter your name")
        
    }
    
   
    return(
         <Box component="div" sx={{'& > :not(style)': { m: 1, width: '25ch' }}}
            noValidate
            autoComplete="off"
            className="login-container"
            >
            <div className="input-container">
                <TextField 
                    placeholder="Real Name"
                    onChange={e=>setData({...data,name:e.target.value})}
                    name="username" 
                />
            </div>
            <div className="input-container">
                <TextField 
                    placeholder="PIN"
                    onChange={e=>setData({...data,pin:e.target.value})}
                    name="pin" 
                />
            </div>
            <div style={{color:'red',fontSize:12}}>{errorMsg}</div>
            <button className="submit-btn" onClick={handlePlay} >Play!</button>
            <div className="askHost">
                Don't know the PIN?
                <br />
                Ask the Host!
            </div>
            </Box>
            /* <div>
                <div><input ref={inputName} style={{padding : 30}} type="text" placeholder="Real Name" /></div>
                <div><input ref={inputPin} style={{padding : 30}} type="text" placeholder="PIN" /></div>
                {errorMsg}
                <div><button onClick={handlePlay} style={{padding:60}}>Play</button></div>
            </div> */
    )

}

export default Login