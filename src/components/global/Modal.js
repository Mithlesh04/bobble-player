import React,{useEffect,useState} from 'react'
import ReactDom from 'react-dom'
import closeIcon from "./../assets/png-icons/X-button.png"
import GlobalConfig from './GlobalConfig'
import styled  from "styled-components";

const Styles = styled.div`
    width:100%;
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    .overlay{
        width:100%;
        background:#00000070;
        position:fixed;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index:100;
        opacity:${
            ({fadeType})=>{
                switch (fadeType){
                    case 'in': return "1";
                    default: return "0";
                }
            }                
        };
        transition:${
            ({fadeType})=>{
                switch (fadeType){
                    case 'in': return "opacity linear 0.3s";
                    case 'out': return "opacity linear 0.3s";
                    default: return "";
                }
            }  
        };
    }
    .container{
        max-width:500px;
        margin:0 auto;
        position:relative;
        min-height:100vh;
        z-index:101;
    }
    .popup{
        max-width:400px;
        background: #FBFBFB;
        position:absolute;
        bottom:-${82 * (window.innerHeight / 100)}px;
        width:90%;
        left:50%;
        height:80vh;
        max-height:800px;
        border:2px solid black;
        padding:30px 15px 30px;
        background:'red';
        transition:${
            ({fadeType})=>{
                switch (fadeType){
                    case 'in': return "transform ease-out 0.3s";
                    case 'out': return "transform ease-in 0.3s";
                    default: return "";
                }
            }  
        };
        transform:translate(${
            ({fadeType})=>{
                switch (fadeType){
                    case 'in': return "-50%, -80vh";
                    default: return "-50%, 0%";
                }
            }                
        });
        .close-btn{
            display:inline-block;
            cursor:pointer;
            border-radius:100px;
            margin-top:-40px;
            top:0;
            left:50%;
            display:flex;
            justify-content:right;
            align-items:right;
            .close-icon{
                width:35px;
            }
        }
        .content{
            height:100%;
        }
    }
    .modalTitle{
        margin-top : -50px;
        div {
            width : 80%;
            border:1px solid black;
            font-size : 30px;
            font-family:'Dimbo';
            background : white;
            padding : 5px 15px;
            text-align:center;
            border : 2px solid black;
            
        }
    }
`


const Modal = ({children,isOpen,CloseNow,title,...props}) => {
    const [fadeType,setFadeType] = useState(null);
    const handleTransitionEnd = (e) => {
        if (e.propertyName !== "opacity" || fadeType==="in")
            return;
        if(fadeType==="out"){
            CloseNow();
            document.body.style.paddingRight = `0px`;
            document.body.classList.remove("no-scroll")
        }
    }
    useEffect(() => {
        if(isOpen){
            setFadeType("in");
            const documentWidth = document.documentElement.clientWidth;
            const windowWidth = window.innerWidth;
            const scrollBarWidth = windowWidth - documentWidth;
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            document.body.classList.add("no-scroll")
        }
        return () => {
           console.log("unmounted")
        }
    }, [isOpen])
    if (!isOpen) return null;
    return ReactDom.createPortal(
        <Styles onTransitionEnd={handleTransitionEnd} fadeType={fadeType} >
            <div className="overlay"/>
            <div className="container" >
                <div className="popup" {...props}>
                    {
                        title ? 
                        <div className="modalTitle">
                        <div style={{
                            boxShadow:'4px 4px '+(title==="TEAM_PLAYERS" ? GlobalConfig.COLORS.DARK_ORANGE : 
                            title==="Scoreboard" ? GlobalConfig.COLORS.GREEN : 
                            title==="RULES" ? GlobalConfig.COLORS.DARK_BLUE :
                            title==="GAMES_CATEGORIES" ? GlobalConfig.COLORS.PURPLE : ''
                            )}}>
                            { title==="TEAM_PLAYERS" && "Who's on my team ? "}   
                            { title==="RULES" && "Rules"}   
                            { title==="GAMES_CATEGORIES" && "Mini Game Types"}   
                            { title==="Scoreboard" && "Scoreboard"}   
                        </div>
                    </div>
                    : null
                    }
                    <div className="close-btn" onClick={() => setFadeType("out")}>
                        <img className="close-icon" style={{width:50,height:50}} src={closeIcon} alt="close"/>
                    </div>
                    <div className="content scroll-bar" style={{overflow:'auto'}}>
                        {children}
                    </div>
                </div>
            </div>
        </Styles>,
        document.getElementById("modal")
    )
}

export default Modal
