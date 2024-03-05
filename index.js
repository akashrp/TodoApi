const app=require('./app');
const POART=process.env.POART;
app.listen(POART,()=>{
    console.log("server started at " +POART)
})
