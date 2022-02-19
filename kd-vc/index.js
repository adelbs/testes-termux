const termux = require('./termux');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function run() {
  console.log('ouvindo mensagens...');
  while (true) {
    await sleep(5000);
      let smsList = await termux.lerNovosSms();
      smsList.forEach(async (sms) => {
        if (sms.body == 'kd-vc') {
          console.log('Pedido de localizacao recebido...')
          const localizacao = await termux.localizacao();
          await termux.enviarSms('11964530032', `Estou aqui: ${localizacao}`);
          console.log('Mensagem de localizacao enviada!');
        }
      });
  }
}

// termux.localizacao().then(out => console.log(out)).catch(err => console.log(err));
run();