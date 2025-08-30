import { NavLink, Outlet } from 'react-router-dom';
// Style
import styles from '../Styles/MainPage.module.css';
// Components
import { LoginButton } from './LoginButton';


export const MainPage = () => {

  const handleLogin = _ => alert('Funzione da aggiungere')

  return (
    <>
      <div className={styles.MainTitle}>
        <NavLink to={'/'}>
          <h1>Pagina Principale</h1>
        </NavLink>
        {/* <button name='Login' onClick={handleLogin}>Login</button> */}
        <LoginButton onClick={handleLogin} />
      </div>
      <Outlet />
    </>
  )
}