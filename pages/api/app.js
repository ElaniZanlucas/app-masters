// import React, { useEffect, useState } from 'react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Formik, Form, Field, useFormikContext } from 'formik'
import * as yup from "yup"
// import api from '../services/api'
// import "../../styles/styles.css"

const validationSchema = yup.object().shape({
  name: yup.string().required("Este campo é obrigatório"),
  email: yup.string().email("Este email é inválido"),
  phone: yup.number().required("Este campo é obrigatório"),
  zip: yup.string().required("Este campo é obrigatório"),
  city:yup.string().required("Este campo é obrigatório"),
  state:yup.string().required("Este campo é obrigatório"),
  streetAddress:yup.string().required("Este campo é obrigatório"),
  number:yup.number().positive().integer().required("Este campo é obrigatório"),
  complement:yup.string(),
  neighborhood:yup.string().required("Este campo é obrigatório"),
  deviceCount:yup.number().required("Este campo é obrigatório"),
  // devices: yup.array().of(yup.object({
  //   type:yup.string().required("Este campo é obrigatório"),
  //   condition:yup.string().required("Este campo é obrigatório")
  // }))
  // [
  //   {
  //     type:"",
  //     condition:""
  //   }
  // ]
});

const initialValues={
  name:"",
  email:"",
  phone:"",
  zip:"",
  city:"",
  state:"",
  streetAddress:"",
  number:"",
  complement:"",
  neighborhood:"",
  deviceCount:"",
  // devices: [
  //   {
  //     type:"",
  //     condition:""
  //   }
  // ]
};

// const {values, submitForm} = useFormikContext();

async function insertAddress (address) {
  const cep = address.replace(/\D/g, '');
  console.log(cep)
  console.log("blablibla")
  console.log("press F to respect")

  let url = `https://viacep.com.br/ws/${cep}/json/`
  const response = await fetch(url)
  const {bairro, complemento, localidade, logradouro, uf} = await response.json()

  console.log(bairro, complemento, localidade, logradouro, uf)

  setFieldValue("neighborhood", "blabla")

}

const formulario = () => {


  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={async (data) => {
      console.log(JSON.stringify(data, null, 2))
    }}
    // onSubmit= {(data) => {console.log(data)}}
  >
  
    <form>
      <label htmlFor="name">
        Nome:
        <input 
          id="name" 
          name="name"
          type="text"
        />
      </label>

      <label htmlFor="email">
        Email:
        <input 
          id="email" 
          name="email"
          type="email" 
        />
      </label>

      <label htmlFor="phone">
        Telefone:
        <input 
          id="phone" 
          name="phone"
          type="tel"
        />
      </label>

      <label htmlFor="zip">
        CEP:
        <input 
          id="zip" 
          name="zip"
          type="text"
          placeholder="CEP"
          value={values.zip}
          onBlur={insertAddress(values.zip)} 
        />
      </label>

      <label htmlFor="city">
        Cidade:
        <input 
          id="city" 
          name="city"
          type="text"
        />
      </label>

      <label htmlFor="state">
        Estado:
        <input 
          id="state" 
          name="state"
          type="text"
        />
      </label>

      <label htmlFor="streetAddress">
        Endereço:
        <input 
          id="streetAddress" 
          name="streetAddress"
          type="text" 
        />
      </label>

      <label htmlFor="number">
        Número:
        <input 
          id="number" 
          name="number"
          type="number"
        />
      </label>

      <label htmlFor="complement">
        Complemento:
        <input 
          id="complement" 
          name="complement"
          type="text" 
        />
      </label>

      <label htmlFor="neighborhood">
        Bairro:
        <input 
          id="neighborhood" 
          name="neighborhood"
          type="text" 
        />
      </label>

      <label htmlFor="deviceCount">
        Quantos equipamentos serão doados?
        <input 
          id="deviceCount" 
          name="deviceCount"
          type="number"
          // onBlur={formik.handleBlur} 
          // onBlur={insertDevices(formik.values.deviceCount)} 
        />
      </label>

      <button type="submit">Enviar</button>
    </form>
  </Formik>

}
export default function App() {
  // const {register, handleSubmit, setValue, setFocus} = useForm();
  // const {setFocus} = useForm();
  

  // const [alive, setAlive] = useState([]);
  // const {register, handleSubmit} = useForm();

  // useEffect(() => {
  //   api
  //     .get('https://doar-computador-api.herokuapp.com/')
  //     .then(response => setAlive(response.data.alive))
  //     .catch((err) => {
  //       console.error("Erro: " + err);
  //    });

  //   }, []);

  // const handleRegistration = (data) => console.log(data)
  // const handleError = (error) => console.error(error)
  
  return (
    <formulario />
    // formulario()
    // console.log("tá tudo certo, confia")
  )
}
