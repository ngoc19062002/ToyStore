var express = require('express');
const CarModel = require('../models/CarModel')
var router = express.Router();

/* GET users listing. */

router.get('/', (req, res) => {
    CarModel.find((err, data) => {
        if (!err) {
            res.render('car/index', {  Cars: data })
        }
    })
})
router.get('/delete/:id', (req, res) => {
    CarModel.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Delete car succeed !");
            res.redirect("/car");
        }
    })
})

//render ra form ADD
router.get('/add', (req, res) => {
    res.render("car/add");
})
//nhận & xử lý dữ liệu từ form ADD
router.post('/add', (req, res) => {
    CarModel.create(req.body, (err) => {
        if (!err) {
            console.log('Add car succeed !')
            res.redirect("/car")
        }
    })
})

router.get('/detail/:id', (req, res) => {
    CarModel.findById(req.params.id, (err, Car) => {
        if (!err) {
            res.render('car/info', { Car: Car })
        }
    })
})


module.exports = router;
