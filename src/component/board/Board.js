import {useState, useEffect} from 'react';
import Cell from "../cell/Cell";
import './Board.css';

export default function Board(){
    const [board, setBoard] = useState([
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [1,2,0,0,0,0,0],
    ])
    return (
        <div class="game">
        {board.map((v, row) => <div class="flexbox"> {v.map((value,column) => <Cell cellRow={row} cellColumn={column} value={value} />)}</div>)}
        </div>
    );
}

function action() {
    console.log(board)
}