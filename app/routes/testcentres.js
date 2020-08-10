const express = require("express");
const router = express.Router();

const dbService = require("../services/dbService");

//get test centers by id...
router.post("/", async (req, res) => {
  try {
    const pincode = req.body.pincode;
    const testcentreData = await dbService.getTestcenterData(pincode);
    if (testcentreData.length !== 0) {
      console.log(
        "Test centre data retrieved successfully from backend",
        testcentreData
      );
      res.status(200).send(testcentreData);
    } else {
      res.status(200).send({
        Error: "Pincode does not match!",
      });
    }
  } catch (err) {
    console.error("Error fetching test centre data...", err);
    res.status(500).send("Error occured in data fetch");
  }
});

//Update test center data...
router.post("/update", async (req, res) => {
  try {
    const id = req.body.id;
    const updateData = req.body.updateData;

    const updateTestcenterData = await dbService.updateTestcenterData(
      id,
      updateData
    );
    if (updateTestcenterData !== null)
      res.status(200).send({
        message: "Data updated successfully!!",
        data: updateTestcenterData,
      });
    else
      res.status(200).send({
        Error: "Id does not match!",
      });
  } catch (error) {
    console.error(error);
    res.status(200).send({ error: "Unable to update test center data" });
  }
});

module.exports = router;
