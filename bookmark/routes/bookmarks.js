var express = require('express');
var router = express.Router();
var request = require('request-promise');
var sequelize = require('sequelize');

const Op = sequelize.Op

var Bookmarks = require('../models/index').bookmark;
var Users = require('../models/index').user;
var Products = require('../models/index').product;


//For Admin Page
//GET all Products
router.get('/:id', function (req, res) {
    Bookmarks.findAll({
        where: {
            user_id: req.params.id
        }
    })
        .then(data => {
            console.log(data)
            res.send(data);
        })
})

//Search & Add Products
router.post('/:id/:isBookmarked', function (req, res) {
    Bookmarks.findAll({
        where: {
            user_id: 1,
            product_id: req.params.id
        }
    }).then(result => {
        var isTrueSet = (req.params.isBookmarked == 'true');
        if(result[0]) {
            result[0].destroy()
            .then(data => {
                res.send(data)
            })
        }
        else {
            Bookmarks.create({
                isBookmarked: true,
                user_id: 1,
                product_id: req.params.id
            }).then(function (data) {
                res.send(data)
            })
        }
        })
})


//For User Page
//GET Data by Search Keyword
router.get('/:name', function (req, res) {
    console.log(req.params);
    Products.findAll({
        where: {
            name: { [Op.iLike]: `%${req.params.name}%` }
        }
    })

})


module.exports = router;
