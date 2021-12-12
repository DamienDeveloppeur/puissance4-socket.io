export default function Cell(props){
    return (
        <div data-rows={props.cellRow} data-columns={props.cellColumn}>X</div>
    );
}