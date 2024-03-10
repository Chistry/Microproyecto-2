import { createBrowserRouter } from 'react-router-dom';
import InicioSesion from './Pages/InicioSesion.jsx'
import Registrarse from './Pages/Registrarse.jsx'
import PerfilUsuario from './Pages/PerfilUsuario.jsx';
import App from './Pages/Home-Page/App.jsx'
import Club1 from './Pages/club1/club1.jsx'
import Club2 from './Pages/club2/club2.jsx'
import Club3 from './Pages/club3/club3.jsx'
import Club4 from './Pages/club4/club4.jsx'
import Club5 from './Pages/club5/club5.jsx'

export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },    
    {
      path: '/club1',
      element: <Club1 />,
    },    
    {
      path: '/club2',
      element: <Club2 />,
    },
    {
      path: '/club3',
      element: <Club3 />,
    },
    {
      path: '/club4',
      element: <Club4 />,
    },
    {
      path: '/club5',
      element: <Club5 />,
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
      path: '/profilepage',
      element: <PerfilUsuario />,
    }
  ]);