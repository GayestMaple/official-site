const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const router = new Router();

router
    .get('/', async ctx => {
        ctx.body = 'Here is the private site for internal test!\n' + 'Requested url: ' + ctx.url + '\n' + 'Request time: ' + new Date();  
    })

module.exports = router.routes();