const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET
const auth = (req, res, next) => {
  try {
    const token= req.cookies.token
    if(!token)
    {
        return res.status(403).send("unautherized request");
    }
    const decode=jwt.verify(token,SECRET,(error,decode)=>{
        if(error)
        {
            return res.status(403).send("invalid token");

        }
        else{
            req.user=decode;
            next();
        }
    })

  } catch (error) 
  {
    console.log(error)
    return res.status(500).send("server error");
  }
};
module.exports= auth