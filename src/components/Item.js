class Item{

    static idItem = 0;

    constructor(text){
        this.id = Item.idItem++;
        this.text = text;
        this.done = false; 

    }
}

export default Item;