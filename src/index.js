const express = require("express");
const app = express();

app.get('/', (request, response) => {
  response.send('OI via Express!!!😊');
});

app.listen(3000, () => console.log('✨ Server start ate port 3000 ( http://localhost:3000 )'));
