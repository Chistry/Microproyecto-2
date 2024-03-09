import { useUser } from '../user';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Deslogearse } from '../auth';
import styles from './AppLayout.module.css';

export default function AppLayout({children}){
    const usuario = useUser();
    const navegar = useNavigate();

    useEffect(() =>{
        if (!usuario) {
          navegar('/login', {replace: true})
        }
      }, [usuario, navegar]);
    
    return (
        <div>
            <nav>
                <div></div>
                <div>
                    <button className={styles.button} onClick={() => Deslogearse()}>Cerrar sesión</button>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    )
}