import './club4.css';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.js'; // Ajusta la ruta según la estructura de tu proyecto
import { collection, getDocs } from 'firebase/firestore';
import Header from '../Header/Header.jsx';

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
                    <button className="join-button">¡Unirse!</button>
                </div>
            </div>
            
        </div>

    );
};

export default Club4;
