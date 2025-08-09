import { NavLink } from "react-router-dom"

export const ErrorPage = () => {
    return (
        <>
            <h1>Errore Inaspettato</h1>
            <NavLink to="/">Torna alla Pagina Principale</NavLink>
        </>
    )
}