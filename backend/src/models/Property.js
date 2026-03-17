import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
      min: 0,
    },
    area: {
      type: Number,
      required: [true, "Area is required"],
      min: 0,
    },
    propertyType: {
      type: String,
      enum: [
        "house",
        "apartment",
        "condo",
        "villa",
        "townhouse",
        "land",
        "commercial",
      ],
      required: [true, "Property type is required"],
    },
    purpose: {
      type: String,
      enum: ["sale", "rent"],
      default: "sale",
    },
    status: {
      type: String,
      enum: ["available", "pending", "sold"],
      default: "available",
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    address: {
      type: String,
    },
    features: [
      {
        type: String,
      },
    ],
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

propertySchema.virtual("id").get(function () {
  return this._id.toString();
});

propertySchema.index({
  title: "text",
  description: "text",
  city: "text",
});

const Property = mongoose.model("Property", propertySchema);

export default Property;
