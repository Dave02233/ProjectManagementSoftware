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

// Dati fittizi da cancellare quando Daniele farà il backend
import { randomChances } from '../../Functions/randomChances.js';

const statuses = ['Completato', 'In Corso', 'In Attesa'];

const fakeTestData = Array.from({ length: 100 }, (_, i) => ({
    name: `Intervento ${i+1}`,
    id: i + 1,
    description: `Descrizione dell'intervento ${i+1}`,
    date: new Date().toISOString().split('T')[0],
    status: statuses[randomChances(3).index]
}));

//

const sliceOptions = {
    name: 'interventi',
    initialState: {
        loadingInterventi: false,
        errorLoadingInterventi: false,
        all: fakeTestData,
        filteredData: fakeTestData,
        filter: ''
    },
    reducers: {
        setFilteredData: (state, action) => {
            state.filter = action.payload;
            console.log('all:', state.all);
            console.log('filter:', state.filter);
            if (state.filter) {
                state.filteredData = state.all.filter(intervento => intervento.name.toLowerCase().includes(state.filter.toLowerCase())
                );
            } else {
                state.filteredData = state.all;
            }
            console.log('filteredData:', state.filteredData);
        },
        resetFilteredData: (state) => {
        state.filter = '';
        state.filteredData = state.all;
        }
        },
    extraReducers: (builder) => {
        builder
        .addCase(fetchData.pending, (state) => {
            state.loadingInterventi = true;
            state.errorLoadingInterventi = false;
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            state.loadingInterventi = false;
            state.errorLoadingInterventi = false;
            state.all = action.payload;
            state.filteredData = action.payload;
        })
        .addCase(fetchData.rejected, (state) => {
            state.loadingInterventi = false;
            state.errorLoadingInterventi = true;
        })
        .addDefaultCase((state, action) => {
            if (!action.type.startsWith('@@redux')) {
            console.warn('Azione non riconosciuta nel reducer di interventiSlice:', action.type);
            }
        });
    }
};


export const interventiSlice = createSlice(sliceOptions);
export const { setFilteredData, resetFilteredData } = interventiSlice.actions;
export { fetchData };
