import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { useRouter } from 'next/router'
import { response } from 'express'

export default function App() {
  const [alive, callApi] = useState([]);

  useEffect(() => {
    api
      .get('https://doar-computador-api.herokuapp.com/')
      .then(response => callApi(response.data))
      console.log(alive);
      console.log('bla')
  }, []);

  // const isAlive = function(alive) {
  //   return console.log("noive")
  // }
  // isAlive()
  return (
    <div className="App">
      <p>blabli</p>
    </div>
    // isAlive()
  )
}
