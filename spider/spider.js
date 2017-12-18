"use strict"
const CronJob = require('cron').CronJob
const Promise = require('es6-promise').Promise

const CONFIG = require('../config')

const articleDAO = require('../database/models/article')
const LatestDAO = require('../database/models/latest')


const zhAPI = require('./api/index-promise')

const DateCalc = require('./util/date')
const dateCalculator = new DateCalc()

const latestDAO = new LatestDAO()


// log
let logger = console
if (!CONFIG.log.openBae) {
    logger = require('log4js').getLogger('cheese')
}

const Spider = {
    fire(start, end) {

    },
    // 每日最新内容
    latest() {
        var dtime = dateCalculator.today(),
            topID = [],
            latestID = []
        articleDAO.delete({ latest: true })
            .then(function () {
                return latestDAO.delete()
            })
            .then(function () {
                return zhAPI.getLatest()
            })
            .then(function (d) {
                var dtime = d.date,
                    stories = d.stories,
                    top = d.top_stories,
                    promiseAll = [];
                for (var i = 0; i < top.length; i++) {
                    topID.push(top[i].id)
                    var data = {
                        id: top[i].id,
                        title: top[i].title,
                        image: top[i].image,
                        top: true,
                        dtime: dtime
                    }
                    var p = latestDAO.save(data)
                    promiseAll.push(p)
                }

                for (var i = 0; i < stories.length; i++) {
                    latestID.push(stories[i].id)
                    var data = {
                        id: stories[i].id,
                        title: stories[i].title,
                        image: stories[i].images ? stories[i].images[0] : '',
                        top: false,
                        dtime: dtime
                    }
                    var p = latestDAO.save(data)
                    promiseAll.push(p)
                }

                return Promise.all(promiseAll)
            })
            .then(function () {
                for (let x = 0; x < topID.length; x++) {
                    Spider.acticle(topID[x], dtime, true)
                }
                for (let m = 0; m < latestID.length; m++) {
                    Spider.article(latestID[m], dtime, true);
                }
            })
            .catch(function(err){
                logger.error('get lastest data error: ', err);
            })
    }
}

module.exports = Spider

