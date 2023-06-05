import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { FormField, Loader } from '../components';
import {getRandomPrompt} from "../utils"
const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',           // the sting that user wants to create an image of.
    photo: ''
  })
  const [generatingImage, setGeneratingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e)=> {         // Since we have given the type of button as "submit" for the Share with community button as it comes with the form, this handler will take care of it.
    e.preventDefault();
    if(form.name && form.prompt && form.photo){
      setLoading(true);
      try{
        const options={
          method:"POST",
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(form)
        }
          const response = await fetch("https://openai-image-generation-tool.onrender.com/api/v1/post",options);
          await response.json();
          navigate("/");
      }catch(err){
          alert(err);
      }finally{
        setLoading(false);
      }
    }
    else{
        alert('Please enter all the details')
    }
  }
  const handleChange = (event)=> {
    setForm({...form, [event.target.name]:event.target.value}) // THis wont work if no [] around event.traget.name => this .name has been defined in the FormField component down.
  }
  const handleSupriseMe = ()=> {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({...form, prompt:randomPrompt});
  }
  const generateImage = async ()=> {
      if(form.prompt){
        try{
          setGeneratingImage(true);
          const options={
            method:"POST",
            headers:{
              'Content-Type':'application/json'
            },
            body: JSON.stringify({prompt:form.prompt})
          }
          const response = await fetch("https://openai-image-generation-tool.onrender.com/api/v1/dalle",options);
          const data = await response.json();
          // console.log("I am hereeeeeeee ",data);
          setForm({...form, photo:`data:image/jpeg;base64,${data.photo}`})
        }catch(err){
            console.log("Error while generating Image: ",err);
        }finally{
          setGeneratingImage(false);
        }
      }else{
        alert("Please enter the prompt");
      }
  }
  return (
   <section className="max-w-7xl mx-auto">
      <div>
              <h1 className="font-extrabold text-[#222328] text-[32px]">
                 Create a new Image
              </h1>
              <p className="mt-2 text-[#c88329] text-[17px] max-w[500px]">
                Create mind blowing images through DALL-E AI's power.
              </p>
          </div>

          <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-5">
                <FormField
                    labelName = "Your name"
                    type = "text"
                    name = "name"
                    placeholder = "Yoyo"
                    value={form.name}
                    handleChange = {handleChange}
                />
                <FormField
                    labelName = "Prompt"
                    type = "text"
                    name = "prompt"
                    placeholder = "an astronaut lounging in a tropical resort in space, vaporwave"
                    value={form.prompt}
                    handleChange = {handleChange}
                    isSupriseMe          // passing this as paramter so that in prompt section, we can see the suprise me button.
                    handleSupriseMe = {handleSupriseMe}
                />
                <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:rig-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                      {form.photo ? (
                        <img src={form.photo} alt={form.prompt} 
                        className="w-full h-full object-contain"/>
                      ):(
                        <img src={preview} alt="preview" 
                        className="w-9/12 h-9/12 object-contain opacity-40"/>
                      )}

                      {generatingImage && (
                        <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                          <Loader />
                        </div>
                      )}
                </div>
              </div>

              <div className='mt-5 flex gap-5'>
                  <button type="button" onClick={generateImage} className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>
                      {generatingImage ? 'Generating...' : 'Generate'}
                  </button>
              </div>

              <div className="mt-10">
                <p className='mt-2 text-[#000102] text-[15px]'>Once created, you can share this with the community.</p>
                <button type="submit" className='mt-3 text-white bg-[#e0841b] font-medium rounded-md  w-full sm:w-auto px-5 py-2..5 text-center'>
                      Showcase it to World!
                </button>
              </div>
          </form>
   </section>
  )
}

export default CreatePost