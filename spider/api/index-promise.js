"use strict";

const Promise=require('es6-promise').Promise;
const request=require('request');
const config=require('../../config');

const API={
    'startPic'  : 'http://news-at.zhihu.com/api/4/start-image/720*1184',
    'latest'    : 'http://news-at.zhihu.com/api/4/news/latest',
    'article'   : 'http://news-at.zhihu.com/api/4/news/',
    'history'   : 'http://news.at.zhihu.com/api/4/news/before/',
}


module.exports={
    getStartPic(){
        var url=API.startPic;
        return new Promise(function(resolve,reject){
            request(url,function(err,reponse,body){
                var pic=null;
                if(!err){
                    var latest=JSON.parse(body);
                    resolve(latest);
                }else{
                    return reject(err);
                }
            })
        })
    },
    // 最新内容
    getLatest(){
        var url=API.latest;
        return new Promise(function(resolve,reject){
            request({
                method:'GET',
                uri:url,
                headers: {'Authorization': config.auth }
            },function(err,reponse,body){
                if(!err){
                    var latest=JSON.parse(body);
                    resolve(latest);
                }else{
                    return reject(err);
                }
            })
        })
    },
}