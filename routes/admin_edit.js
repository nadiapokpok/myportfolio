const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/formModel');

//modifir  elts de la bdd
router.get('/:_id', (req, res) => {
    const id = req.params._id;
    Project.findById(id, (err, project) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.render('admin_edit', {project : project});
    });
});

//POST route qui mène vers la page de suppression de l'admin
router.post('/:_id', (req, res) => {
    const id = req.params._id;
    Project.findById(id, (err, project) => {
        if (err) {
            return res.status(500).json(err);
        }
        project.titre = req.body.titre;
        project.description = req.body.description;

        //Nous stockons l'objet en base
        project.save((err) => {
            if (err) {
                res.send(err);
            }
            res.redirect('/admin/list');
        });
    });
});
module.exports = router;
