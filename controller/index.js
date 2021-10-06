// Dependencies
const Testing = require('../models/index.js');

module.exports = {
    async testing(req, res, next) {
        const Items = await Testing.find();


        return res.status(200).json({
            message: "You've hit the testing route",
            Items
        })
    },
    async postTesting(req, res, next) {
        const newItem = await new Testing({
            name: req.body.name,
        });
        await newItem.save();
        return res.status(200).json({
            newItem
        })
    }
}
