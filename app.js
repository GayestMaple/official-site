const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const http = require('http');
const https = require('https');
const cors = require('koa2-cors');
const Router = require('koa-router');
const koaBody = require('koa-body');
const static = require('koa-static');
// ssl认证
const sslify = require('koa-sslify').default;
// 导入MongoDB的_id换算工具
const ObjectId = require('mongodb').ObjectId;
// 导入sha1函数
const sha1 = require('js-sha1');
// 导入全局配置
const Config = require('./config');
// 导入子路由模块
const test = require('./routes/test');

const app = new Koa();
const router = new Router();

// 配置服务
app
    // 允许跨域访问
    .use(sslify())
    .use(cors())
    .use(koaBody({
        multipart: true,
        formidable: {
            // 设置上传文件大小最大限制，默认2M
            maxFieldsSize: 200*1024*1024,
            // 保持文件的后缀
            keepExtensions: true,
        }
    }));

// 配置路由
router
    .get('/', async ctx => {
        ctx.type = 'html';
        ctx.body = fs.readFileSync('./public/index.html');
    })
    .use('/test', test);

// 应用路由
app
    .use(router.routes())
    .use(router.allowedMethods())
    // 配置静态资源服务中间件
    .use(static(path.join( __dirname, './public')));

// 启动服务
// app.listen(3000);

// 证书配置
const options = {
    key: fs.readFileSync('./ssl/2_www.gayestmaple.com.key'),  //ssl文件路径
    cert: fs.readFileSync('./ssl/1_www.gayestmaple.com_bundle.crt')  //ssl文件路径
};
// 启动https
http.createServer(app.callback()).listen(80);
https.createServer(options, app.callback()).listen(443);
