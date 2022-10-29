var express = require('express');
const LegoModel = require('../models/LegoModel')
var router = express.Router();

/* GET users listing. */

router.get('/', (req, res) => {
    LegoModel.find((err, data) => {
        if (!err) {
            //res.send(data)
            //render ra trang index ở thư mục views/Lego
            res.render('lego/index', { Legos: data })
        }
    })
})
router.get('/delete/:id', (req, res) => {
    LegoModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete Lego succeed !");
            res.redirect("/lego");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("lego/add");
})

//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    //Cách 1: dùng "save"
    // var Lego = new LegoModel(req.body)
    // Lego.save((err) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Add Lego succeed !")
    //         res.redirect("/Lego")
    //     }
    // })
    //Cách 2: dùng "create"
    LegoModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add Lego succeed !')
            res.redirect("/lego")
        }
    })
})

//render ra form EDIT
router.get('/edit/:id', (req, res) => {
    LegoModel.findById(req.params.id, (err, data) => {
        if (!err) {
            //render ra file: update.hbs (trong thư mục views/Lego)
            //gửi kèm dữ liệu của object Lego để load vào form edit
            //Lego (tên) , data (dữ liệu)
            res.render("lego/edit", { Lego: data })
        }
    })
})

//nhận & xử lý dữ liệu từ form EDIT
router.post('/edit/:id', (req, res) => {
    var id = req.params.id;
    var Lego = req.body;
    LegoModel.findByIdAndUpdate(id, Lego, (err) => {
        if (!err) {
            console.log("Update Lego succeed !")
            res.redirect("/lego")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    LegoModel.findById(req.params.id, (err, Lego) => {
        if (!err) {
            res.render('lego/info', { Lego: Lego })
        }
    })
})


module.exports = router;
