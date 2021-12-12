import "./Cell.css"
import {useState, useEffect} from 'react';
import action from "../board/Board"
export default function Cell(props){
    return (
        <div className={`cell ${(props.value == 2) ? "red" : (props.value == 1) ? "blue" : ""}`}
         data-rows={props.cellRow} data-columns={props.cellColumn} onClick={() => action(props.cellColumn)}> {props.value} </div>
    );
}