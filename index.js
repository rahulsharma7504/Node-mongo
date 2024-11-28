const express=require('express');
const app=express();
const {connectDB}=require('./model/DB');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
connectDB();
app.use(express.json())


app.use('/api',require('./Routes/Route').userRoute)

app.listen(3000,()=>{
    console.log("Server is On 3000 Port")
})
