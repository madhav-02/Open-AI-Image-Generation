import React from 'react'
import { useState, useEffect } from 'react';
import { Form } from 'react-router-dom';
import {Card, Loader, FormField} from "../components"

const RenderCards = ({data, title}) => {       // This is a func component with props data,title
  if(data && data.length > 0 ){
    return data.map((post) => <Card key={post._id} {...post}/>);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  )
}
const Home = () => {
  const [loading,setLoading] = useState(false);     // for the loading component
  const [posts, setPosts] = useState(null);        // For user generated post previosuly
  const [searchText, setSearchText] = useState('') // For filetering images.
  const [searchedPosts,setSearchedPosts] = useState(null);
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    setTimeout(()=>{
        const searchResults = posts.filter((post)=>{
          return post.name.toLowerCase().includes(searchText.toLowerCase())   || post.prompt.toLowerCase().includes(searchText.toLowerCase());
        });
        console.log("Resutls are: ",searchResults);
        setSearchedPosts(searchResults);
    },500);
    // const searchResults = posts.filter((post)=>{
    //   return post.name.toLowerCase().includes(searchText.toLowerCase())   || post.prompt.toLowerCase().includes(searchText.toLowerCase());
    // });
    // console.log("Resutls are: ",searchResults);
    // setSearchedPosts(searchResults);
   
  }
  useEffect(()=>{

    const fetchPosts = async ()=>{
        setLoading(true);
        try{
            const options = {
              method:"GET",
              headers:{
                'Content-Type':'application/json'
              }
            }
            const response = await fetch("https://openai-image-generation-tool.onrender.com/api/v1/post",options);
            if(response.ok){
              const result = await response.json();
              setPosts(result.data.reverse()); // reverse because we want newest ones first.
            }

        }catch(err){
            console.log("Error : ",err);
            alert(err);
        }finally{
          setLoading(false);
        }
    }
    fetchPosts();
  },[]);
  return (
      <section className="max-w-7xl mx-auto ">
          <div>
              <h1 className="font-extrabold text-[#222328] text-[32px]">
                  Welcome to OpenAI's Image Generation Tool.
              </h1>
              <p className="mt-2 text-[#c88329] text-[17px] max-w[500px]">
                Explore a collection of imaginative, immersive and visually stunning images generated using the power of DALL-E AI.
              </p>
          </div>

          <div className="mt-16">
              <FormField labelName="Search Posts" type="text" name="text" placeholder="Search Posts" value={searchText} handleChange={handleSearchChange} spellcheck="false"/>
          </div>

          <div className="mt-10">   
            {
                  loading ? (
                      <div className="flex justify center items center">
                        <Loader />
                      </div>
                  ) : (
                      <>
                      {searchText && (
                        <h2 className="font-medium text-[#c88329] text-xl mb-3">
                            Showing results for : <span className="text-[#222328]">{searchText}</span>
                        </h2>
                      )}

                      <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1">
                          {
                            searchText ? (
                              <RenderCards 
                                data = {searchedPosts}
                                title = "No search results found."
                              />
                            ) :
                            (
                              <RenderCards
                                data = {posts}
                                title = "No posts found."
                              />
                            )
                          }
                      </div>
                      </>
                  )
                
            }
          </div>
      </section>
  )
}

export default Home