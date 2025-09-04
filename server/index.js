const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve i file statici dalla build di React
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// Endpoint API di esempio
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.all('/*splat', (req, res) => {
  res.send('Not Found');
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

