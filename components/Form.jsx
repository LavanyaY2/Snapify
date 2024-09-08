import React from 'react';
import Link from 'next/link';
import Image from "next/image";  // optimized image tag from nextjs

// all of the form fields are accepted as props in the Form component
const Form = (
  { type,
    post, 
    setPost,
    submitting,
    handleSubmit }
) => {


  // handle image upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPost({...post, myFile: base64});
  }

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>

      <p className='desc text-left max-w-md'>
      Snap, share, and spark connections in every frame - Share your story with the world!
      </p>

      <form onSubmit={handleSubmit}
      className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>

        <input 
          type='file'
          lable='Image'
          name='myFile'
          id='file-upload'
          accept='.jpeg, .png, .jpg'
          onChange={(e) => handleFileUpload(e)}
        />

        {post.myFile ? (
          <label>
            <Image src={post.myFile} width={500} height={500} className="rounded-md object-contain" />
          </label>
        ) : (<label></label>)}
        
        
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>What's on your mind today?</span>
          
          <textarea 
            value={post.prompt}
            onChange={ (e) => setPost( { ...post, prompt: e.target.value } ) }
            placeholder='Type here...'
            required
            className='form_textarea' 
          />

        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {` `}
            <span className='font-normal'>
              (#nature, #fashion, #design)
            </span>
          </span>

          <input 
            value={post.tag}
            onChange={ (e) => setPost( { ...post, tag: e.target.value } ) }
            placeholder='#tag...'
            required
            className='form_input' 
          />

        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>
            Cancel
          </Link>

          <button type='submit'
          disabled={submitting}
          className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}...` : type}
          </button>

        </div>

      </form>
    </section>
  )
}

export default Form


// function to convert image to base64
function convertToBase64 (file){
  return new Promise ((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}