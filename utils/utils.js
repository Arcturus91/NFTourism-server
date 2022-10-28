const jwt = require("jsonwebtoken");

exports.clearRes = (data) => {
    const {password,createdAt,updatedAt,__v,...restData} = data;
    return restData;
}

exports.createJWT = (user) =>{
return jwt.sign({
    userId:user._id,
    email:user.email,
    role:user.role
},process.env.SECRET,{expiresIn:'24h'}).split(".") 
}

exports.clearCryptoRes = (data) => {
    const {createdAt,updatedAt,__v,...restData} = data;
    return restData;
}




