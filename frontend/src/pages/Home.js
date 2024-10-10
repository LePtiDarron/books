import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/books/');
            setBooks(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des livres', error);
        }
        };

        fetchBooks();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/books/', {
                title,
                author,
                publication_year: publicationYear,
            });
            console.log(response.data);
            alert('Livre ajouté avec succès !');
            setTitle('');
            setAuthor('');
            setPublicationYear('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout du livre', error);
        }
    };
    
    return (
        <div>
          <h2>Ajouter un nouveau livre</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Titre : </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </div>
                <div>
                <label>Auteur : </label>
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                </div>
                <div>
                <label>Année de publication : </label>
                <input
                    type="number"
                    value={publicationYear}
                    onChange={(e) => setPublicationYear(e.target.value)}
                    required
                />
                </div>
                <button type="submit">Ajouter le livre</button>
            </form>
            <div>
                <h2>Liste des livres</h2>
                <ul>
                    {books.length > 0 ? (
                    books.map((book) => (
                        <li key={book.id}>
                        <strong>{book.title}</strong> par {book.author} (publié en {book.publication_year})
                        </li>
                    ))
                    ) : (
                    <p>Aucun livre disponible.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default Home;