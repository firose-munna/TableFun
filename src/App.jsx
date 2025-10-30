import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

const CHUNK_SIZE = 1000;

function App() {
  const [allStudents, setAllStudents] = useState([]);
  const [renderedStudents, setRenderedStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/students.json')
      .then((response) => {
        const data = response.data;
        setAllStudents(data);
        setRenderedStudents(data.slice(0, CHUNK_SIZE));
        setCurrentIndex(CHUNK_SIZE);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loadMoreStudents = useCallback(() => {
    if (currentIndex >= allStudents.length) {
      return;
    }

    const nextChunk = allStudents.slice(currentIndex, currentIndex + CHUNK_SIZE);
    setRenderedStudents((prevStudents) => [...prevStudents, ...nextChunk]);
    setCurrentIndex((prevIndex) => prevIndex + CHUNK_SIZE);
  }, [allStudents, currentIndex]);

  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      if ( window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000 ) {
        loadMoreStudents();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, loadMoreStudents]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>8 Lakh Object Render Challenge</h1>
      </header>
      <main>
        
        {isLoading ? (
          <div className="loader-container">
            <div className="loader"></div>
            <p>Loading 800,000 records...</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Designation</th>
                <th>HomeTown</th>
              </tr>
            </thead>
            <tbody>
              {renderedStudents.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.Age}</td>
                  <td>{student.Designation}</td>
                  <td>{student.HomeTown}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default App;