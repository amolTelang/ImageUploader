import express from 'express';
import ejs from 'ejs';
import multer from 'multer';
import path from 'path';

//initilaize express
const app=express();

app.set('view engine','ejs');
app.use(express.static('./public'));


app.get('/',(req,res)=>{
    res.render('index')
})


const PORT=process.env.PORT||3001;


//server init
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`);
});