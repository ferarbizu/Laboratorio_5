var express = require('express');
var router = express.Router();

var cells = {"cells":[
  {id: 0,name:"One plus",screen:"6",memo:"64",bat:"4000",ram:"9",img:"https://icdn5.digitaltrends.com/image/oneplus-5t-full-review-back-full-720x720.jpg"},
  {id: 1,name:"Nokia 8",screen:"6",memo:"512",bat:"5000",ram:"8",img:"https://cdn3.cnet.com/img/TbRm3LEzI-KqktWvmsgPyGasOug=/830x467/2017/08/15/aaedd5f1-1ddf-4a0d-ba48-1ff404b559be/nokia-8-flagship-product-photos-hero-5.jpg"},
  {id: 2,name:"Iphone X",screen:"5.8",memo:"512",bat:"4000",ram:"2",img:"https://cnet4.cbsistatic.com/img/knVcFvL9RVPKDKE9kJqJy5L0gQM=/830x467/2017/10/31/312b3b6e-59b7-499a-aea4-9bc5f9721a21/iphone-x-54.jpg"},
  {id: 3,name:"Samsung S9",screen:"6",memo:"1TB",bat:"4000",ram:"2",img:"https://c.slashgear.com/wp-content/uploads/2018/03/samsung-galaxy-s9-85-1-980x620.jpg"},
  {id: 4,name:"Huawei P20",screen:"6",memo:"64GB",bat:"2800",ram:"8",img:"https://cdn4.cnet.com/img/hKCxWICAyeSBGOryQrcpRTl6JSQ=/830x467/2018/03/23/c44fa164-d20c-4640-a609-e8ebe7e22b3a/huawei-p20-pro-hero-promo-4.jpg"}]
};

router.get('/', function(req, res, next) {
  res.send(cells);
});

router.get('/V1/Cell/', function(req, res, next) {
  res.send(cells);
});

router.get('/V1/Cell/:id', function(req, res, next) {
  var id = req.params.id;
  const cell = cells.cells.find(c => c.id == id);
  if(!cell) res.status(404).send('No id found');
  res.status(200).send(cell);
});

router.post('/V1/Cell/', function(req, res, next) {
  const cell = {
    id: cells.cells.length + 1
    ,name:req.body.name
    ,screen:req.body.screen
    ,memo:req.body.memo
    ,bat:req.body.bat
    ,ram:req.body.ram
    ,img:req.body.img
  }
    cells.cells.push(cell);
    res.status(201).send(cell);
});

router.delete('/V1/Cell/:id', function(req, res, next) {
  var id = req.params.id;
  const cell = cells.cells.find(c => c.id == id);
  if(!cell) res.status(404).send('No id found');
  const index = cells.cells.indexOf(cell);
  cells.cells.splice(index,1);
  res.status(204).send(cell);
});

module.exports = router;
