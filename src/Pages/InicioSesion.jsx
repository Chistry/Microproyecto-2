import { useUser } from '../user';
import { Logearse, LogearseConGoogle, validarInicioSesion } from '../auth';
import styles from './InicioSesion.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function InicioSesion() {
  const usuario = useUser();
  const navegar = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)

  useEffect(() =>{
    if (usuario) {
      navegar('/app', {replace: true})
    }
  }, [usuario, navegar]);

  const handleLogin = async () => {
    try {
        const correoValido = await validarInicioSesion(email);
        if (!correoValido) {
            setError('El correo electrónico introducido no está registrado.');
            return;
        }else{
          const usuario = await Logearse(email, password);
          if (usuario) {
              navegar('/app', {replace: true});
          } else {
              setError('Las credenciales de inicio de sesión son incorrectas.');
          }
        }
    } catch (error) {
        setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
};

  const handleGoogleLogin = async () => {
    try {
      const usuario = await LogearseConGoogle();
      if (usuario) {
        navegar('/app', {replace: true});
      } else {
        setError('Error al iniciar sesión con Google.');
      }
    } catch (error) {
      setError('Ocurrió un error al intentar iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className={styles.inicio}>
      <div className={styles.container}>
        <h2 className={styles.text}>Iniciar Sesión</h2>
        <div className={styles.form}>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
        </div>
        <button className={styles.buttonS} onClick={() => handleLogin()} type="submit">Iniciar Sesión</button>
        <button type="button" onClick={() => handleGoogleLogin()}>Iniciar Sesión con Google</button>
        {error && <p className={styles.error}>{error}</p>}
        <p>No tienes cuenta? Registrate acá abajo</p>
        <button onClick={() => navegar('/register', {replace: true})}>Registro</button>
      </div>
    </div>
  );
}
