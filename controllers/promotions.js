const Promos = require('../app/models/promos');
const mongoose = require('mongoose');

module.exports = {

	promotions: async (req, res, next) => {
		const data = await Promos.find({});
		res.json(data);
	},

	getPromotions: async (req, res, next) => {
		const {promosId} = req.params;
		const promo = await Promos.findById(promosId);
		res.status(200).json(promo);

	},
};