import React from "react";
import CaptainOrange from "./../../assets/png-icons/Captain-Orange.png"
import Ninjazzy from "./../../assets/Bobbles/O7.png"
import TeamIconWithUserName from "./../../global/buttons/TeamIconWithUserName"

function Waiting() {
    return (
        <div className="Waiting">
            <TeamIconWithUserName userName="Batman" teamIcon={Ninjazzy} teamName='Ninjazzy' />
            <div className="waiting-main">
                <div className="chooseACaptain">Choose a Captain !</div>
                <div className="captain-img">
                    <img src={CaptainOrange} />
                </div>
            </div>
        </div>
    )
}

export default Waiting