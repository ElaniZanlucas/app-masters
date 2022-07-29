import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  // name: yup.string().required("Este campo é obrigatório"),
  // email: yup.string().email("Este email é inválido"),
  // phone: yup.string().min(10).max(11).required("Este campo é obrigatório"),
  // zip: yup.string().required("Este campo é obrigatório"),
  // city:yup.string().required("Este campo é obrigatório"),
  // state:yup.string().required("Este campo é obrigatório"),
  // streetAddress:yup.string().required("Este campo é obrigatório"),
  // number:yup.number("Este campo precisa ser um número").required("Este campo é obrigatório"),
  // complement:yup.string(),
  // neighborhood:yup.string().required("Este campo é obrigatório"),
  deviceCount:yup.number("Este campo precisa ser um número").required("Este campo é obrigatório"),
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

const AppTeste = () => {
  const { control, register, handleSubmit, formState: { errors }, reset, setValue, setFocus} = useForm({
    resolver: yupResolver(validationSchema),
  });
  
  const [type, setType] = useState("");
  const [condition, setCondition] = useState("");

  const onSubmitHandler = (data) => {
    console.log({ data });
    insertDevices(data.deviceCount)
    // reset();
  };
  
  const insertAddress = (address) => {
    const cep = address.target.value.replace(/\D/g, '');
    let url = `https://viacep.com.br/ws/${cep}/json/`
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setValue("city", data.localidade)
        setValue("state", data.uf)
        setValue("streetAddress", data.logradouro)
        setValue("complement", data.complemento)
        setValue("neighborhood", data.bairro)
        setFocus("number")
      });
  }

  function insertDevices(deviceCount) {
    // console.log("Entrei", getValues(deviceCount))
    const root = createRoot(document.getElementById('loopinho'));
    console.log("Entrei", deviceCount)
    // const [device, setDevice] = useState([
    //   {
    //     type: "",
    //     condition: ""
    //   }
    // ]);
    let devices = new Array()

    for (let index = 0; index < deviceCount; index++) {
      devices.push({
        type: "bla",
        condition: "alb"
      })
    }
    console.log("Usinho", devices)
    let divs = new Array()

    devices.map((device, id) => {
      console.log("Mapinha")
      divs.push(
        <div key={id}>
          <label htmlFor="type">
            Tipo de dispositivo:
            <select
              id="type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              // {...register("type")}
              >
              <option value="notebook">Notebook</option>
              <option value="desktop">Desktop</option>
              <option value="netbook">Netbook</option>
              <option value="monitor">Monitor</option>
              <option value="impressora">Impressora</option>
              <option value="scanner">Scanner</option>
            </select>
          </label>

          <label htmlFor="condition">
            Estado de conservação:
            <select
              id="condition"
              name="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              // {...register("condition")}
              >
              <option value="working">Tem todas as partes, liga e funciona normalmente</option>
              <option value="notWorking">Tem todas as partes, mas não liga mais</option>
              <option value="broken">Faltam peças, funciona só as vezes ou está quebrado</option>
            </select>
          </label>
        </div>
      )
      
    })   
    root.render(divs);
  }
  
  return (
    <div>
    <form onSubmit={handleSubmit(onSubmitHandler)}>      
      {/* <label htmlFor="name">
        Nome:
        <input 
          id="name" 
          name="name"
          type="text"
          {...register("name")}
          placeholder="Insira seu nome"
        />
        <p>{errors.name?.message}</p>
      </label>
      <br />

      <label htmlFor="email">
        Email:
        <input 
          id="email" 
          name="email"
          type="email"
          {...register("email")}
          placeholder="nome@email.com"
        />
        <p>{errors.email?.message}</p>
      </label>
      <br />

      <label htmlFor="phone">
        Telefone:
        <input 
          id="phone" 
          name="phone"
          type="text"
          {...register("phone")}
          placeholder="DD912345678"
        />
        <p>{errors.phone?.message}</p>
      </label>
      <br />

      <label htmlFor="zip">
        CEP:
        <input 
          id="zip" 
          name="zip"
          type="text"
          {...register("zip")}
          placeholder="12345-678"
          onBlur={insertAddress}
        />
        <p>{errors.zip?.message}</p>
      </label>
      <br />
      
      <label htmlFor="city">
        Cidade:
        <input 
          id="city" 
          name="city"
          type="text"
          {...register("city")}
          placeholder="Cidade"
        />
        <p>{errors.city?.message}</p>
      </label>
      <br />

      <label htmlFor="state">
        UF:
        <input 
          id="state" 
          name="state"
          type="text"
          {...register("state")}
          placeholder="UF"
        />
        <p>{errors.state?.message}</p>
      </label>
      <br />

      <label htmlFor="streetAddress">
        Endereço:
        <input 
          id="streetAddress" 
          name="streetAddress"
          type="text"
          {...register("streetAddress")}
          placeholder="Endereço"
        />
        <p>{errors.streetAddress?.message}</p>
      </label>
      <br />

      <label htmlFor="number">
        Número:
        <input 
          id="number" 
          name="number"
          type="number"
          {...register("number")}
          placeholder="Número"
        />
        <p>{errors.number?.message}</p>
      </label>
      <br />
      
      <label htmlFor="complement">
        Complemento:
        <input 
          id="complement" 
          name="complement"
          type="text"
          {...register("complement")}
          placeholder="Bloco 4 Ap 12"
        />
        <p>{errors.complement?.message}</p>
      </label>
      <br />

      <label htmlFor="neighborhood">
        Bairro:
        <input 
          id="neighborhood" 
          name="neighborhood"
          type="text"
          {...register("neighborhood")}
          placeholder="Bairro"
        />
        <p>{errors.neighborhood?.message}</p>
      </label>
      <br /> */}

      <label htmlFor="deviceCount">
        Quantos dispositivos serão doados?
        <input 
          id="deviceCount" 
          name="deviceCount"
          type="number"
          {...register("deviceCount")}
          placeholder="Insira o número de dispositivos"
          // onChange={insertDevices()}
        />
        <p>{errors.deviceCount?.message}</p>
      </label>
      <br />    
      
      <button type="submit">Ok</button>
    </form>
    <div id="loopinho"></div>
    </div>
  );
};

export default AppTeste;