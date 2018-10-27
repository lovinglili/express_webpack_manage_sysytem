
var express = require('express');
var fileUpload = require('../middlewares/fileUpload')
var position_controller = require('../controllers/position')

var router = express.Router();

router.get('/list',position_controller.list);
router.post('/save',fileUpload,position_controller.save);
router.post('/remove',position_controller.remove);
router.post('/getone',position_controller.getone);
router.post('/update',fileUpload,position_controller.update);

module.exports=router;