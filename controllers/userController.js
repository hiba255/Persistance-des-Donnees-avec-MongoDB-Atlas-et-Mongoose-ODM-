
const User = require('../models/userModel');

// 1. Create a user
const createUser = async (req, res) => {
  try {
    const { name, email, age, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Le nom et l’email sont requis'
      });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({
        message: 'Cet email est déjà utilisé'
      });
    }

    const user = await User.create({
      name,
      email,
      age,
      role
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 2. Get all users, optionally filtered by role
const getUsers = async (req, res) => {
  try {
    const filter = {};

    if (req.query.role) {
      filter.role = req.query.role;
    }

    const users = await User.find(filter);

    res.status(200).json({
      total: users.length,
      users
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 3. Get one user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json(user);
  } catch (err) {
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: 'Identifiant de ressource invalide (format ObjectId attendu)'
    });
  }

  res.status(500).json({ message: err.message });
}
};

// 4. Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: 'Utilisateur non trouvé'
      });
    }

    res.status(200).json({
      message: 'Utilisateur supprimé avec succès'
    });
  } catch (err) {
    res.status(400).json({
      message: 'Identifiant utilisateur invalide'
    });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUser
};
