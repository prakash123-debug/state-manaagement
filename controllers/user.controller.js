const models = require('../models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

function signUp(req,res){

models.User.findOne({where:{email:req.body.email}}).then(result=>{
	if(result){
		res.status(409).json({
			message:"email already exist"
		})
	}

	else {

		  const hashedPassword = bcrypt.hashSync(req.body.password, 8)
		  if(hashedPassword){

		  	const datas = {
		  		email:req.body.email,
		  		password:hashedPassword,
		  		phoneNumber:req.body.phoneNumber,
		  		fullName:req.body.fullName

		  	}

	
		  	let createUser = models.User.create(datas);
		  	if(createUser){
		  		res.status(201).json({
		  			message:"User Ceated",
		  			
		  		})
		  	}
		  	else{
		  		res.status(500).json({
		  			message:"Something went wrong"
		  		})
		  	}
		  }

		  else{
		  	res.status(500).json({
		  		message:"Something went wrong"
		  	})
		  }
	}

	})
.catch(error=>{
	res.status(500).json({
		message:"something went wrong"
	})
})

}


function login(req, res){
    models.User.findOne({where:{email: req.body.email}}).then(user => {
        if(user === null){
            res.status(401).json({
                message: "Invalid credentials!",
            });
        }else{
        	  var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        	  console.log("hiii neighbour",passwordIsValid);
        	  if(passwordIsValid){

        	  	 var token = jwt.sign({userId:user.id,email:user.email}, 'secret', { expiresIn: 864000 })
				    if (token) {
				        res.status(200).json({
				            message: "LoggedIn Successfully!!",
				            accessToken: token
				        })
				    } else {
				        res.status(500).json("Something Went Wrong!!");
				    }
        	  }

          
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!",
        });
    });
}


module.exports = {
	signUp:signUp,
	login:login
}