"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

// creating the PromptCardList component - a local component to this file
const PromptCardList = ({data, handleTagClick}) => {
  // the data prop consists of the 'posts'
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
        key={post.id}
        post={post}
        handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {

  // declare use state
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e) => {

  }

  // fetch data from the api endpoint
  useEffect( () => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();

      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (

    <div className="pt-10">

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg overflow-hidden shadow-lg border slide-in-1">
          <img className="w-full h-full object-cover " src="/assets/images/image_1.jpg" />
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg border slide-in-2">
          <img className="w-full h-full object-cover" src="/assets/images/image_2.jpg" />
        </div>
        <div className="rounded-lg overflow-hidden shadow-lg border slide-in-3">
          <img className="w-full h-full object-cover" src="/assets/images/image_3.jpg" />
        </div>
      </div>

      <p className="typing-animation text-3xl font-bold mt-10 font-satoshi blue_gradient w-full">Catch up on what's new...</p>

      <section className="feed">

      
      {/* <form className="relative w-full flex-center">

        <input 
          type="test" 
          placeholder="Search for a tag or a username" 
          value={searchText} 
          onChange={handleSearchChange} 
          required 
          className="search_input peer"
        />

      </form> */}

      <PromptCardList 
        data = {posts}
        handleTagClick= {() => {}}
      />

      </section>
    </div>



  )
}

export default Feed;