const { getUserProductsByDate, createUserProduct } = require('../models/usersProducts');

const getUserProductsByDateController = async (req, res, next) => {
    const date = req.params.date;
    const userId = '1'; // TODO: заменить на user_id из реквеста
    const usersProducts = await getUserProductsByDate(userId, date);

    if (!usersProducts.length) {
        return res.status(400).json({ message: 'No data' });
    }

    res.status(200).json(usersProducts);
};

const createUserProductController = async (req, res) => {
    const date = req.params.date;
    const userId = '1'; // TODO: заменить на user_id из реквеста
    // const { _id: userId } = req.user;

    const createdUserProduct = await createUserProduct(userId, date, req.body);

    if (!createdUserProduct) {
        return res.status(404).json({ message: 'Not found' });
    }

    res.status(201).json(createdUserProduct);
};

module.exports = {
    getUserProductsByDateController,
    createUserProductController,
};
