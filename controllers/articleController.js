const Article = require("../models/article");

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

// Display list of all articles.
exports.article_list = function (req, res, next) {
  res.render("article_list");
};

// Display detail page for a specific article.
exports.article_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: article detail: ${req.params.id}`);
};

// Display article create form on GET.
exports.article_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: article create GET");
};

// Handle article create on POST.
exports.article_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: article create POST");
};

// Display article delete form on GET.
exports.article_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: article delete GET");
};

// Handle article delete on POST.
exports.article_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: article delete POST");
};

// Display article update form on GET.
exports.article_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: article update GET");
};

// Handle article update on POST.
exports.article_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: article update POST");
};
