var express = require('express');
const ToyModel = require('../models/ToyModel')
var router = express.Router();

/* GET users listing. */

router.get('/', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/toy
            res.render('toy/index', { toys: data })
        }
    })
})
router.get('/home', (req, res) => {
    ToyModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/toy
            res.render('toy/home', { toys: data })
        }
    })
})
router.get('/delete/:id', (req, res) => {
    ToyModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete toy succeed !");
            res.redirect("/toy");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("toy/add");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var toy = new toyModel(req.body)
    // toy.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add toy succeed !")
    //         res.redirect("/toy")
    //     }
    // })
    //Cách 2: dùng "create"
    ToyModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add toy succeed !')
            res.redirect("/toy")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    ToyModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/toy)
            //gửi kèm dữ liệu của object toy để load vào form edit
            //toy (tên) , data (dữ liệu)
            res.render("toy/edit", { toy: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var toy = req.body;
    ToyModel.findByIdAndUpdate(id, toy, (err) => {
        if (!err) {
            console.log("Update toy succeed !")
            res.redirect("/toy")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    ToyModel.findById(req.params.id, (err, toy) => {
        if (!err) {
            res.render('toy/info', { toy: toy })
        }
    })
})


module.exports = router;
