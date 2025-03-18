import wingsModel from "../models/wings.models.js";

export const createNew = async (req, res) => {
  try {
    const { data } = req.body;

    const findWing = await wingsModel.findOne({ name: data.name });
    if (findWing?.name) {
      await wingsModel.findOneAndUpdate(
        {
          name: data.name,
        },
        {
          $set: { Totalunit: data.Totalunit },
          $push: {
            wings: {
              wingName: data.wingName,
              wingNumber: data.wingNumber,
              residentialUnits: data.residentialUnits,
              commercIalUnits: data.commercIalUnits,
            },
          },
        }
      );
    } else {
      await wingsModel.create({
        name: data.name,
        wings: [
          {
            wingName: data.wingName,
            wingNumber: data.wingNumber,
            residentialUnits: data.residentialUnits,
            commercIalUnits: data.commercIalUnits,
          },
        ],
        Totalunit: data.Totalunit,
      });
    }

    return res.status(201).json({ message: "Data added successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

export const getWings = async (req, res) => {
  try {
    const wings = await wingsModel.find();
    return res.status(200).json(wings);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

export const updateWingUnits = async (req, res) => {
  try {
    const { name, wingName, residentialUnits, commercialUnits } = req.body;

    const findWing = await wingsModel.findOne({ name });

    if (!findWing) {
      return res.status(404).json({ message: "Wing not found" });
    }

    const updatedWing = await wingsModel.findOneAndUpdate(
      { name, "wings.wingName": wingName },
      {
        $set: {
          "wings.$.residentialUnits": residentialUnits,
          "wings.$.commercIalUnits": commercialUnits,
        },
      },
      { new: true }
    );

    if (!updatedWing) {
      return res
        .status(404)
        .json({ message: "Wing not found or no changes made" });
    }

    return res
      .status(200)
      .json({ message: "Units updated successfully", updatedWing });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};
