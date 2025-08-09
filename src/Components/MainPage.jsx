import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredData } from '../Store/Slices/interventiSlice.js';

import { Intervento } from './Intervento.jsx';

export const MainPage = () => {

    const dispatch = useDispatch();
    const interventi = useSelector((state) => state.interventi);
    const { isLoading, errorLoading } = interventi;

    const [filter, setFilter] = useState('');

    const handleChange = ({ target }) => {
        setFilter(target.value);
        dispatch(setFilteredData(target.value));
    }

    return (
      <>
        <h1>Pagina Principale</h1>
        <input type='text' placeholder='Filtra Interventi' onChange={handleChange} value={filter} />
        <ul>
            {
                errorLoading
                    ? <li>Errore nel caricamento degli interventi.</li>
                    : isLoading
                        ? <li>Caricamento in corso...</li>
                        : interventi.filteredData.length === 0
                            ? <h2>Nessun intervento trovato</h2>
                            : interventi.filteredData.map((intervento, index) => (
                                <Intervento key={index} intervento={intervento} isLoading={false} error={false}/>
                                ))
            }
        </ul>
      </>
    )
}