
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const itemModal = mongoose.model("Item", itemSchema);

module.exports = itemModal;