const { exec } = require('child_process');
const fs = require('fs');

const ARQUIVO_SMS_LIDOS = 'smsLidos.json';

async function rodarComando(comando) {
  return new Promise((res, rej) => {
    exec(comando, (err, out, errOut) => {
      if (err || errOut) {
        console.error(err, errOut);
        rej(err);
      }
      else res(out);
    });
  });
}

async function lerNovosSms() {

    const smsLidos = fs.existsSync(ARQUIVO_SMS_LIDOS)
          ? JSON.parse(fs.readFileSync(ARQUIVO_SMS_LIDOS).toString())
          : {};
    
    const out = await rodarComando('termux-sms-list -t inbox');
    const smsList = JSON.parse(out);
    const resultado = [];
        
    smsList.forEach(sms => {
      if (!smsLidos[sms._id]) {
        smsLidos[sms._id] = true;
        resultado.push(sms);
      }
    });
        
    fs.writeFileSync(ARQUIVO_SMS_LIDOS, JSON.stringify(smsLidos));
    return resultado;
}

async function enviarSms(numero, texto) {
    await rodarComando(`termux-sms-send -n ${numero} "${texto}"`);
}

async function localizacao() {
  const out = await rodarComando('termux-location');
  const local = JSON.parse(out);
  
  return `http://www.google.com/maps/place/${local.latitude},${local.longitude}`;
}

module.exports = { lerNovosSms, enviarSms, localizacao };