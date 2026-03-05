const User = require("../models/User");

// GET /api/users
// GET /api/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("username createdAt") 
      .sort({ username: 1 });

    res.status(200).json(users);

  } catch (err) {
    console.error("Get users error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// GET /api/users/me/saved
exports.getSavedUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "savedUsers",
      "username email createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.savedUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// POST /api/users/:id/save
exports.saveUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;

    if (targetUserId === req.user._id.toString()) {
      return res.status(400).json({ message: "You cannot save yourself" });
    }

    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUser = await User.findById(req.user._id);

    if (currentUser.savedUsers.includes(targetUserId)) {
      return res.status(400).json({ message: "User already saved" });
    }

    currentUser.savedUsers.push(targetUserId);
    await currentUser.save();

    res.json({
      message: "User saved successfully",
      savedUsers: currentUser.savedUsers
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE /api/users/:id/save
exports.removeSavedUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);

    currentUser.savedUsers = currentUser.savedUsers.filter(
      (id) => id.toString() !== req.params.id
    );

    await currentUser.save();

    res.json({
      message: "User removed successfully",
      savedUsers: currentUser.savedUsers
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET /api/users/:id
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "username createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
