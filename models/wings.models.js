import mongoose from "mongoose";

const wingsModel = new mongoose.Schema({
  name: String,
  wings: [
    {
      wingName: String,
      wingNumber: String,
      residentialUnits: String,
      commercIalUnits: String,
    },
  ],
  Totalunit: String,
});

export default mongoose.model("wings", wingsModel);
