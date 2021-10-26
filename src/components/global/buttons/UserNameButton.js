
import GlobalConfig from "../GlobalConfig"

function UserNameButton({userName,color,type,className,...props}){
    const style = {
        parent : {
            display : 'flex',
            justifyContent : 'center',
        },
        children : {
            background : color||GlobalConfig.COLORS.BLUE,
            color : 'black',
            marginTop : type==='TEAM_NAME' ? 0 : '10px',
            padding : ` ${ type==='TEAM_NAME' ? 
                            (String(userName).length > 7 ? " 15px 80px ": "15px 20px") : 
                            (String(userName).length > 6 ? "10px 40px" : "10px 60px")}`,
            width : type!=='TEAM_NAME' ?'fit-content':"100%",
            margin : type!=='TEAM_NAME' ?'initial':"initial 20px",
            borderRadius : '10px',
            fontFamily : type==='TEAM_NAME' ? 'Dimbo':'Montserrat',
            fontWeight: type==='TEAM_NAME' ? 'normal' : 500,
            fontSize: type==='TEAM_NAME' ? 35 : 26,
            textTransform:'capitalize',
            textAlign:"center"
            
        }
    }
    return(
         <div style={style.parent} {...props} className={`${className} dynamic-btn`}>
            <div style={style.children}>{userName}</div>
        </div>
    )
}

export default UserNameButton