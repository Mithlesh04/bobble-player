import styled from "styled-components"
import GlobalConfig from "../GlobalConfig"

export default styled.div`
    display:flex;
    color:black;
    text-align:center;
    justify-content:center;
    .main-timer{
        position:absolute;
        top : 0;
        font-family:'Dimbo';
        font-weight : 400;
        font-size:80px;
        background:white;
        width:157px;
        height:150px;
        padding:28px 30px;
        box-shadow:6px 6px ${GlobalConfig.COLORS.DARK_GREEN}
    }
`