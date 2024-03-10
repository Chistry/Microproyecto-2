import { createBrowserRouter } from 'react-router-dom';
import InicioSesion from './Pages/InicioSesion.jsx'
import Registrarse from './Pages/Registrarse.jsx'
import AppLayout from './Layout/AppLayout.jsx'
import App from './Pages/Home-Page/App.jsx'
import Club1 from './Pages/club1/club1.jsx'
import Club2 from './Pages/club2/club2.jsx'


export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },    {
      path: '/club1',
      element: <Club1 />,
    },    {
      path: '/club2',
      element: <Club2 />,
    },
    {
      path: '/login',
      element: <InicioSesion />,
    },
    {
      path: '/register',
      element: <Registrarse />,
    },
    {
      path: '/app',
      element: <AppLayout />,
    },
  ]);