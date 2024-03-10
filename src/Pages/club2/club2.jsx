import './club2.css';
import { useState, useEffect } from 'react';
import { db } from '../../firebase.js'; // Ajusta la ruta según la estructura de tu proyecto
import { collection, getDocs } from 'firebase/firestore';

const Club2 = () => {
    const [clubName, setClubName] = useState('');
    const [clubDescription, setClubDescription] = useState('');

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const colRef = collection(db, 'clubs');
                const snapshot = await getDocs(colRef);
                const ClubDatabase = snapshot.docs[0].data();
                const nombre = ClubDatabase[2].nombre;
                const descripcion = ClubDatabase[2].descripcion;
                setClubName(nombre);
                setClubDescription(descripcion);
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchClubData();
    }, []);
    

    return (
        <div className="container">
            <div className="image-container">
                <img src="./club1image.jpg" alt="Imagen del club" />
            </div>
            <div className="content-and-image-container">
                <div className="content-container">
                    <h1 className="club-title">{clubName}</h1>
                    <p className="club-description">{clubDescription}</p>
                    <div className="games-container">
                        <div className="games-section1">
                            <h2>Videojuegos <br /> Disponibles</h2>
                            <ul>
                                <li>Dark Souls III</li>
                                <li>League of Legends (MOBA)<br/>Batallas estratégicas en línea con campeones y habilidades únicas</li>
                                <li>Genshin Impact</li>
                            </ul>
                        </div>
                        <div className="games-section2">
                            <h2>Videojuegos <br /> Recomendados</h2>
                            <ul>
                                <li>Monster Hunter: World</li>
                                <li>Baldurs Gate 3</li>
                                <li>SEA OF THIEVES</li>
                            </ul>
                        </div>
                    </div>
                    <button className="join-button">¡Unirse!</button>
                </div>
            </div>
            
        </div>

    );
};

export default Club2;
