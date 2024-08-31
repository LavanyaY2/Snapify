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

    <section className="feed">
      <form className="relative w-full flex-center">

        <input 
          type="test" 
          placeholder="Search for a tag or a username" 
          value={searchText} 
          onChange={handleSearchChange} 
          required 
          className="search_input peer"
        />

      </form>

      <PromptCardList 
        data = {posts}
        handleTagClick= {() => {}}
      />

    </section>

  )
}

export default Feed;