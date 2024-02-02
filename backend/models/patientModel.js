const mongoose = require("mongoose");
const User = require("./userModel");


const emailValidator = function (email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);}

const phoneNumberValidator = function (phoneNumber) {
  const numberRegex = /^(\+20|0020)?(10|11|12|15)[0-9]{8}$/;
  return numberRegex.test(phoneNumber);
};

const patientSchema = mongoose.Schema(
  {
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    passwordResetOTP: {
        type: String,
        default: "",
    },
    addresses: {
      type: [String], 
      default: [],   
    },
    mobile: {
      type: String,
      required: true,
      //unique: true,
      //validate: phoneNumberValidator
    },
    emergency: {
      type: {
        name: {
          type: String,
          required: true,
        },
        mobile: {
          type: String,
          required: true,
          sparse: true,
          //unique: true,
          //Unique removed
          //validate: phoneNumberValidator
        },
      },
    },

    family: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          nationalID: {
            type: String,
            required: true,
            unique: true,
          },
          age: {
            type: Number,
            required: true,
          },
          gender: {
            type: String,
            required: true,
          },
          relation: {
            type: String,
            required: true,
            enum: ["wife", "husband", "child"],
          },
        },
      ],
      default: [],
    },
    cart: [{
      
      medicineName: {
        type: String,
      },
      price: {
        type: Number
      },
      quantity: {
        type: Number,
 
      },
  }],
  
  
  },
  {
    timestamps: true,
  }
);


const Patient = User.discriminator("Patient", patientSchema);

module.exports = Patient;