export default function Cell(props){
    return (
        <div data-rows={props.row} data-columns={props.column}> {props.value} </div>
    );
}