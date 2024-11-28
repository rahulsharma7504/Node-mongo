const mongoose=require('mongoose');
const connectDB=async()=>{
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/Reletionship');
        console.log("DB Connected")
        
    } catch (error) {
        console.log("Some Error To Connect Db")
        
    }

}
module.exports={connectDB};