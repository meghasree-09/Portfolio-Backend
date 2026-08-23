const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received");
    console.log("Email:", email);

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase().trim()
    });

    if (!admin) {
      console.log("Admin not found");

      return res.status(401).json({
        message: "Admin account not found"
      });
    }

    console.log("Admin found:", admin.email);

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatch) {
      console.log("Password does not match");

      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    if (!process.env.JWT_SECRET) {
      console.log("JWT_SECRET is missing");

      return res.status(500).json({
        message: "JWT_SECRET is missing in .env"
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    console.log("Login successful");

    return res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};

module.exports = {
  loginAdmin
};