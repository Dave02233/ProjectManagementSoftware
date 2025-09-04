import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import { MainPage } from './Components/MainPage.jsx'
import { Preview } from './Components/Preview.jsx'
import { Intervento } from './Components/Intervento.jsx';
import { NewIntervento } from './Components/NewIntervento.jsx';
import { NotFound } from './Components/Extra/NotFound.jsx'
import { ErrorPage } from './Components/Extra/ErrorPage.jsx'


import { store } from './Store/store.js';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Preview /> },  
      { path: 'Interventi', element: <h1>Interventi</h1> },
      { path: 'Interventi/:id', element: <Intervento /> },
      { path: 'Interventi/:id/Modifica', element: <h1>Modifica Rapportino</h1> },
      { path: 'Interventi/Creazione', element: <NewIntervento />},
      { path: 'CompilazioneOre', element: <h1>Compilazione Ore</h1> },
      { path: 'CompilazioneOre/:id', element: <h1>Compilazione Ore Singolo</h1> },
      { path: 'CompilazioneOre/:id/Modifica', element: <h1>Modifica Ore Singolo</h1> },
      { path: 'Statistiche', element: <h1>Statistiche</h1> },
      { path: 'Statistiche/:id', element: <h1>Statistiche Singola Commessa</h1> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)


