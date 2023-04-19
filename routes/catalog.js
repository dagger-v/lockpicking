const express = require("express");
const router = express.Router();

// Require controller modules.
const article_controller = require("../controllers/articleController");
const contact_controller = require("../controllers/contactController");

/// article ROUTES ///

// GET catalog home page.
router.get("/", article_controller.index);

// GET catalog search.
router.get("/article/search/:id", article_controller.search);

// GET request for creating a article. NOTE This must come before routes that display article (uses id).
router.get("/article/create", article_controller.article_create_get);

// POST request for creating article.
router.post("/article/create", article_controller.article_create_post);

// GET request to delete article.
router.get("/article/:id/delete", article_controller.article_delete_get);

// POST request to delete article.
router.post("/article/:id/delete", article_controller.article_delete_post);

// GET request to update article.
router.get("/article/:id/update", article_controller.article_update_get);

// POST request to update article.
router.post("/article/:id/update", article_controller.article_update_post);

// GET request for one article.
router.get("/article/:id", article_controller.article_detail);

// GET request for list of all article items.
router.get("/articles", article_controller.article_list);

/// CONTACT ME ROUTE ///

// GET request for list of all article items.
router.get("/contact", contact_controller.contact_list);

module.exports = router;
