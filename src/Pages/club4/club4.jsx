import './club4.css';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.js'; // Ajusta la ruta según la estructura de tu proyecto
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import Header from '../Header/Header.jsx';
import { useUser } from '../../user';
import { useNavigate } from 'react-router-dom';

const Club4 = () => {
    const [clubName, setClubName] = useState('');
    const [clubDescription, setClubDescription] = useState('');
    const [clubVideojuegos1, setClubVideojuegos1] = useState('');
    const [clubVideojuegos2, setClubVideojuegos2] = useState('');
    const [clubVideojuegos3, setClubVideojuegos3] = useState('');

    const [VideoName, setVideoName] = useState('');
    const [VideoGender, setVideoGender] = useState('');
    const [VideoDescription, setVideoDescription] = useState('');

    const [VideoName2, setVideoName2] = useState('');
    const [VideoGender2, setVideoGender2] = useState('');
    const [VideoDescription2, setVideoDescription2] = useState('');

    const [VideoName3, setVideoName3] = useState('');
    const [VideoGender3, setVideoGender3] = useState('');
    const [VideoDescription3, setVideoDescription3] = useState('');
    /*ID, titulo, genero, descripcion*/

    const usuario = useUser();
    const usuariomail = usuario.email;
    const usuariouid = usuario.uid;
    const navegar = useNavigate();
    const [datosUsuario, setDatosUsuario] = useState('');
    const [confirmar, setConfirmar] = useState(false);
    const [mensaje, setMensaje] = useState('');

    useEffect(() =>{
        if (!usuario) {
            navegar('/login', {replace: true})
        }
    }, [usuario, navegar]);

    const handleUnirseClick = () => {
        setConfirmar(true);
      };

      const handleConfirmar = async (usuario, uid, grupoNombre) => {
        const obtenerDatosUsuario = async () => {
            try {
                const q = query(collection(db, 'usuarios'), where('email', '==', usuario));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        setDatosUsuario(doc.data());
                    });
                } else {
                    console.log('No se encontraron datos para el usuario con email:', usuario);
                }
            } catch (error) {
                console.error('Error al obtener datos del usuario:', error);
            }
        };
        console.log(grupoNombre)
        console.log(uid)
        console.log(datosUsuario[grupoNombre]);
        try {
            await obtenerDatosUsuario();
            if (datosUsuario[grupoNombre] === true) {
                setMensaje('¡Ya estás en este club!');
            } else {
                const Ref = doc(db, "usuarios", uid);
                await updateDoc(Ref, {
                    [grupoNombre]: true
                });
                setMensaje('¡Te has unido al club exitosamente!');
            }
        } catch (error) {
            setMensaje('Hubo un error al intentar unirse al club.');
        }
        setTimeout(() => {
            setMensaje('');
          }, 1000);
    };

    const handleCancelar = () => {
        setConfirmar(false);
      };

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const colRef = collection(db, 'clubs');

                const snapshot = await getDocs(colRef);

                const ClubDatabase = snapshot.docs[0].data();

                const nombre = ClubDatabase[4].nombre;
                const descripcion = ClubDatabase[4].descripcion;
                const videojuego1 = ClubDatabase[4].videojuegos[0];
                const videojuego2 = ClubDatabase[4].videojuegos[1];
                const videojuego3 = ClubDatabase[4].videojuegos[2];



                setClubName(nombre);
                setClubDescription(descripcion);
                setClubVideojuegos1(videojuego1);
                setClubVideojuegos2(videojuego2);
                setClubVideojuegos3(videojuego3);


            } catch (error) {
                console.log(error.message);
            }
        };

        fetchClubData();
    }, []);

    useEffect(() => {
        const fetchVideogamesData = async () => {
            try {
                const colVid = collection(db, 'videojuegos');

                const snapshotVid = await getDocs(colVid);

                const VideoDatabase = snapshotVid.docs[0].data();

                const name = VideoDatabase[clubVideojuegos1].titulo;
                const description = VideoDatabase[clubVideojuegos1].descripcion;
                const genero = VideoDatabase[clubVideojuegos1].genero;

                const name2 = VideoDatabase[clubVideojuegos2].titulo;
                const description2 = VideoDatabase[clubVideojuegos2].descripcion;
                const genero2 = VideoDatabase[clubVideojuegos2].genero;

                const name3 = VideoDatabase[clubVideojuegos3].titulo;
                const description3 = VideoDatabase[clubVideojuegos3].descripcion;
                const genero3 = VideoDatabase[clubVideojuegos3].genero;

                setVideoName(name);
                setVideoDescription(description);
                setVideoGender(genero);

                setVideoName2(name2);
                setVideoDescription2(description2);
                setVideoGender2(genero2);

                setVideoName3(name3);
                setVideoDescription3(description3);
                setVideoGender3(genero3);

            } catch (error) {
                console.log(error.message);
            }
        };

        fetchVideogamesData();
    }, [clubVideojuegos1, clubVideojuegos2, clubVideojuegos3]);
    
    if (usuario === null && usuario === undefined && usuariomail === null && usuariomail === undefined) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="container">
            <Header/>
            <div className="image-container">
                <img src="./futbol.jpg" alt="Imagen del club" />
            </div>
            <div className="content-and-image-container">
                <div className="content-container">
                    <h1 className="club-title">{clubName}</h1>
                    <p className="club-description">{clubDescription}</p>

                    <div className="games-container">
                        <div className="games-section1">
                            <h2>{VideoName} <br /> {VideoGender}</h2>
                            <p>{VideoDescription}</p>
                        </div>

                        <div className="games-section2">
                            <h2>{VideoName2} <br /> {VideoGender2}</h2>
                                <p>{VideoDescription2}</p>
                        </div>

                        <div className="games-section3">
                            <h2>{VideoName3} <br /> {VideoGender3}</h2>
                                    <p>{VideoDescription3}</p>
                        </div>
                    </div>
                    <button className="join-button" onClick={handleUnirseClick}>¡Unirse!</button>
                    {confirmar && (
                        <div>
                        <p>¿Estás seguro de que deseas unirte a este club?</p>
                        <button className="buttonconfirmar" onClick={() => handleConfirmar(usuariomail, usuariouid, clubName.replace(/\s/g, ''))}>Confirmar</button>
                        <button className="buttoncancelar" onClick={handleCancelar}>Cancelar</button>
                        {mensaje && <p>{mensaje}</p>}
                        </div>
                    )}
                </div>
            </div>
            
        </div>

    );
};

export default Club4;
