import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function App() {
  const [alive, setAlive] = useState([]);

  useEffect(() => {
    api
      .get('https://doar-computador-api.herokuapp.com/')
      .then(response => setAlive(response.data.alive))
      .catch((err) => {
        console.error("Erro: " + err);
     });

    }, []);
  
  return (
    <div className="App">
      <p>{alive ? "API online" : "API offline"}</p>
    </div>
  )
}
