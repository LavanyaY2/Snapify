"use client";

import React from 'react'
import {useState} from 'react'
import { useSession } from 'next-auth/react'; // to track which user is currently logged in 
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const UpdatePrompt = () => {

    // get router
    const router = useRouter();
    // get session data
    const {data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',

        // add the image
        myFile: '',
    });


    // function to create prompt
    const UpdatePrompt = async (e) => {
        e.preventDefault(); // prevents default behavior of the browser (i.e. preventing a reload)
        setSubmitting(true); // submitting the form

        // the '?' is the 'optional chaining operator' in javascript - usually used to prevent runtime errors
        // creating the prompt
        try {            

            // calling the api we will create
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag,
                    myFile: post.myFile,
                })
            }); 

            // check response
            if (response.ok) {
                router.push("/");
            }

        } catch (error){
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }


  return (
    <div>
        <Form 
          type = 'Update'
          post = {post}
          setPost = {setPost}
          submitting = {submitting}
          handleSubmit = {UpdatePrompt}
        />

    </div>
    
  )
}

export default UpdatePrompt