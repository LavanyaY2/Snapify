"use client";

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router'; // for navigation
import Profile from '@components/Profile';

const MyProfile = () => {
    
    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }

    // get the session data
    const {data:session} = useSession();
    const [posts, setPosts] = useState("");

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