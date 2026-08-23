const mongoose = require("mongoose");
const dns = require("node:dns");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

dns.setDefaultResultOrder("ipv4first");

dns.setServers([
  "8.8.8.8",
  "1.1.1.1"
]);

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const password = "Admin@123";

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const admin = await Admin.findOneAndUpdate(
      {
        email: "admin@portfolio.com"
      },
      {
        name: "Portfolio Admin",
        email: "admin@portfolio.com",
        password: hashedPassword
      },
      {
        upsert: true,
        new: true
      }
    );

    console.log("Admin account ready");
    console.log("Email:", admin.email);
    console.log("Password:", password);

    await mongoose.disconnect();

  } catch (error) {
    console.error(
      "Admin creation failed:",
      error
    );

    process.exit(1);
  }
};

createAdmin();