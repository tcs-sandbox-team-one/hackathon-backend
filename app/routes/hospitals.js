const express = require("express");
const router = express.Router();

const dbService = require("../services/dbService");

//Show hospitals with pincode...
router.post("/", async (req, res) => {
  try {
    const pincode = req.body.pincode;
    const hospitalData = await dbService.getHospitalByPincode(pincode);
    if (hospitalData.length !== 0) {
      console.log(
        "Hosp data retrieved successfully from backend",
        hospitalData
      );
      res.status(200).send(hospitalData);
    } else {
      res.status(200).send({
        Error: "Pincode does not match!",
      });
    }
  } catch (err) {
    console.error("Error fetching hospital data...", err);
    res.status(500).send("Error occured in data fetch");
  }
});

//Update hospital data...
router.post("/update", async (req, res) => {
  try {
    const id = req.body.id;
    let updateData = req.body.updateData;
    console.log(req.body);
    const hospital = await dbService.getHospitalById(id);
    console.log("From get by Id...", hospital);
    const genBedAvailability = hospital.no_bedGeneral > 0 ? "Yes" : "No";
    const icuAvailability = hospital.no_IcuAvailable > 0 ? "Yes" : "No";

    console.log("update data...", req.body.updateData);
    updateData.genBedAvailability = genBedAvailability;
    updateData.icuAvailability = icuAvailability;

    const updateHospitalData = await dbService.updateHospitalData(
      id,
      updateData
    );
    if (updateHospitalData !== null)
      res.status(200).send({
        message: "Data updated successfully!!",
        data: updateHospitalData,
      });
    else
      res.status(200).send({
        Error: "Id does not match!",
      });
  } catch (error) {
    console.error(error);
    res.status(200).send({ error: "Unable to update hospital data" });
  }
});

//Book hospital
router.post("/book", async (req, res) => {
  try {
    console.log("Req...", req.body);
    const id = req.body.id;
    const bookingType = req.body.bookingType;
    console.log(req.body);
    let hospital = await dbService.getHospitalById(id);
    console.log("From get by Id...", hospital);
    if (bookingType === "ICU") {
      hospital.no_IcuAvailable--;
    } else {
      hospital.no_bedGeneral--;
    }

    console.log("update data...", req.body.updateData);

    const updateHospitalData = await dbService.updateHospitalData(id, hospital);
    if (updateHospitalData !== null)
      res.status(200).send({
        message: "Booking success!!",
        data: updateHospitalData,
      });
    else
      res.status(200).send({
        Error: "Id does not match!",
      });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Unable to book hospital" });
  }
});

module.exports = router;
