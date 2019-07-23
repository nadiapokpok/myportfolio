const express = require("express");
const router = express.Router();
const Project = require('../models/formModel');
const Project_1 = require('../models/contactModel');

//GET
router.get('/', (req, res) => {
    Project.find((err, project) => {
            if (err) {
                res.send(err);
            }
            res.render('index', { project: project});
        })

    });

//POST
router.post('/creer-post', (req, res) => {
    const project_1 = new Project_1(req.body);
    project_1.save(err => {
        if (err) {
            res.send(err);
        }
        res.redirect('/');
    })
});




module.exports = router;