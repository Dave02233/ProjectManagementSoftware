import { useState, useEffect } from 'react';
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
      setFilter(prev => prev = target.value)
  }

  // Dispatch change filter
  useEffect( _ => {
    dispatch(setFilteredData(filter));
  }, [filter])

  return (
    <>
      <div className={styles.MainTitle}>
        <h1>Pagina Principale</h1>
        <button name='Login'>Login</button>
      </div>
      <div className={styles.UtilitiesContainer}>
        <input className={styles.Filtro} type='text' name='Filtro' placeholder='Filtro Interventi' onChange={handleChangeFilter} value={filter} />
      </div>
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