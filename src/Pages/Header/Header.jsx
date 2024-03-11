import { useState, useEffect, useRef } from 'react';
import './Header.css'; // Asegúrate de importar tu archivo CSS
import {db} from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';

function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    const navegar = useNavigate();
    const [foundGame, setFoundGame] = useState(null);
    const [VideoDatabase, setVideoDatabase] = useState(null);
    const headerRef = useRef(null);

    //Busca VideoDatabase en la base de datos
    useEffect(() => {
        const fetchVideogamesData = async () => {
            try {
                const colVid = collection(db, 'videojuegos');

                const snapshotVid = await getDocs(colVid);

                const VideoDatabase = snapshotVid.docs[0].data();
                console.log(VideoDatabase);
                setVideoDatabase(VideoDatabase);

            } catch (error) {
                console.log(error.message);
            }
        };

        fetchVideogamesData();

        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setFoundGame(null);
            }
        };

        // Agrega el event listener al montar el componente
        document.addEventListener('mousedown', handleClickOutside);

        // Elimina el event listener al desmontar el componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = () => {
        // Buscar el juego en VideoDatabase
        const juegosEncontrados = Object.entries(VideoDatabase).filter(([key, juego]) =>
            key === searchTerm ||
            juego.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            juego.genero.toLowerCase().includes(searchTerm.toLowerCase())
        ).map(entry => entry[1]);
        setFoundGame(juegosEncontrados);
    };
    
    
    
    

    return (
        <header ref={headerRef} className="header">
            <div className="header__left" onClick={() => navegar('/', {replace: true})}>
                <img src= "/cube-3d-design-element.png" alt="Home" className="header__button" />
            </div>
            <div className="header__middle">
                <div className="search-container">
                    {/* Buscador */}
                    <input
                        type="text"
                        placeholder="Buscar juego..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Buscar</button>
                </div>
                <div className="found-games-container">
                    {/* Bloque de información de los juegos encontrados */}
                    {foundGame && foundGame.map((juego, index) => (
                        <div key={index} className="found-game">
                            <h3>{juego.titulo} ({juego.genero})</h3>
                            <p>{juego.descripcion}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="header__right">
                <img src="/profile.png" alt="Perfil" className="header__button" onClick={() => navegar('/profilepage', {replace: true})}/>
            </div>
        </header>
    );
}

export default Header;
