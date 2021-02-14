const net = require('net');
const server = net.createServer();
const fs = require('fs');
const { connect } = require('http2');

const PORT = 8000;

server.on('connection', (client) => {
  console.log('New client connected!');
  // client.write('Hello, please enter the file you would like to download:');

  client.setEncoding('utf8'); // interpret data as text
  
  client.on('data', (fileName) => {
    console.log(`Fetching ${fileName} ....`);
    const readStream = fs.createReadStream(`./files/${fileName}`);
    const writeStream = fs.createWriteStream(`./downloads/${fileName}`);

    readStream.on('data', (data)=>{

      console.log(`Reading file ...`);
      
      writeStream.write(data, (err)=>{
        if (err) {
          return console.log('Error writing the file');
        }
        client.write(`Downloading ....`);
      });
    });

    readStream.on('error', (err)=> {
      console.log('Error reading the file');
      client.write(`Could not find ${fileName}`);
    });


    readStream.on('end',()=>{
      client.write('Data downloaded!');
      console.log(`${fileName} sent to client!`);
    });
  });

});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});


