const { Error } = require("mongoose");
const Article = require("../database/models/article-model");

exports.createArticle = async (req, res, next) => {
  try {
    const body = req.body;

    const article = await Article.create({ ...body });

    return res.status(201).json(article);
  } catch (err) {
    throw err;
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "No Article found." });
    }

    return res.status(200).json(article);
  } catch (err) {
    throw err;
  }
};

exports.getArticles = async (req, res, next) => {
  try {
    const { sort, page, size, ...filters } = req.query;

    const query = {};

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        query[key] = value;
      }
    });

    const totalArticles = await Article.find().countDocuments();
    const articles = await Article.find(query)
      .select("-__v")
      .sort(sort)
      .limit(size)
      .skip((page - 1) * size);

    if (!articles) {
      return res.status(404).json({ message: "No Article found." });
    }

    return res
      .status(200)
      .json({ total: totalArticles, results: articles.length, articles });
  } catch (err) {
    throw err;
  }
};

exports.upadteArticle = async (req, res, next) => {
  try {
    const updatedArticle = await Article.findById(req.params.id);

    if (!updatedArticle) {
      return res.status(404).json({ message: "No Article found." });
    }

    const { title, content } = req.body;

    const article = await Article.findOne(updatedArticle, {
      title,
      content,
    });

    article.save();

    return res.status(200).json(article);
  } catch (err) {
    throw err;
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "No Article found." });
    }

    await Article.findByIdAndDelete(article.id);

    return res.status(204).json(article);
  } catch (err) {
    throw err;
  }
};
