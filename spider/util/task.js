"use strict"

const CronJob = require('cron').CronJob
const CONFIG = require('../../config')
const zhAPI = require('../api/index-promise')

const Spider = require('../spider')
const DateCalc = require('./date')

// ============== BAE node-log ==============
let logger = console
if (!CONFIG.log.openBae) {
    let logger = require('log4js').getLogger('cheese')
}

const d = new DateCalc()

const Task = {
    fire: function () {
        this.daily()
    },
    // 00:00 - 23:00 每1个小时爬取一次lastest
    hourly:function(){
        new CronJob('00 00 0-23/1 * * *',function(){
            Spider.latest()
        },function(){
            logger.info('hourly cron-job over')

        },true,'Asia/Shanghai')
    }
}

module.export = Task