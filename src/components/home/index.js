import { useState, useEffect } from "react";
import { GlobalStyle } from "../global/GlobalStyle";
import Login from "./Login";
import TeamSelection from "./TeamSelection";
import ButtonsList from './ButtonsList'

import './../scss/home-screen.scss'

import { ReactComponent as BobblesGroup } from "./../assets/BobblesGroup.svg"

const BubblePartyTop = (props) => {
    return (
        <div className="bobble-logo">
            <div className="bobbleParyText">
                <span>B</span>
                <span>o</span>
                <span>b</span>
                <span>b</span>
                <span>l</span>
                <span>e</span>
                <span>P</span>
                <span>a</span>
                <span>r</span>
                <span>t</span>
                <span>y</span>
            </div>
            <BobblesGroup {...props} />
        </div>
    )
}

var GetPlayerFinalPreferInterval

function Home({ onGameStart }) {
    const [screen, setScreen] = useState({
        screen: 'Login',
        data: null
    })
    const [getPlayersData, setPlayersData] = useState([])

    const handlePlayerData = (players) => {
        var newPlayers = []
        const findIsPlayerExists = (sessionId) => {
            let index = -1, i = 0
            for (let player of getPlayersData) {
                if (player.sessionid === sessionId) {
                    index = i
                    break;
                }
                ++i
            }
            return index
        }

        for (let player of players) {
            if (findIsPlayerExists(player.sessionid) === -1) {
                newPlayers.push(player)
            }
        }

        newPlayers = [...new Map([...getPlayersData, ...newPlayers].map(item => [item.sessionid, item])).values()];

        if (newPlayers.length) {
            console.log("newPlayers = ", newPlayers)
            setPlayersData(newPlayers)
        }

    }

    useEffect(() => {
        console.log("getPlayersData = ", getPlayersData)
    }, [getPlayersData])

    return (
        <>
            <GlobalStyle gameType="home-screen" />
            <div className="main-container">
                <div className='main-front-container'>
                    <BubblePartyTop />
                    <div style={{ marginTop: -150, display: 'flex', justifyContent: 'center' }}>
                        {
                            screen.screen === 'Login' ? <Login isNext={data => setScreen({ screen: 'TeamSelection' })} /> :
                                screen.screen === 'TeamSelection' ? <TeamSelection getPlayers={data => handlePlayerData(data)} isNext={data => setScreen({ screen: 'ButtonsList' })} GetPlayerFinalPreferInterval={GetPlayerFinalPreferInterval} /> :
                                    screen.screen === 'ButtonsList' ? <ButtonsList onGameStart={onGameStart} isNext={data => setScreen('')} players={getPlayersData} GetPlayerFinalPreferInterval={GetPlayerFinalPreferInterval} /> : ''
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home