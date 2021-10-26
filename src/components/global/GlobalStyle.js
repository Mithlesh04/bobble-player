import { createGlobalStyle } from 'styled-components'
import GlobalConfig from "./GlobalConfig"

const GlobalStyle = createGlobalStyle`
    body {
        background : ${({ gameType }) =>//you can create ur own conditions
                gameType === "home-screen" ? '#ddeef7' :
                gameType === "voting-game" ? '#d4e9b7' :
                gameType === "bidding-game" ? "#ffe9b3" : 'white'
        };
        display : flex;
        justify-content : center;
    }

    .main-container{
        background-image:url(${({ gameType }) => {//you can create ur own conditions
            return gameType === "home-screen" ? GlobalConfig.HOME_SCREEN_FIRST_PAGE_BG_IMG : 
                  gameType === "voting-game" ? GlobalConfig.VOTING_SCREEN_FIRST_PAGE_BG_IMG :
                   gameType === "bidding-game" ? GlobalConfig.BIDDING_SCREEN_FIRST_PAGE_BG_IMG :
                   gameType === "memelord-caption-game" ? GlobalConfig.MEMELORD_CAPTION_SCREEN_FIRST_PAGE_BG_IMG : ''
        }});
        background-position:center;
        background-size:cover;
        height:auto;
        width:414.18px;
        padding-bottom:50px;
        padding-top:50px;
        justify-content: center;
        align-items: center;
        display: flex;
            .main-front-container{
                width : 349px;
                min-height : 803px;
                background: url(${GlobalConfig.HOME_SCREEN_FRONT_CONTAINER});
                background-position:center;
                background-size:cover;
                border-radius:${GlobalConfig.HOME_SCREEN_FRONT_CONTAINER_BORDER_RADIUS};
                display:inline-grid;
                padding : 10px; 
            }
    }
  
`


export { GlobalStyle }