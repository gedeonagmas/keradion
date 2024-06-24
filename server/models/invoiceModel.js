const mongoose = require("mongoose");
const valid = require("../utils/validator");
const invoiceSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: valid.email("Email"),
      required: [true, "Email is required"],
    },

    date: {
      type: String,
      validate: valid.required("Due Date"),
    },

    products: {
      type: [{ type: Object, validate: valid.required("Products") }],
    },

    firstName: {
      type: String,
      validate: valid.name("First Name"),
    },

    lastName: {
      type: String,
      validate: valid.name("Last Name"),
    },

    phone: {
      type: String,
      validate: valid.phone("Phone"),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    address: {
      type: String,
      validate: valid.paragraph("Address", 4, 30),
    },
    amount: {
      type: Number,
    },
    companyName: {
      type: String,
      validate: valid.paragraph("Company Name", 4, 30),
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Invoice = mongoose.model("invoice", invoiceSchema);
module.exports = { Invoice };
