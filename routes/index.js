var express = require('express');
var router = express.Router();

var home = require('./../controller/home');

router.get('/', home.index);

// 每日的latest数据
router.get('/latest', home.getLatest);

// 按日期查询
// router.get('/day/:day', home.searchDate);

module.exports = router;
