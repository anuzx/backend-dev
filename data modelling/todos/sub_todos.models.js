import mongoose from "mongoose";

const subtodoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const SubTodos = mongoose.model("SubTodos", subtodoSchema);
