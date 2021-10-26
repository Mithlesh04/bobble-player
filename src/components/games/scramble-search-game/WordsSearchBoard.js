import { useEffect, useRef, useState } from "react";
import './../../scss/scramble-search-game.scss'
import { SwipeHandler } from "./SwipeEvent"

const data= [
    ["B","O","B","B","L","B","B","K","Y","R","I","K","K","H","H"],
    ["B","O","B","B","L","B","B","K","Y","R","I","K","K","H","H"],
    ["D","A","Q","O","E","V","B","B","W","C","B","B","M","V","W"],
    ["T","T","Z","B","O","N","A","N","Z","A","D","E","V","O","F"],
    ["R","F","B","E","E","L","P","R","U","P","M","T","H","T","Y"],
    ["F","L","P","R","I","Z","E","S","L","A","T","S","Y","R","C"],
    ["E","T","D","R","R","R","G","E","G","I","I","L","P","H","D"],
    ["G","U","N","I","G","O","R","N","H","T","D","T","E","O","P"],
    ["B","J","A","C","E","U","X","F","R","W","I","B","G","B","B"],
    ["R","Y","F","C","S","S","R","T","D","C","A","E","E","M","Q"],
    ["R","Y","F","A","R","D","N","C","Y","N","Q","B","A","O","R"],
    ["T","T","E","T","U","U","H","A","G","T","G","I","E","O","Y"],
    ["T","R","H","C","A","P","E","Z","J","D","N","R","K","N","B"],
    ["T","A","K","H","T","U","Q","P","H","R","Y","O","D","R","N"],
    ["V","P","N","U","T","Y","B","O","L","T","E","A","M","Q","M"]
]

function WordsSearchBoard() {    
   
    const [words,setWords] = useState(data)
    const WordsSearchRef = useRef()
   
  

    useEffect(()=>{
        const main = WordsSearchRef.current
        SwipeHandler(main)
        console.log("WordsSearchRef = ",main.swipe)
        // SwipeHandler(main)
    },[])

    return words ?
         <div className="WordsSearchBoard" ref={WordsSearchRef}>
            {
                words.map((row,rowIndex)=>{
                    return(
                        <div key={rowIndex+Math.random()} className="row">
                            {
                                row.map((col,colIndex)=>{
                                    return (
                                        <div data-key={col} key={col+colIndex+Math.random()} className="col">
                                               { col }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
     : null
}

export default WordsSearchBoard