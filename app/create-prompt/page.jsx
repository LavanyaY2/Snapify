"use client";

import React from 'react'
import {useState} from 'react'
import { useSession } from 'next-auth/react'; // to track which user is currently logged in 
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    // function to create prompt
    const CreatePrompt = async (e) => {

    }

  return (
    <Form 
        type = 'Create'
        post = {post}
        setPost = {setPost}
        submitting = {submitting}
        handleSubmit = {CreatePrompt}
    />
  )
}

export default CreatePrompt