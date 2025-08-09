import { NavLink } from "react-router-dom"

export const NotFound = () => {
    return (
        <>
            <h1>Pagina Non Trovata</h1>
            <NavLink to="/">Torna alla Pagina Principale</NavLink>
        </>
    )
}