let turn = 0;
var map = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [1,2,0,0,0,0,0],
];
const rows = 7;
const line = 7;
console.log("test")
let grille = "";
for (i = 0; i <rows; i++) {
    grille += "<div class='flexbox'>";
    for (j = 0; j < line; j++) {
        if(map[i][j] == 0) grille += "<div class='case' data-rows='"+i+"' data-columns='"+j+"'></div>";
        if(map[i][j] == 1) grille += "<div class='case red' data-rows='"+i+"' data-columns='"+j+"'></div>"
        if(map[i][j] == 2) grille += "<div class='case blue' data-rows='"+i+"' data-columns='"+j+"'></div>"
    }
    grille += "</div>";
}
$("#game").html(grille)

$(".case").click(function(e) {
    turn == 0 ? turn = 1 : turn = 0
    //console.log("ligne : "+ $(e.target).data("rows"));
    //console.log("collone : "+ $(e.target).data("columns"));
    console.log()
    // pour une collones cliquée, chercher la valeur de ligne la plus basse 
    $.each($('div[data-columns='+$(e.target).data("columns")+']'), function(i, e) {
        console.log('name='+ i + ' value=' +e);
    });
    //console.log("turn : " + turn)
});