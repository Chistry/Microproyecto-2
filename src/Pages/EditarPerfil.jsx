import { useNavigate } from 'react-router-dom';
import { useUser } from '../user';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import Header from './Header/Header';
import styles from './PerfilUsuario.module.css';

export default function EditarPerfil(){

    const navegar = useNavigate();
    const usuario = useUser();
    console.log(usuario)
    const mail = usuario.email
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [error, setError] = useState('');
    const [datosUsuario, setDatosUsuario] = useState('');

    useEffect(() =>{
        if (!usuario && mail === null) {
          navegar('/login', {replace: true})
        }
      }, [usuario, mail, navegar]);

    useEffect(() => {
        if (usuario !== null && usuario !== undefined) {
            const obtenerDatosUsuario = async () => {
                try {
                    const q = query(collection(db, 'usuarios'), where('email', '==', usuario.email));
                    console.log(q)
                    const querySnapshot = await getDocs(q);
                    console.log(querySnapshot)
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            setDatosUsuario(doc.data());
                        });
                    } else {
                        console.log('No se encontraron datos para el usuario con email:', usuario.email);
                    }
                } catch (error) {
                    console.error('Error al obtener datos del usuario:', error);
                }
            };

            obtenerDatosUsuario();
        }
    }, [usuario]);

    const handleConfirmar = async () => {
        try {
            const userDocRef = doc(db, 'usuarios', usuario.uid);
            await updateDoc(userDocRef, {
                nombre: nombre,
                apellido: apellido
            });
            navegar('/profilepage', {replace: true});
        } catch (error) {
            setError('Hubo un error al actualizar los datos. Por favor, inténtalo de nuevo.');
        }
    };

    if (usuario === null && usuario === undefined && mail === null && mail === undefined) {
        return <p>Cargando...</p>;
    }

    return (
        <div className={styles.container}>
            <Header />
            <h2>Perfil de Usuario</h2>
                <div className={styles.info}>
                    <div className={styles.inputContainer}>
                        <p>Nombre:</p>
                        <input
                            type="nombre"
                            placeholder={datosUsuario.nombre}
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <p>Apellido:</p>
                        <input
                            type="apellido"
                            placeholder={datosUsuario.apellido}
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <p>Email: {usuario.email}</p>
                    <p>Nombre de Usuario: {datosUsuario.nombreUsuario}</p>
                    <p>Videojuego Preferido: {datosUsuario.videojuegoPreferido}</p>
                </div>
            <button className={styles.button1} onClick={handleConfirmar}>Confirmar</button>
            <button onClick={() => navegar('/profilepage', {replace: true})}>Cancelar</button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}