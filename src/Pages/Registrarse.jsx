import { Registrarse } from '../auth';
import { useState, useEffect } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import styles from './Registrarse.module.css';
import { useUser } from '../user';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [videojuegoPreferido, setVideojuegoPreferido] = useState('');
  const [videojuegos, setVideojuegos] = useState([]);
  const [error, setError] = useState(null);
  const navegar = useNavigate();
  const usuario = useUser();

  useEffect(() =>{
    if (usuario) {
      navegar('/', {replace: true})
    }
  }, [usuario, navegar]);

  useEffect(() => {
    const obtenerVideojuegos = async () => {
      try {
        const docRef = doc(db, 'videojuegos', 'keyvideojuegos');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const videojuegosData = docSnap.data();
          const juegos = Object.values(videojuegosData).map(videojuego => videojuego.titulo);
          console.log(juegos)
          setVideojuegos(juegos);
        } else {
          console.log('No se encontraron datos de videojuegos');
          setVideojuegos([]);
        }
      } catch (error) {
        setError("Error al cargar la lista de videojuegos");
      }
    };

    obtenerVideojuegos();
  }, []);

  const handleRegistro = async () => {
    try {
      const usuario = await Registrarse(nombre, apellido, nombreUsuario, email, contraseña, videojuegoPreferido);
      console.log(usuario)
      if (usuario) {
        navegar('/', {replace: true});
      } else {
        setError('La cuenta ya existe.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.inicio}>
        <div className={styles.container}>
        <h2>Registro</h2>
        <div> 
            <form onSubmit={handleRegistro}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                <input type="text" placeholder="Nombre de usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} />
                <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                <select value={videojuegoPreferido} onChange={(e) => setVideojuegoPreferido(e.target.value)}>
                <option value="">Seleccione su videojuego preferido</option>
                {videojuegos.map((juego, index) => (
                    <option key={index} value={juego}>{juego}</option>
                ))}
                </select>
            </form>
        </div>
        <button className={styles.buttonr} onClick={() => handleRegistro()}>Registrarse</button>
        {error && <p className={styles.error}>{error}</p>}
        <p>Tienes cuenta? Inicia sesión acá abajo</p>
        <button onClick={() => navegar('/login', {replace: true})}>Inicio Sesión</button>
        </div>
    </div>

  );
}