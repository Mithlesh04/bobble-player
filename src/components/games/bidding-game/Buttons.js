import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import LivesIcon from "./../../assets/png-icons/Lives.png"
import BobbleGoldIcon from "./../../assets/png-icons/Bobble-Gold.png"
import CaptainOrange from "./../../assets/png-icons/Captain-Orange.png"
import GoldBobble from "./../../assets/png-icons/Gold-Bobble.png"
import BiddingRange from "./BiddingRange"

const TextForLeastBid = () => {
    return (
        <>
        <div style={{ textAlign: 'center' , fontWeight : 400 , fontFamily : "Montserrat" , fontSize : 16 }}>
            Don’t bid the least!<br />
            But make sure you have<br />
            enough for future rounds......<br />
        </div>
        </>
    )
}

const BiddingBtnGrp = ({ lives, bobbles, isLivesOnly }) => {
    return (
        <div>
            <Box component="div" sx={{ textAlign: 'right', justifyContent: 'center', display: 'flex' }}>
                <Box className="btnContainer">
                    <Box className="title">Lives</Box>
                    <Box component="div" className="btnBox">
                        <div className="icon-lives"><img src={LivesIcon} alt="LivesIcon" /></div>
                        <div className='lives-score'>{lives}</div>
                    </Box>
                </Box>
                {!isLivesOnly &&
                    <Box className="btnContainer" style={{marginLeft:20}}>
                        <Box className="title">Bobbles</Box>
                        <Box component="div" className="btnBox">
                            <div className="icon-bobble"><img src={BobbleGoldIcon} alt="BobbleGoldIcon" /></div>
                            <div className='bobble-score'>{bobbles}</div>
                        </Box>
                    </Box>
                }
            </Box>
        </div>
    )
}

const BiddingBtnLockItIn = (props) => {
    return (
        <div className="btnLockItIn">
            <Button variant="outlined" {...props}>Lock it in!</Button>
        </div>
    )
}

const BiddingBtnCaptainName = (props) => {
    return (
        <div className="userName">
            <Button variant="contained" {...props}>
                <img src={CaptainOrange} alt="CaptainOrange" />
                <div>Batman</div>
            </Button>
        </div>
    )
}


const CurrentTeamBidScore = () => {
    return (
        <>
        <div style={{ fontFamily : 'Dimbo' , fontWeight : 400 , fontSize : 36 , fontStyle : 'normal' }}>
            <div>Your team bid :</div>
            <div style={{display:'flex',marginTop : 10 , fontSize : 60}}>
                <img src={GoldBobble} alt="GoldBobble" style={{width:74.62,height:84.82,marginLeft:75}} />
                <div style={{alignSelf:'center',marginLeft : 30}}>12</div>
            </div>
        </div>

        <div style={{ marginTop: 90 , fontFamily : 'Montserrat' , fontWeight:400,fontSize : 16, textAlign:'center' }}>
           Waiting for the rest of the teams
        </div>
        </>
    )
}

const BiddingBtnAllTeams = (props) => {
    return (
        <div className="allTeambtn" >
            <Button variant="contained" {...props}>All Teams</Button>
        </div>
    )
}

const OnlyCaptainBid = () => {
    const [isClickLockItIn,setIsClickLockItIn] = useState(false)
    return (
        <React.Fragment>
            <div style={{marginTop:100,padding:20}}>
                <BiddingRange isLocked={isClickLockItIn} />
            </div>
            <div style={{marginTop : 100}}><TextForLeastBid /></div>
            <div className="currentCaptain">
                <img src={CaptainOrange} alt="currentCaptain" />
                <div style={{marginLeft:10,fontSize:16}}>
                    You are the Captain<br />
                    Bid any amount!
                </div>
            </div>
            <BiddingBtnLockItIn onClick={_=>setIsClickLockItIn(true)} disabled={isClickLockItIn} />
        </React.Fragment>
    )
}

const OnlyForTeamBid = () => {
    return (
        <div style={{marginTop:200}}>
            <TextForLeastBid />
            <div style={{ marginTop: 50, textAlign: 'center' }}>
                Only your captain can bid.<br />
                Your captain is:<br />
                Captain<br />
            </div>
            <div>
                <BiddingBtnCaptainName />
            </div>
        </div>
    )
}

const WaitingForGameEnd = () =>{
    return (
        <div style={{paddingTop:250, textAlign:'center'}} className="containe">
            <div className="teamLiveLeft">
                Your team has 0 Lives left
            </div>

            <div style={{marginTop:80,marginBottom:80}}>  
                <BiddingBtnGrp lives={0} isLivesOnly={true} />  
             </div>
            <div style={{fontSize:16,paddingTop:40}}>
                Waiting for game to end
            </div>
        </div>
    )
}


export { BiddingBtnGrp, BiddingBtnLockItIn, BiddingBtnCaptainName, BiddingBtnAllTeams , TextForLeastBid , CurrentTeamBidScore , OnlyCaptainBid, OnlyForTeamBid, WaitingForGameEnd}
