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
router.post('/:id/:isBookmarked/:originPrice', function (req, res) {
    console.log('are you getting called? ' + req.params.id)
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
                product_id: req.params.id,
                origin_price: req.params.originPrice
            }).then(function (data) {
                res.send(data)
            })
        }
        })
})

//Search & Add updated price
router.post('/test/admin/:id/:updatedPrice', function (req, res) {
    Bookmarks.findAll({
        where: { product_id: req.params.id }
    }).then(data => {
        console.log(data[0])
        data[0].update({
            updated_price: req.params.updatedPrice
        }).then(result => {
            res.send(result)
        })
    })
})

//test
router.get("/1", function(req, res) {
  Bookmarks.findById('1').then(data => {
      console.log(data)
        // data.update({
        // price: req.params.priceVal
        // })
    //   .then(result => {
    //     res.send(result);
    //   });
  });
});

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
