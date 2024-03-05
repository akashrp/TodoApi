const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const User= require('../Model/user');
const SECRET= process.env.SECRET

// exports.home=(req,res)=>
// {
//     res.status(200).send("Hey there home here");
// }
exports.createAccount=async(req,res)=>
{
    try {
        const{firstname,lastname,email,password}=req.body;
        if(!(firstname && lastname && email && password))
        {
            return res.status(400).send("insufficent data");
        }
        const isUserExist= await User.findOne({email:email});

        if(isUserExist)
        {
            return res.status(400).send("user already exists")
        }

        //hash the password
        const hashedPassword= await bcrypt.hash(password,8);
        const user=await User.create({
            firstname,
            lastname,
            email,
            password:hashedPassword
        });
        if(user)
        {
            user.password=undefined;
            const token= jwt.sign({id:user._id,email},SECRET,{expiresIn:'2h'})
            user.token=token
            return res.status(201).json(user);
        }
        return res.status(500).send("error in server")

    } catch (error) {
        return res.status(500).send("error in server")

    }
}
exports.login=async(req,res)=>
{
    try {
        const{email,password}=req.body
        if(!(email && password))
        {
            return res.status(400).send("insufficent data");
        }
        const user = await User.findOne({email:email});
        console.log(user)
        if(user && await bcrypt.compare(password,user.password))
        {
            
            const token= jwt.sign({id:user._id,email:email},SECRET,{expiresIn:'2h'})
            console.log("here")
            user.password=undefined;
            user.token=token;
            const options={
                httpOnly:true,
                expire:1*24*60*60*1000
            }
         return   res.status(200).cookie("token",token,options).json({
                    success:true,
                    user,
                    token
            })
        }
        return res.status(404).send("wrong email or password");
    } catch (error) {
        console.log(error)
        res.status(500).send("server error");
    }
}
// exports.dashboard=(req,res)=>
// {
//     res.status(200).send("welcome to dashboard")
// }