import React from "react";
import CaptainOrange from "./../../assets/png-icons/Captain-Orange.png"
import Ninjazzy from "./../../assets/Bobbles/O7.png"
import TeamIconWithUserName from "./../../global/buttons/TeamIconWithUserName"

function Waiting() {
    return (
        <div className="Waiting">
            <TeamIconWithUserName userName="Batman" teamIcon={Ninjazzy} teamName='Ninjazzy' />

            <div style={{padding:30,paddingTop:150,textAlign:'center',fontFamily:'Montserrat',fontSize:26,fontWeight:500}}>
                <div style={{paddingTop : 25}}>All we do is</div>
                <div style={{paddingTop : 25}}>Wait</div>
                <div style={{paddingTop : 25}}>Wait</div>
                <div style={{paddingTop : 25}}>Wait</div>
                <div style={{paddingTop : 25}}>No matter what</div>
            </div>
            
        </div>
    )
}

export default Waiting