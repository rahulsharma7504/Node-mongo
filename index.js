const express=require('express');
const path=require('path')
const ejs=require('ejs');
const app=express();
const {connectDB}=require('./model/DB');
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
connectDB();
app.use(express.json())
app.set('view engine','ejs')

app.set('views',path.join(__dirname,'views'));



const {EJS} = require('./Routes/EJS')
app.use('/api',require('./Routes/Route').userRoute)
app.use('/api',EJS)

app.listen(3000,()=>{
    console.log("Server is On 3000 Port")
})
