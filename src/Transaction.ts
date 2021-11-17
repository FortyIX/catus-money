export default class Transaction {

    id! : string;
    date! : string;
    amount! : number;
    type! : string;
    account! : string;
    user! : string;
    note! : string;


    constructor(id:string,date:string,amount:number,type:string,account:string,user:string,note:string){
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.type = type;
        this.account = account;
        this.user = user;
        this.note = note
    }


}