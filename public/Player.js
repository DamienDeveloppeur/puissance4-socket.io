class Player {
    id;
    name;
    color;
    players = [];
    constructor(id,name, color){
        this.id=id;
        this.name=name;
        this.color = color;
    }
    setName(name){
        this.name=name;
    }

    setColor(color){
        this.color=color;
    }

}
module.exports= {Player}