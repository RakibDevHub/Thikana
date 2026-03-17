import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    company: {
      name: { type: String, default: "Thikana Real Estate" },
      email: { type: String, default: "info@thikana.com" },
      phone: { type: String, default: "+880 1712 345678" },
      phone2: { type: String, default: "" },
      address: { type: String, default: "123 Gulshan Avenue, Dhaka 1212" },
      logo: { type: String, default: null },
      currency: { type: String, default: "BDT" },
      currencySymbol: { type: String, default: "৳" },
      itemsPerPage: { type: Number, default: 12 },
      socialMedia: {
        facebook: { type: String, default: "" },
        twitter: { type: String, default: "" },
        instagram: { type: String, default: "" },
        linkedin: { type: String, default: "" },
      },
    },
    businessHours: [
      {
        id: Number,
        day: String,
        hours: String,
      },
    ],
    offices: [
      {
        id: Number,
        city: String,
        address: String,
        phone: String,
        email: String,
        hours: String,
        image: { type: String, default: null },
        isHeadquarters: { type: Boolean, default: false },
        location: {
          lat: Number,
          lng: Number,
        },
      },
    ],
    team: [
      {
        id: Number,
        name: String,
        role: String,
        bio: String,
        image: { type: String, default: null },
      },
    ],
    faq: [
      {
        id: Number,
        question: String,
        answer: String,
      },
    ],
    statistics: [
      {
        id: Number,
        label: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for id
settingsSchema.virtual("id").get(function () {
  return this._id.toString();
});

settingsSchema.statics.getSettings = async function () {
  const settings = await this.findOne();
  return settings; // Return null if not found
};

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
