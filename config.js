// 配置文件
const path = require('path');
const app = {
    hostUrl: 'https://www.gayestmaple.com',
    // 数据库
    dbUrl: 'mongodb://localhost:27017/',
    // 静态资源信息
    resUrl: path.join(__dirname, '/public'),
    // 微信开发者接口配置
    wx_token: 'gayestmaple',
    wx_encodingAESKey: 'kVeOZvL9cZdrIkE2tKYzHXeyWOvPsWujr9MpcjIfZDZ'
};

module.exports = app;