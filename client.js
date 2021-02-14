const net = require('net');
const readline = require('readline');
const fs = require('fs');
let fileName = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({
  host: 'localhost',
  port: 8000
});

conn.setEncoding('utf8'); // interpret data as text

conn.on('connect', () => {
  console.log('Connected to server!');
  rl.question('Type the file you would like to retrieve ', (answer) => {
    conn.write(answer);
    fileName = answer;
    rl.close();
  });
});

conn.on('data', (data) => {
  console.log(`${data}`);
});

conn.on('end',()=>{
  conn.write('Server disconnected!');
});