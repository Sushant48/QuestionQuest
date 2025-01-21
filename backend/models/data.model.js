import mongoose,{Schema} from "mongoose";

const dataSchema = new Schema(
  {

    type: {
      type: String,
      required: true,
      index: true,
    },

    siblingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Data",
    },

    title: {
      type: String,
      required: true,
    },

    anagramType: {
      type: String,
      enum: ["WORD", "SENTENCE"],
    },

    blocks: [
      {
        text: { type: String, required: true },
        showInOption: { type: Boolean, default: false },
        isAnswer: { type: Boolean, default: false },
      },
    ],

    solution: {
      type: String,
    },

    options: [
      {
        text: { type: String },
        isCorrectAnswer: { type: Boolean },
      },
    ],
  },

  { timestamps: true }
);

dataSchema.index({ title: "text" });

dataSchema.pre("save", function (next) {
  if (this.type === "ANAGRAM" && (!this.solution || this.blocks.length === 0)) {
    return next(new Error("ANAGRAM type requires 'solution' and 'blocks'."));
  }

  if (this.type === "MCQ" && this.options.length === 0) {
    return next(new Error("MCQ type requires 'options'."));
  }

  next();
});


export const Data =  mongoose.model("Data", dataSchema);
