import React , { useEffect, useState } from "react"
import Home from './components/home/'
import GamesHandler from './components/games/GamesHandler';
import './App.css';

function App() {
  const [gameSession,setGameSession] = useState()
  return (
    <> 
      { gameSession ? 
        <GamesHandler {...gameSession || {}}/> 
      :
        <Home onGameStart={p=>{
          setGameSession(p)
          console.log("Home___palyerload = ",p)
        }} />
      }
    </>
  );
}

export default App;
