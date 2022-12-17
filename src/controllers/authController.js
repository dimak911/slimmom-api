const User = require("../models/schemas/authModel");

const { customError } = require("../helpers/errors");

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw customError({ status: 409, message: "Email in use" });
    }

    try {
        const user = new User({ name, email, password });
        await user.save();
        return res.status(201).json({
            user: {
                name,
                email,
                userId: user._id,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signup,
};