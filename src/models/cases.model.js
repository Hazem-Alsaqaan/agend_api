const mongoose = require("mongoose");

const CaseSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      trim: true,
    },
    theYear: {
      type: String,
      trim: true,
    },
    plaintiff: {
      type: String,
      trim: true,
    },
    defendant: {
      type: String,
      trim: true,
    },
    typeCase: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
CaseSchema.virtual("sessions", {
  ref: "sessions",
  foreignField: "caseId",
  localField: "_id",
});

const caseModel = mongoose.model("cases", CaseSchema);
module.exports = caseModel;
