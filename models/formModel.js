const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
    titre: String,
    description: String,
    image: String
});

const Project = mongoose.model("project", formSchema);

module.exports = Project;

