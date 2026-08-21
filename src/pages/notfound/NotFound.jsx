import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
        <div className={styles.errorMessage}>
            <h1>Erreur 404</h1>
            <p>La page que vous demandez n'existe pas.</p>
            <Link to="/login">Retourner à l'accueil</Link>
        </div>
    )
}
