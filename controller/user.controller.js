
const {User} = require('../models/user.model')
const jwt = require('jsonwebtoken')




exports.create_new_user = async (req, res) => {

    try {

      const reqBody = req.body;
      const {username , email , password} = reqBody
      let user = await User.create(reqBody);
      return res
        .status(201)
        .send({ status:true, message: "user created sucessfully" , user});

    } catch (err) {
      
      console.log("Error(create_new_user): ", err);
      return res
        .status(500)
        .send({ status:false, message: err });
    }

  };
  

  exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        let user = await User.findOne({ email });
    
        if (!user)
          return res.status(400).send({
            status: false,
            message: "user not found",
          });
    
        const tokens = await jwt.sign(
          {
            _id: user._id.toString(),
          },
          "prakash",
          { expiresIn: "5h" }
        );
        user.password = undefined
      return res
        .status(200)
        .send({ status:true, message: "user sucessfully login" , tokens});

    } catch (err) {
      
      console.log("Error(login): ", err);
      return res
        .status(500)
        .send({ status:false, message: err });
    }

  };

  exports.getUser = async (req, res) => {

    try {

        
        const user = req.user._id;

        console.log(user)
        if (!user)
        return res.status(400).send({
          status: false,
          message: "user not found",
        });

        let isLogin = await User.findById(user);

        if(!isLogin){
        
            return res.status(400).send({
              status: false,
              message: "not valid user",
            });
        }
    let data = await User.find()
      return res
        .status(200)
        .send({ status:true, message: "user sucessfully get" , data});

    } catch (err) {
      
      console.log("Error(getUser): ", err);
      return res
        .status(500)
        .send({ status:false, message: err });
    }

  };