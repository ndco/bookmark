var express = require('express');
var router = express.Router();
var request = require('request-promise');
var sequelize = require('sequelize');

const Op = sequelize.Op

const { token } = require('../apikey');
var Products = require('../models/index').product;

var authOptions = {
    url: 'https://api.priceapi.com/jobs',
    method: 'GET',
    form: {
        token: token,
        source: 'google-shopping',
        country: 'us',
        currentness: 'daily_updated',
        completeness: 'one_page',
        key: 'keyword',
        values: 'iphone x'
    },
    json: true
};


function getStatus(job_id) {
    request(`https://api.priceapi.com/jobs/${job_id}?token=${token}`).then(function (data) {
        if (data.status === 'finished') {
            return data.job_id
        }
    })
}


function getData(job_id) {
    request(`https://api.priceapi.com/products/bulk/${job_id}?token=${token}`).then(function (data) {
        return JSON.parse(data)
    }).then(function (result) {
        let newResult = [];
        let product = result.products[0].offers
        const { job_id, products: [{ source, image_url }] } = result;
        product.forEach(element => {
            let result = normalizeData(element);
            let obj = {
                job_id,
                image_url,
                ...result
            };
            newResult.push(obj)
        });
        return newResult
    }).then(function (data) {
        data.forEach(element => {
            Products.create(element);
        })
    })
}

function normalizeData(result) {
    const {
        name,
        shop_name,
        url: shop_url,
        price
    } = result;
    return {
        name,
        shop_name,
        shop_url,
        price
    };
};



//For Admin Page
//GET all Products
router.get('/admin/all', function (req, res) {
    Products.findAll()
        .then(data => {
            res.send(data);
        })
})

//Update Price
router.get('/admin/:productId/:priceVal', function (req, res) {

    Products.findById(req.params.productId)
        .then(data => {
            data.update({
                price: req.params.priceVal
            })
        }).then(result => {
            res.send(result)
        })
})

//Search & Add Products
router.get('/:name/:source', function (req, res) {
    return request({
        url: 'https://api.priceapi.com/jobs',
        method: 'POST',
        form: {
            token: token,
            source: req.params.source,
            country: 'us',
            currentness: 'daily_updated',
            completeness: 'one_page',
            key: 'keyword',
            values: req.params.name
        },
        json: true
    }).then(data => {
        return data.job_id;
    }).then(job_id => {
        const statusInterval = setInterval(function () {
            request(`https://api.priceapi.com/jobs/${job_id}?token=${token}`).then(function (data) {
                return JSON.parse(data);
            }).then(function (result) {
                console.log('validating...')
                if (result.status === 'finished') {
                    console.log('success')
                    clearInterval(statusInterval);
                    return result.job_id
                } 
                else {
                    console.log('failed... trying again') 
                    //return result .then catch error
                                   
                }
            })
                .then(job_result => {
                    getData(job_result)
                })
                .then(final_result => {
                    Products.findAll()
                    .then(result => {
                        //read the error and then run 
                        res.send(result)
                    })
                })
        }, 2000)
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
        .then(data => {
            res.send(data);
        })
})


module.exports = router;
