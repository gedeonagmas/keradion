const { User } = require("../models/userModel");
const AppError = require("./AppError");
const { Invoice } = require("../models/invoiceModel");

const selectModel = (name, next) => {
  let model;
  switch (name) {
    case "users":
      model = User;
      break;
    case "invoices":
      model = Invoice;
      break;
    default:
      return next(
        new AppError("Something went wrong please try again!!!", 500)
      );
  }
  return model;
};

module.exports = { selectModel };
