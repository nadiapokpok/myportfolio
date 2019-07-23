const express = require("express");
const router = express.Router();
const multer = require('multer');
const Database = require('../models/database');
const Project = require('../models/formModel');
const db = new Database();

//config multer

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/image')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});

let upload = multer({ storage: storage });

router.post('/index', /*ensureAuthenticated*/ upload.single('image'), (req, res) => {
    // Nous utilisons le model addProject
    let project = new Project(req.body);
    project.image = req.file.filename;   
    //Nous stockons l'objet en base
    project.save((err) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/index');
    })
});

router.get('/list', (req, res) => {
    Project.find((err, projects) => {
       
        res.render('admin_list', {projects:projects});
    })
  

});



//GET
router.get('/', (req, res) => {
    res.render('admin.ejs');
});





module.exports = router;