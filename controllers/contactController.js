const Contact = require("../models/Contact");

const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to send message",
      error: error.message
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({
      createdAt: -1
    });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get messages",
      error: error.message
    });
  }
};

module.exports = {
  createContact,
  getContacts
};