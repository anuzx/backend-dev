import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  // no need to store all the details of product , just store its id (which will be generated my mongoDB automatically)
  productId: {
    //type will be a ref
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    //what all we want when someone will place order

    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: {
      //we know type should be an array becuz one order can have mutiple category of orders and it will contain their quantity too so,
      //we will create a mini schema for this array
      type: [orderItemSchema],
    },
    address: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        //we fixed 3 options 
      enum: ["PENDING", "CANCELLED", "DELIVERED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
