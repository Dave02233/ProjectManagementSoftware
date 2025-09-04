import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchData = createAsyncThunk('interventi/fetchData', 
    async ({ limit, filter }) => {
    const response = await fetch(`http://localhost:3001/fakeData?limit=${limit || 1000}&filter=${filter || ''}`);

    if (response.ok) {
       return await response.json();
    } else {
        throw new Error ('Fetch interventi fallito');
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
        all: {},
        filteredData: {},
        total: 0,
        filteredTotal: 0,
        filter: ''
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
            console.log('Fetch Pending');
            state.requests.fetch.pending = true;
            state.requests.fetch.error = false;
            state.requests.fetch.fulfilled = false;
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            console.log('Fetch Completed Successfully')
            state.requests.fetch.pending = false;
            state.requests.fetch.error = false;
            state.requests.fetch.fulfilled = true;
            state.all = action.payload.data;
            state.filteredData = action.payload.filteredData;
            state.total = action.payload.total; 
            state.filteredTotal = action.payload.filteredTotal; 
        })
        .addCase(fetchData.rejected, (state) => {
            console.log('Fetch Failed')
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
