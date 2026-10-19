
const Article = require('../models/articleModel');
const User = require('../models/userModel');

// 1. Get all articles, including author details
const getAllArticles = async (req, res) => {
  try {
    const filter = {};

    if (req.query.authorId) {
      filter.author = req.query.authorId;
    }

    const articles = await Article.find(filter)
      .populate('author', 'name email');

    res.status(200).json({
      total: articles.length,
      articles
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Create an article linked to an existing user
const createArticle = async (req, res) => {
  try {
    const { title, content, authorId } = req.body;

    if (!title || !content || !authorId) {
      return res.status(400).json({
        message: 'title, content et authorId sont obligatoires'
      });
    }

    const author = await User.findById(authorId);

    if (!author) {
      return res.status(404).json({
        message: 'Auteur introuvable'
      });
    }

    const article = await Article.create({
      title,
      content,
      author: authorId
    });

    await article.populate('author', 'name email');

    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Get one article by ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'name email');

    if (!article) {
      return res.status(404).json({
        message: 'Article introuvable'
      });
    }

    res.status(200).json(article);
  } catch (err) {
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Identifiant de ressource invalide (format ObjectId attendu)'
    });
  }

  res.status(500).json({ message: err.message });
}
};

// 4. Update an article
const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name email');

    if (!article) {
      return res.status(404).json({
        message: 'Article introuvable'
      });
    }

    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 5. Delete an article
const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        message: 'Article introuvable'
      });
    }

    res.status(200).json({
      message: 'Article supprimé avec succès',
      id: article._id
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  getArticleById,
  updateArticle,
  deleteArticle
};
