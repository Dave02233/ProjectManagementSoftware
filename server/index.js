const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static(path.resolve(__dirname, '../client/dist')));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});


function randomChances (num) {
    const index = Math.floor(Math.random() * num);

    return {
        index: index
    };
}

const statuses = ['Completato', 'In Corso', 'In Attesa', 'Annullato'];

// Genera un array di date
const days = [];
const initialDate = new Date(`2025-08-${randomChances(10).index + 1}`);
const numberOfDays = (new Date() - initialDate) / (1000 * 60 * 60 * 24);

for (let i = 0; i < numberOfDays; i++) {
    const actDay = i * 1000 * 60 * 60 * 24;
    const newDay = new Date((actDay + initialDate.getTime()))
    days.push(newDay);
}

const fakeTestData = Array.from({ length: 1000000 }, (_, i) => ({
    clientName: `NomeCliente ${i+1}`,
    id: i + 1,
    author: 'Dave',
    description: `Descrizione dell'intervento ${i+1}`,
    data: days
    .slice(randomChances(days.length).index, days.length + 1)
    .map(day => ({
        date: day.toISOString().split('T')[0],
        workingHours: randomChances(9).index + 1,
        travelHours: randomChances(3).index + 1,
        km: day.getDate() * 10
    })),
    status: statuses[randomChances(4).index]
}));

app.get('/fakeData', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); 

  const limit = parseInt(req.query.limit) || 1000; 

  const filter = req.query.filter;
  const end = limit + 10;
  const pageData = fakeTestData.slice(0, end);
  let filteredData = [];
  let filteredDataSliced = [];

  if (filter) {
    const param = filter.toLowerCase();
    filteredData = fakeTestData.filter(item =>
      item.clientName.toLowerCase().includes(param)
    )
  } else {
    filteredData = pageData;
  }
  filteredDataSliced = filteredData.slice(0, end);

  console.log('Sending Data...')

  res.json({
    total: fakeTestData.length, 
    filteredTotal: filteredData.length,
    data: pageData,
    filteredData: filteredDataSliced
  });

});


app.all('/*aiut', (req, res) => {
  res.send('Not Found');
});


app.listen(PORT, '0.0.0.0',  () => {
  console.log(`Server listening on port ${PORT}`);
});

