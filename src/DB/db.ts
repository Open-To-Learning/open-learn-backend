import mongoose from "mongoose";


export default async function DBConnection(DB :string){
    try{

        await mongoose.connect(DB);
        console.log('connected to DB!');        
    }catch(err:any){
        console.log(err.message);
    } 

}