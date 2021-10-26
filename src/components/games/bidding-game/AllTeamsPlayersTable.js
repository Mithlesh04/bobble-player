import React from "react";
import { Box } from '@mui/system'

import G8 from "./../../assets/Bobbles/G8.png"
import O7 from "./../../assets/Bobbles/O7.png"
import B1 from "./../../assets/Bobbles/B1.png"
import P10 from "./../../assets/Bobbles/P10.png"
import Lives from "./../../assets/png-icons/Lives.png"
import GoldBobble from "./../../assets/png-icons/Gold-Bobble.png"

const TEMP = {
     teams : [G8,O7,B1,P10],
     rows : [
        {
            name : 'Lives',
            icon : Lives,
            score : [2,2,3,3],
        },
        {
            name : 'Boobles',
            icon : GoldBobble,
            score : [100,100,100,100],
         },
         {
            name : 'Round 1 Bid',
            score : [42,12,21,15]
        },
        {
            name : 'Boobles',
            icon : GoldBobble,
            score : [58,88,79,85]
         },
         {
            name : 'Round 2 Bid',
            score : [22,22,3,15]
        },
        {
            name : 'Boobles',
            icon : GoldBobble,
            score : [100,100,100,100]
         },
         {
            name : 'Round 3 Bid',
            score : [42,12,21,15]
        },
        {
            name : 'Boobles',
            icon : GoldBobble,
            score : [null,null,null,null]
         },
         {
            name : 'Round 4 Bid',
            score : [null,null,null,null]
        },
        {
            name : 'Boobles',
            icon : GoldBobble,
            score : [null,null,null,null]
         },
         {
            name : 'Round 5 Bid',
            score : [null,null,null,null]
        },
        {
            name : 'Boobles',
            icon : GoldBobble,
            score : [null,null,null,null]
         },
         {
            name : 'Round 6 Bid',
            score : [null,null,null,null]
        },
        {
            name : 'Boobles',
            icon : GoldBobble,
            score : [null,null,null,null]
         },
         
     ]
}

const AllTeamsPlayersTable = () => {
    return (
        <div>
            <Box component="div" sx={{mt:2}}>
                <table border={1} style={{borderCollapse: 'collapse'}} className="team-table">
                    <thead>
                        <tr>
                            <th></th>
                           {
                               TEMP.teams.map((icon,index)=>{
                                   return <th key={icon}>
                                           <img src={icon} alt="team-icon" style={{width:43,height:43}} />
                                       </th>
                               })
                           }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            TEMP.rows.map((row,rowIndex)=>{
                                return <tr key={rowIndex+row.name}>
                                        <td>
                                            <div>
                                                {row.name}
                                                {row.icon ? 
                                                <div> <img src={row.icon} alt="icon" /></div>
                                                :null
                                                }
                                            </div>
                                        </td>
                                        {
                                            row.score.map((col,colIndex)=>{
                                                return <td key={colIndex+col}>
                                                        {col}
                                                    </td>
                                            })
                                        }
                                    </tr>
                            })
                        }
                    </tbody>
                </table>
            </Box>
        </div>
    )
}

export default AllTeamsPlayersTable
