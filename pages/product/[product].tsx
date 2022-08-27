import Image from 'next/image'
import { FormEvent, useState } from 'react';
import products from "../../db/products.json"

import { useForm } from "react-hook-form";




export async function getStaticPaths() {
  const paths = products.products.map(({name})=>(
    { params: { product: name }}
  ));
    return {
      paths: paths,
      fallback: false,
    }
  }
  
  export async function getStaticProps(context) {
    const item2 = products.products.filter((product) => product.name === context.params.product)
    console.log(item2)
    return {
      props: item2[0]
    }
  }

const Product = ({name, image, price}) => {

    const [succes, setSucces] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async data => {
      fetch("/api/send/", {
          headers: {
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(data)
        })

        setSucces(true)
      }

    return (
        <div className="flex flex-col items-center gap-10">
          <h2 className='text-center text-4xl uppercase font-bold'>{name}</h2>
          <Image alt={name} src={image} width={400}
              height={400} />
          <ul className="font-bold text-2xl">
            <li>Taille disponible: XXL, XL, L</li>
            <li>100% Coton</li>
            <li>Fabriqué en Oukerie</li>
          </ul>
          <div className="bg-black text-white font-bold p-10 rounded-3xl">
            {price} CHF
          </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col bg-slate-300 p-20 font-bold gap-2 rounded-lg">
              <label>Taille</label>
              <select className="h-10 rounded-lg px-8" {...register("size", { required: true})} >
                <option  id="s" value="s">S</option>
                <option  id="m" value="m">M</option>
                <option id="l" value="l">L</option>
                <option  id="xl" value="xl">XL</option>
              </select>
              <label htmlFor="quantity">Quantité</label>
              <input 
                {...register("quantity", { required: true, maxLength: 20, min: 1, max: 10 })}
                className="h-10 rounded-lg p-4" 
                type="number" 
                id="quantity" 
                />

                <p className='text-red-600'>{errors.quantity?.type === 'max' && "Vous ne pouvez prendre que 10 exemplaires au maximun"}</p>
              <label htmlFor="email">Adresse Email</label>
              <input
                {...register("email", { required: true})} 
                className="h-10 rounded-lg p-4" 
                type="email" 
                id="email" 
                placeholder="Adresse">
              </input>
                <div className='flex justify-between'>
                  <label htmlFor="Numero">Numero de téléphone </label>
                  <div className='text-gray-700'>(*Optionnel)</div>
                </div>
                <input
                  {...register("numero", { required: false, pattern: /^[0-9]+$/})} 
                  className="h-10 rounded-lg p-4" 
                  id="numero" 
                  placeholder="Numero">
                </input>
              <label htmlFor="fname">First name:</label>
              <input 
                {...register("firstName", { required: true, maxLength: 20 })} 
                className="h-10 rounded-lg p-4" 
                id="fname" 
                placeholder="Prénom">
              </input>
              <p className='text-red-600'>{errors.firstName?.type === 'required' && "Veuillez remplir ce champ"}</p>
              <label htmlFor="lname">Last name:</label>
              <input 
                {...register("lastName", { required: true, maxLength: 20 })} 
                className="h-10 rounded-lg p-4" 
                id="lname" 
                placeholder="Nom">
              </input>     
              <p className='text-red-600'>{errors.lastName?.type === 'required' && "Veuillez remplir ce champ"}</p>         
              <label htmlFor="addr">Adresse Postale</label>
              <input 
                {...register("addr", { required: true, maxLength: 20 })}  
                className="h-10 rounded-lg p-4" 
                type="text" 
                id="addr" 
                name="addr" 
                placeholder="Adresse">
              </input>
              <p className='text-red-600'>{errors.addr?.type === 'required' && "Veuillez remplir ce champ"}</p>
              <label htmlFor="npa">NPA</label>
              <input 
                {...register("npa", { required: true, pattern: {value: /^[0-9]{4}$/i, message: "a"} })} 
                className="h-10 rounded-lg p-4" 
                type="text" 
                id="npa" 
                name="npa" 
                placeholder="NPA">
              </input>
              <p className='text-red-600'>{errors.npa?.type === 'required' && "Veuillez remplir ce champ"}</p>
              <p className='text-red-600'>{errors.npa?.type === 'pattern' && "4 chiffres maximum"}</p>           
           
              <input className="h-10 bg-blue-500 mt-6 rounded-lg text-white" type="submit" value="Précommander"></input>
              {succes && <h4 className='text-center m-4 text-xl text-green-800'>Commande réussie, vérifiez votre boîte mail.</h4>}
          </form>

          
        </div>
    )
    
}

export default Product;