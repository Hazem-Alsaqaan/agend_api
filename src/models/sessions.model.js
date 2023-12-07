const mongoose = require("mongoose");

const SessionsSchema = new mongoose.Schema(
  {
    sessionDate: {
      type: String,
      trim: true,
    },
    decision: {
      type: String,
      trim: true,
    },
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cases",
      required: true,
    },
  },
  { timestamps: true }
);

const sessionModel = mongoose.model("sessions", SessionsSchema);
module.exports = sessionModel;
