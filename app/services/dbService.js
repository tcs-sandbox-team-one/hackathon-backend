const mongoose = require("mongoose");
require("dotenv").config();
const mongodb_url = process.env.MONGODB_URL;
console.log("Url is .....", mongodb_url);

mongoose
  .connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

/*********Schema********************/
const hospitalDataSchema = new mongoose.Schema({
  hospitalName: String,
  phoneNo: Number,
  pincode: Number,
  address: String,
  genBedAvailability: String,
  no_bedGeneral: Number,
  icuAvailability: String,
  no_IcuAvailable: Number,
  rating: Number,
  insuranceCoverage: String,
  ambulanceResponseTime: String,
  contactPerson: String,
  updateDate: { type: Date, default: Date.now },
});

const testcenterSchema = new mongoose.Schema({
  hospitalName: String,
  phoneNo: Number,
  pincode: Number,
  address: String,
  contactPerson: String,
  wardNo: Number,
  updateDate: { type: Date, default: Date.now },
  no_of_testings: Number,
  no_of_positive: Number,
});

/************************************Hospital Data********************* */

//compiles the schema into a model, which gives us a class
const HospitalData = mongoose.model("hospital_detail", hospitalDataSchema);

/***Retrieve hospital data with pincode filter***/
async function getHospitalByPincode(pincode) {
  try {
    const hospitals = await HospitalData.find({ pincode });
    return hospitals;
  } catch (error) {
    console.log("unable to retrieve");
    return null;
  }
}

/*******Get hospital by id*** */
async function getHospitalById(id) {
  try {
    const hospital = await HospitalData.findOne({ _id: id });
    return hospital;
  } catch (error) {
    console.log("unable to retrieve");
    return null;
  }
}

/****Update hospital data***** */
async function updateHospitalData(id, updateData) {
  console.log("Update data...", updateData);
  const hospitaldata = await HospitalData.findById(id);
  if (!hospitaldata) {
    console.error("Unable to find the hospital!! id mismatch!!");
    return null;
  } else {
    hospitaldata.set(updateData);
    const result = await hospitaldata.save();
    console.log("Updated hospital data successfully!", result);
    if (result !== null) return result;
    else return null;
  }
}

/***************************Test centre + ward Data****************** */
const TestcenterData = mongoose.model(
  "test_center",
  testcenterSchema,
  "test_center"
);

async function getTestcenterData(pincode) {
  try {
    const testcentres = await TestcenterData.find({ pincode });
    console.log("Success-- Testcentres");
    return testcentres;
  } catch (error) {
    console.log("unable to retrieve-- Testcentres");
    return null;
  }
}

async function updateTestcenterData(id, updateData) {
  console.log("Update data...", updateData);
  const testcenterData = await TestcenterData.findById(id);
  if (!testcenterData) {
    console.error("Unable to find the test center!! id mismatch!!");
    return null;
  } else {
    testcenterData.set(updateData);
    const result = await testcenterData.save();
    console.log("Updated testcenter data successfully!", result);
    if (result !== null) return result;
    else return null;
  }
}

module.exports = {
  getHospitalByPincode,
  getHospitalById,
  updateHospitalData,
  getTestcenterData,
  updateTestcenterData,
};
