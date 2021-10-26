import React , { useState } from "react"
import { Box } from "@mui/material"
import Modal from "./../../global/Modal"
import Timer from "../../global/Timer/Timer"
import AllTeamsPlayersTable from "./AllTeamsPlayersTable"
import { 
    BiddingBtnGrp, BiddingBtnAllTeams , CurrentTeamBidScore , OnlyCaptainBid, OnlyForTeamBid, WaitingForGameEnd
 } from "./Buttons"

 const GameEntrance = () => {
    const [isTimer, setIsTimer] = useState(true)
    const [isThisUserCaptain, setIsThisUserCaptain] = useState(true)
    const [isAllTeamsTable,setIsAllTeamsTable] = useState(true)
    const [isGameEnded,SetIsGameEnded] = useState(false) 

    return (
        <React.Fragment>
            <div>
               { isGameEnded ?
                    <div style={{display:'flex',justifyContent:'left'}}>
                        <BiddingBtnAllTeams onClick={_=>setIsAllTeamsTable(true)} />
                        <WaitingForGameEnd />
                    </div>
               :
                <div>
                    <Box className='container' >
                        <BiddingBtnAllTeams onClick={_=>setIsAllTeamsTable(true)} />
                        <Timer time={50} onComplete={_=>{}} />
                    </Box>
                    <h3 className="bidding-now">
                        <BiddingBtnGrp lives={3} bobbles={58} />
                    </h3>
                    {
                        isTimer ?
                            isThisUserCaptain ?
                                <OnlyCaptainBid />
                                : <div style={{marginTop : 100,fontFamily :'Montserrat' , fontWeight : 400, fontSize : 16}}>
                                    <OnlyForTeamBid />
                                  </div>
                                : <div style={{marginTop : 100 , textAlign:'center'}}>
                                    <CurrentTeamBidScore />
                                  </div>
                    }
                </div>
                }

                <Modal isOpen={isAllTeamsTable} CloseNow={_=>setIsAllTeamsTable(false)} style={{background:'#EEA862'}} >
                    <AllTeamsPlayersTable />
                </Modal>

            </div>

            
        </React.Fragment>
    )
}


export default GameEntrance
