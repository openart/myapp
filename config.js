module.exports = {
    auth: '',
    mongo: {
        name: 'zhihu',
        host: '39.108.85.243',
        port: 27017,
        username: 'username',
        password: 'password',
        url: function() {
            return ['mongodb://',
                this.username, ':',
                this.password, '@',
                this.host, ':', this.port, '/', this.name].join('');
        },
        options:{
            useMongoClient:true
        }
    },
    mongoOptions: {
        server: {
            poolSize: 1,
            socketOptions: {
                auto_reconnect: true
            }
        }
    },
    log: {
        isOpenningHTTP: true,
        isOpenningNode: true,
        openBae: false
    },
    mail: {
        user: '**@gmail.com',
        pass: ''
    },
    spider: {
        fire: false,
        openTask: true,
        start: '20151231',
        end: '20151001',
        interval: 10
    }
}