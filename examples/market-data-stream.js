import { Client, Contract } from '../index.js';



async function run() {
  let api = new Client();

  await api.connect({
    host: '127.0.0.1',
    port: 4001,
    /*
    log_info: console.log,
    log_debug: console.log,
    log_debug_bytes: console.log*/
  })

  //let contract = Contract.stock('AAPL');
  let contract = Contract.forex('EURUSD');

  let e = api.streamMarketData({
    contract: contract
  });

  e.on('tick', (t) => {
    console.log(t.ticker);
  });
  console.log('attaching');
  e.on('error', (t) => {
    console.log('error');
    console.log(t);
  });

  setTimeout(() => {
    e.stop();
    console.log('shut down streaming');
  }, 10000);
}



run()
  .catch((e) => {
    console.log('failure');
    console.log(e);
    process.exit();
  });