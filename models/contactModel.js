const mongoose = require ("mongoose");


const contactSchema = mongoose.Schema({
    titre_2: String,
});

const Project_1 = mongoose.model("project_1", contactSchema );

module.exports = Project_1