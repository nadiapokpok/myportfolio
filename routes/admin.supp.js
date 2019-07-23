const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/formModel');

//deleter  elts de la bdd
router.get('/', (req, res) => {
    res.render('admin.supp.ejs');
});
//POST route qui mène vers la page de suppression de l'admin
router.post('/delete/:_id', (req, res) => {
    const id = req.params._id;
    Project.findByIdAndDelete(id, (err, project) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.redirect('/admin/list');
    });
});
module.exports = router;
