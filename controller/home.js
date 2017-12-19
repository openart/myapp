var LatestDAO = require('../database/models/latest');
var latestDAO = new LatestDAO();

var Home = {
    index: function (req, res) {
        res.render('index')
    },
    // 获取最新内容
    getLatest: function (req, res) {
        latestDAO.all().then(function (result) {
            res.json(result)
        })
    },
}

module.exports = Home