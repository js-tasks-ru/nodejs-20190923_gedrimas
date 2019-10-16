 
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

let clients = [];

router.get('/subscribe', async (ctx, next) => {
  const promise = new Promise((resolve, reject) => {
    clients.push(resolve);
  });
  const message = await promise;
  ctx.response.body = message;
});

router.post('/publish', async (ctx, next) => {
  if (!ctx.request.body.message) return;
  clients.forEach((resolve) => resolve(ctx.request.body.message));
  ctx.response.status = 200;
  clients = [];
});

app.use(router.routes());

module.exports = app;