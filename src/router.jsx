import { createBrowserRouter } from 'react-router-dom';
import InicioSesion from './Pages/InicioSesion.jsx'
import Registrarse from './Pages/Registrarse.jsx'
import AppLayout from './AppLayout.jsx'
import PerfilUsuario from './Pages/PerfilUsuario.jsx';

export const router = createBrowserRouter([
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
    {
      path: '/profilepage',
      element: <PerfilUsuario />,
    },
  ]);