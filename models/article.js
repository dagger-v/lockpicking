const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ["Lock", "Key", "Security"],
  },
});

// Virtual for book's URL
ArticleSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/article/${this._id}`;
});

// Export model
module.exports = mongoose.model("Article", ArticleSchema);
