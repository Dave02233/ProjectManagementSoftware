import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const serverAdress = '192.168.33.93:3001'

const fetchData = createAsyncThunk('interventi/fetchData', 
    async ({ limit, filter }) => {
    const response = await fetch(`http://${serverAdress}/fakeData?limit=${limit || 1000}&filter=${filter || ''}`);

    if (response.ok) {
       return await response.json();
    } else {
        throw new Error ('Fetch interventi fallito');
    }
});

const generateAutoCompleteData = createAsyncThunk('interventi/generateAutoCompleteData',
    async () => {
        const response = await fetch(`http://${serverAdress}/generateAutoCompleteData`);

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error ('Fetch AutoComplete Data fallito');
        }
    }
)

const addData = createAsyncThunk('interventi/addData', 
    async (interventoData) => {
        console.log(interventoData);
        const response = await fetch(`http://${serverAdress}/addData`, {
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

const getStats = createAsyncThunk('interventi/getStats',
    async () => {
        const response = await fetch(`http://${serverAdress}/getStats`);

        if (response.ok) {
            return await response.json()
        } else {
            throw new Error ('Fetch AutoComplete Data fallito');
        }
    }
)


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
            },
            autocomplete: {
                pending: false,
                error: false,
                fulfilled: false
            },
            stats: {
                pending: false,
                error: false,
                fulfilled: false
            }
        },
        all: {},
        filteredData: {},
        total: 0,
        filteredTotal: 0,
        filter: '',
        authors: [],
        clientsNames: [],
        stats: [{
            total: 0,
            pending: 0,
            completed: 0,
            active: 0,
            date:  '2025-09-08'
        }]
    },
    reducers: {
        setFilteredData: (state, action) => {
            state.filter = action.payload;
            if (state.filter) {
                state.filteredData = state.filteredData;
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
            console.log('Fetch Data pending...');
            state.requests.fetch.pending = true;
            state.requests.fetch.error = false;
            state.requests.fetch.fulfilled = false;
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            console.log('Fetch Data completed successfully')
            state.requests.fetch.pending = false;
            state.requests.fetch.error = false;
            state.requests.fetch.fulfilled = true;
            state.all = action.payload.data;
            state.filteredData = action.payload.filteredData;
            state.total = action.payload.total; 
            state.filteredTotal = action.payload.filteredTotal; 
        })
        .addCase(fetchData.rejected, (state) => {
            console.error('Fetch Data Failed')
            state.requests.fetch.pending = false;
            state.requests.fetch.error = true;
            state.requests.fetch.fulfilled = false;
        })
        //Add Data
        .addCase(addData.pending, (state) => {
            console.log('Add Data pending...');
            state.requests.add.pending = true;
            state.requests.add.error = false;
            state.requests.add.fulfilled = false;
        })
        .addCase(addData.fulfilled, (state, action) => {
            console.log('Add Data completed successfully');
            state.requests.add.pending = false;
            state.requests.add.error = false;
            state.requests.add.fulfilled = true;   
            console.log(action.payload);
        })
        .addCase(addData.rejected, (state) => {
            console.error('Add Data Failed');
            state.requests.add.pending = false;
            state.requests.add.error = true;
            state.requests.add.fulfilled = false; 
        })
        //Modify Data

        //Remove Data

        //Autocomplete Data
        .addCase(generateAutoCompleteData.pending, (state) => {
            console.log('Fetch Autocomplete Date pending...');
            state.requests.autocomplete.pending = true;
            state.requests.autocomplete.error = false;
            state.requests.autocomplete.fulfilled = false;
        })
        .addCase(generateAutoCompleteData.fulfilled, (state, action) => {
            console.log('Fetch Autocomplete Data completed successfully');
            state.requests.autocomplete.pending = false;
            state.requests.autocomplete.error = false;
            state.requests.autocomplete.fulfilled = true;   
            state.clientsNames = action.payload.clientsNames;
            state.authors = action.payload.authors;
        })
        .addCase(generateAutoCompleteData.rejected, (state) => {
            console.error('Fetch Autocomplete Data failed');
            state.requests.autocomplete.pending = false;
            state.requests.autocomplete.error = true;
            state.requests.autocomplete.fulfilled = false;   
        })
        //Stats
        .addCase(getStats.pending, (state, action) => {
            console.log('Receiving Stats...');
            state.requests.stats.pending = true;
            state.requests.stats.error = false;
            state.requests.stats.fulfilled = false;   
        })
        .addCase(getStats.fulfilled, (state, action) => {
            console.log('Stats received succesfully');
            state.requests.stats.pending = false;
            state.requests.stats.error = false;
            state.requests.stats.fulfilled = true;   
            state.stats = action.payload;
        })
        .addCase(getStats.rejected, (state, action) => {
            console.error('Failed to get stats');
            state.requests.stats.pending = false;
            state.requests.stats.error = true;
            state.requests.stats.fulfilled = false;   
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
export { fetchData, addData, generateAutoCompleteData, getStats };
