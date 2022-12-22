const User = require('../models/schemas/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { customError } = require('../helpers/errors');

const signup = async (req, res, next) => {
    const { name, email, password, data = null, callorie = null } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        throw customError({ status: 409, message: 'Email in use' });
    }

    try {
        const user = new User({ name, email, password, data, callorie });
        await user.save();

        const payload = {
            id: user.id,
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY);

        await User.findByIdAndUpdate(user.id, { token });

        return res.status(201).json({
            token,
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

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw customError({ status: 401, message: 'Email or password is wrong' });
    }

    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
        throw customError({ status: 401, message: 'Email or password is wrong' });
    }

    const payload = {
        id: user.id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);
    await User.findByIdAndUpdate(user.id, { token });
    res.status(200).json({
        token,
        user: { email: user.email, name: user.name },
    });
};

const logout = async (req, res, next) => {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { token: null });
    res.status(204).json();
};

const currentUser = async (req, res, next) => {
    const { user } = req;
    const currentUser = await User.findOne({ token: user.token });

    return res.status(200).json({
        user: {
            name: currentUser.name,
            email: currentUser.email,
        },
    });
};

module.exports = {
    login,
    logout,
    signup,
    currentUser,
};
