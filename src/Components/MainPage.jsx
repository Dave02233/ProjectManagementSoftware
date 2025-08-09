import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredData } from '../Store/Slices/interventiSlice.js';
import { NavLink } from 'react-router-dom';

import { SectionPreviewInterventi } from './SectionPreviewInterventi.jsx';


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
        <NavLink to={'/Interventi'}>
          <SectionPreviewInterventi interventi={interventi.filteredData}/>
        </NavLink>

      </>
    )
}