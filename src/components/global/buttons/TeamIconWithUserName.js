import Button from '@mui/material/Button';
import GlobalConfig from '../GlobalConfig';
import "./../../scss/TeamIconWithUserName.scss"

const TeamIconWithUserName = ({ userName , teamName , teamIcon }) => {
    return <div className='TeamIconWithUserName-container'>
               <div className="TeamIconWithUserName-main">
                   { teamName ? 
                        <div>
                            <Button style={{ width: 279, height: 51.69, background: GlobalConfig.COLORS.ORANGE }}>
                                <div style={{ fontWeight: 400, fontFamily: 'Dimbo', fontSize: 32, marginLeft: 50, color: 'black', textTransform: 'capitalize' }}>{teamName}</div>
                                <img src={teamIcon} alt={teamName} style={{ width: 116.34, height: 110.92, marginLeft: 20 }} />
                            </Button>
                        </div>
                        : null
                    }
                    
                    { userName ? 
                        <div style={{ marginTop: 30 }}>
                            <Button style={{ width: 208, height: 60, background: GlobalConfig.COLORS.LIGHT_ORANGE }}>
                                <div style={{ fontWeight: 500, fontFamily: 'Montserrat', fontSize: 26, color: 'black', textTransform: 'capitalize' }}>{userName}</div>
                            </Button>
                        </div>
                        : null
                    }
               </div>
            </div>
}

export default TeamIconWithUserName