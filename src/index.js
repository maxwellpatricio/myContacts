const express = require('express');
const routes = require('./routes');

const app = express();

app.use((request, response) => {
  request.appId = 'Meu App ID';
  response.send('Middleware')
})

app.use(routes);

app.listen(3000, () => console.log('✨ Server start ate port 3000 ( http://localhost:3000 )'));
