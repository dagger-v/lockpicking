const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Virtual for book's URL
ArticleSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/article/${this._id}`;
});

// Export model
module.exports = mongoose.model("Article", ArticleSchema);
