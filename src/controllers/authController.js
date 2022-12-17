const User = require("../models/schemas/authModel");

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(409).json({ "message": 'Email in use' });
    }

    try {
        const user = new User({ name, email, password });
        await user.save();
        return res.status(201).json({
            user: {
                name,
                email
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup,
};