const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Signup EndPoint
router.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    if (!(name && email && password && confirmPassword)) {
      return res.status(400).json({ errorMessage: "All the fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ errorMessage: "Password did not match" });
    }
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      return res.status(400).json({ errorMessage: "User already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await user.save();
    const jwtData = {
      id: newUser._id,
      name: newUser.name,
    };
    const token = jwt.sign(jwtData, process.env.JWT_SEC);
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
    console.log(error);
  }
});

//Login EndPoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!(email && password)) {
      return res.status(400).json({ errorMessage: "All the fields are required" });
    }
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({ errorMessage: "Invalid Email or password" });
    }
    const correctPassword = await bcrypt.compare(password, findUser.password);
    if (!correctPassword) {
      return res.status(400).json({ errorMessage: "Invalid Email or password" });
    }
    console.log(correctPassword);
    const token = jwt.sign(
      {
        id: findUser._id,
        name: findUser.name,
      },
      process.env.JWT_SEC
    );
    res.cookie("token", token, { httpOnly: true }).send();
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
});

//LoggedIn endpoint
router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }
    const validateUser = jwt.verify(token, process.env.JWT_SEC);
    res.json({ id: validateUser.id, user: validateUser.name });
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
});

//Logout endpoint
router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token").send();
  } catch (error) {
    res.send(null);
  }
});

module.exports = router;
