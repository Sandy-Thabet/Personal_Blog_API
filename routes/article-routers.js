const express = require("express");
const articleController = require("../controllers/article-controller");

const articleRouter = express.Router();

// create article
articleRouter.post("/", articleController.createArticle);

// read article
articleRouter.get("/:id", articleController.getArticle);

// read articles
articleRouter.get("/", articleController.getArticles);

// update articles
articleRouter.patch("/:id", articleController.upadteArticle);

// delete article
articleRouter.delete("/:id", articleController.deleteArticle);

module.exports = articleRouter;
