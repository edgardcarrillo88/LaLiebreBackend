const jwt = require('jsonwebtoken')

const validatetoken = (req, res, next) => {

    console.log("ejecutando middleware getprofile");
    console.log(req);
    const token = req.cookies.MyTokenName;
    console.log(token);

    if (!token)
        return res.status(401).json({ message: "Authorization denied" })

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Invalid token" })
        req.user = decoded
        next()
    })
}



module.exports = validatetoken;