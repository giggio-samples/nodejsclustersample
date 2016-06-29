const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const Koa = require('koa');
const convert = require('koa-convert');
const demorado = require('./demorado');

function createServer(clusterId) {
  const app = new Koa();
  app.use(function (ctx) {
    return demorado().then(valor => {
      ctx.body = `Boa noite, iMasters! (CLUSTER ${clusterId})`;
    });
  });
  app.listen(process.env.PORT);
}

if (process.argv.indexOf('--cluster') >= 0) {
  if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
      console.log(`Iniciando worker para o processador ${i}...`);
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.id} morreu! :(`);
      cluster.fork();
    });
  } else {
    console.log(`Iniciando worker ${cluster.worker.id}...`);
    createServer(cluster.worker.id);
  }
} else {
  console.log(`Iniciando worker...`);
  createServer(-1);
}
