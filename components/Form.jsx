import React from 'react';
import Link from 'next/link';

// all of the form fields are accepted as props in the Form component
const Form = (
  { type,
    post, 
    setPost,
    submitting,
    handleSubmit }
) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>Create Post</span>
      </h1>

      <p className='desc text-left max-w-md'>
        {type} and share prompts with everyone and be creative with AI-powered platforms!
      </p>

      <form onSubmit={handleSubmit}
      className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI prompt</span>
          <textarea value={post.prompt}
          onChange={}

        </label>

      </form>
    </section>
  )
}

export default Form