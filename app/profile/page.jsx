"use client";

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation"; // for navigation
import Profile from '@components/Profile';

const MyProfile = () => {

    const router = useRouter();
    // get the session data
    const {data:session} = useSession();
    const [posts, setPosts] = useState([]);

    // we create separate api endpoints for the handleEdit and handleDelete functions
    
    const handleEdit = (post) => {
        // call the PATCH api endpoint here
        router.push(`/update-prompt?id=${post._id}`);
    }

    // this function is ultimately passed on to the prompt card on the profile page
    const handleDelete = async (post) => {
        // call the DELETE api endpoint here

        // confirm deletion
        const hasConfirmed = confirm("Are you sure you want to delete the prompt?");
        console.log(hasConfirmed);
        if (hasConfirmed){
            // delete the prompt
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {method: 'DELETE'}); // call the api endpoint

                // filter out the deleted posts
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts); // set the posts state to update
            } catch (error) {
                console.log(error);
            }
        }
    }

    // fetch posts data from the api endpoint
    useEffect( () => {
        const fetchPosts = async () => {
          const response = await fetch(`api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }

        if (session?.user.id) {
            fetchPosts();
        }

      }, []);

    return (
    <Profile 
        name="My"
        desc="Your personal profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
    )
}

export default MyProfile