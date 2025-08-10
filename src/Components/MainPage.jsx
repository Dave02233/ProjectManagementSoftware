import { useState } from 'react';
import { NavLink } from 'react-router-dom';
//Store
import { setFilteredData } from '../Store/Slices/interventiSlice.js';
import { useDispatch, useSelector } from 'react-redux';
// Components
import { SectionPreviewInterventi } from './SectionPreviewInterventi.jsx';
// Style
import styles from '../Styles/MainPage.module.css';


export const MainPage = () => {

  // Store setup
  const dispatch = useDispatch();
  const interventi = useSelector((state) => state.interventi);
  const { isLoading, errorLoading } = interventi; // Per ora non servono, ma utili con richieste API

  // Filter state
  const [filter, setFilter] = useState('');
  const handleChangeFilter = ({ target }) => {
      setFilter(target.value);
      dispatch(setFilteredData(target.value));
  }

  return (
    <>
      <h1>Pagina Principale</h1>
      <input type='text' name='Filtro Interventi' placeholder='Filtro Interventi' onChange={handleChangeFilter} value={filter} />
      <div className={styles.PreviewContainer}>
        <NavLink to={'/Interventi'}>
          <SectionPreviewInterventi interventi={interventi.filteredData}/>
        </NavLink>
        <NavLink to={'/Interventi'}>
          <SectionPreviewInterventi interventi={interventi.filteredData}/>
        </NavLink>
      </div>
    </>
  )
}