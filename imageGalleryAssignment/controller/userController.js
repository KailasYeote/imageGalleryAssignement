const userService = require("../service/userService");
const { generateToken } = require("../config/jwt");


const saveUser = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      console.log("Password and confirm password don't match");

      return res.status(400).json({
        message: "Password doesn't match",
      });
    }
    const data = req.body;
    const response = await userService.saveUser(data);
    const payload = {
      id: response._id,
      email: response.Email,
      password: response.Password,
    };

    const token = generateToken(payload);
    console.log("the token is generated successfully", token);

    console.log("Successfully saved data");

    return res.status(200).json({ user: response, token: token });
  } catch (error) {
    console.log("Error occurred during saving user:", error);

    return res.status(500).json({
      message: "Error occurred during saving data",
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    const id=user.id;
    const response = await userService.getUser(id);
    res.status(200).json(response);

    console.log("successfully fetched the user data");
  } catch (error) {
    res.status(500).json("Internal server error", error);
    console.log("error occured during the fetching user");
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const response = await userService.userLogin(email, password);
    
    const payload = {
      id: response._id,
      email: email,
      password: password,
    };
    const token = generateToken(payload);
    res
      .status(200)
      .json({ message: "Login successful", token: token, user: response });
  } catch (error) {
    console.log("Error occurred during the login...", error);
    res.status(500).json({ message: "Invalid Email and password", error });
  }
};


const updateUser = async (req, res) => {
  try {
    const user = req.user;
    const id = user.id;

    const data = req.body;
    const response = await userService.updateUser(id, data);
    console.log("updated data", response);
    res.status(200).json(response);
  } catch (error) {
    console.log("error occured during the updation data..");
    res.status(500).json("Internal server error");
  }
};



module.exports = { userLogin, getUser, saveUser, updateUser };
