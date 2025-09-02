import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchData = createAsyncThunk('interventi/fetchData', 
    async () => {
    const response = await fetch('/api/interventiDaAggiungere');
    if (response.ok) {
       return await response.json();
    } else {
        throw new Error ('Feth interventi fallito');
    }
});

const addData = createAsyncThunk('interventi/addData', 
    async (interventoData) => {
        console.log('adding Data...')
        const response = await fetch('/api/addIntervento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(interventoData)
        });
        if (response.ok) {
        return await response.json();
        } else {
            throw new Error('Aggiunta intervento fallita');
        }
    }
);


// Dati fittizi da cancellare quando Daniele farà il backend
import { randomChances } from '../../Functions/randomChances.js';

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

const fakeTestData = Array.from({ length: 1000 }, (_, i) => ({
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

////////////////////////////////////////////////////////////////////////

const sliceOptions = {
    name: 'interventi',
    initialState: {
        requests: {
            fetch : {
                pending: false,
                error: false,
                fulfilled: false
            },
            add: {
                pending: false,
                error: false,
                fulfilled: false
            }
        },
        all: fakeTestData,
        filteredData: fakeTestData,
        filter: ''
    },
    reducers: {
        setFilteredData: (state, action) => {
            state.filter = action.payload;
            if (state.filter) {
                state.filteredData = state.all.filter(intervento => intervento.name.toLowerCase().includes(state.filter.toLowerCase())
                );
            } else {
                state.filteredData = state.all;
            }
        },
        resetFilteredData: (state) => {
            state.filter = '';
            state.filteredData = state.all;
        }
        },
    extraReducers: (builder) => {
        builder
        //Fetch Data
        .addCase(fetchData.pending, (state) => {
            state.requests.fetch.pending = true;
            state.requests.fetch.error = false;
            state.requests.fetch.fulfilled = false;
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            state.requests.fetch.pending = false;
            state.requests.fetch.error = false;
            state.requests.fetch.fulfilled = true;
            state.all = action.payload;
            state.filteredData = action.payload;
        })
        .addCase(fetchData.rejected, (state) => {
            state.requests.fetch.pending = false;
            state.requests.fetch.error = true;
            state.requests.fetch.fulfilled = false;
        })
        //Add Data
        .addCase(addData.pending, (state) => {
            state.requests.add.pending = true;
            state.requests.add.error = false;
            state.requests.add.fulfilled = false;
        })
        .addCase(addData.fulfilled, (state) => {
            state.requests.add.pending = false;
            state.requests.add.error = false;
            state.requests.add.fulfilled = true;   
        })
        .addCase(addData.rejected, (state) => {
            state.requests.add.pending = false;
            state.requests.add.error = true;
            state.requests.add.fulfilled = false;   
        })
        //Modify Data

        //Remove Data

        .addDefaultCase((state, action) => {
            if (!action.type.startsWith('@@redux')) {
            console.warn('Azione non riconosciuta nel reducer di interventiSlice:', action.type);
            }
        });
    }
};


export const interventiSlice = createSlice(sliceOptions);
export const { setFilteredData, resetFilteredData } = interventiSlice.actions;
export { fetchData, addData };
