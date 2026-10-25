const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Signup User

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }   

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        const token = jwt.sign({  id: user._id.toString(), role: user.role}, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({ message: "User registered successfully", token, user: { id: user._id,
             username: user.username,
              email: user.email,
               role: user.role
             } 
        });
    } catch (error) {
        console.error("Error registering user:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

   
// Login User

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }


        const token = jwt.sign({  id: user._id.toString(), role: user.role}, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).json({ message: "User logged in successfully", token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
    }   
catch (error) {
        console.error("Error logging in user:", error.message);
        res.status(500).json({ message: "Server error" });
    }       

};



const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Google token is required" });
    }

    // Verify Google/Firebase user on the backend
const decoded = await adminAuth.verifyIdToken(idToken);

    if (!decoded.email) {
      return res.status(400).json({ message: "Google email not found" });
    }

    let user = await User.findOne({
      email: decoded.email.toLowerCase(),
    });

    if (!user) {
      const baseName = (decoded.name || decoded.email.split("@")[0])
        .replace(/[^a-zA-Z0-9_]/g, "")
        .slice(0, 20) || "googleuser";

      user = await User.create({
        username: `${baseName}_${decoded.uid.slice(-6)}`,
        email: decoded.email.toLowerCase(),
        password: undefined,
        role: "user",
      });
    }

    // Create the same JWT format as email/password login
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google login error:", error.message);
    return res.status(401).json({
      message: "Google login failed. Please try again.",
    });
  }
};

module.exports = { registerUser, loginUser, googleLogin };

