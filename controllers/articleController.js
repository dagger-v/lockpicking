const { body, validationResult } = require("express-validator");

const Article = require("../models/article");

const async = require("async");

exports.index = function (req, res) {
  Article.find({}, "title content createdAt")
    .sort({ createdAt: -1 })
    .limit(1)
    .exec(function (err, recent_article) {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "Home",
        recent_article: recent_article,
      });
    });
};

// Display search results
exports.search = function (req, res, next) {
  const id = req.params.id;
  Article.find({}, "title author category")
    .sort({ title: 1 })
    .exec(function (err, list_articles) {
      if (err) {
        return next(err);
      }
      res.render("search", {
        article_list: list_articles,
        id: id,
      });
      console.log(id);
    });
  console.log(id);
};

// Display list of all articles.
exports.article_list = function (req, res, next) {
  Article.find({}, "title")
    .sort({ title: 1 })
    .exec(function (err, list_articles) {
      if (err) {
        return next(err);
      }
      res.render("article_list", {
        title: "Article List",
        article_list: list_articles,
      });
    });
};

// Display detail page for a specific article.
exports.article_detail = (req, res, next) => {
  async.parallel(
    {
      article(callback) {
        Article.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.article == null) {
        // No results.
        const err = new Error("Article not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("article_detail", {
        article: results.article,
        title: results.article.title,
        author: results.article.author,
      });
    }
  );
};

// Display article create form on GET.
exports.article_create_get = (req, res, next) => {
  async.parallel({}, (err, results) => {
    if (err) {
      return next(err);
    }
    res.render("article_form", {
      title: "Create Article",
      author: req.user,
    });
  });
};

// Handle article create on POST.
exports.article_create_post = [
  // Validate and sanitize fields.
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("author").trim().escape(),
  body("category").trim().escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create an article object with escaped and trimmed data.
    const article = new Article({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      category: req.body.category,
    });

    if (!errors.isEmpty()) {
      // Get all authors and genres for form.
      async.parallel((err, results) => {
        if (err) {
          return next(err);
        }
        res.render("article_form", {
          title: "Create Article",
          author: author.username,
          content: content,
          category: category,
          article,
          errors: errors.array(),
        });
      });
      return;
    }

    // Data from form is valid. Save article.
    article.save((err) => {
      if (err) {
        return next(err);
      }
      // Successful: redirect to new article record.
      res.redirect(article.url);
    });
  },
];

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
