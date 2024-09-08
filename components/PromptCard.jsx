"use client";
import { useState } from "react";
import Image from "next/image";  // optimized image tag from nextjs
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { userAgentFromString } from "next/server";

const PromptCard = ({post, handleTagClick, handleEdit, handleDelete}) => {

  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt); // what does this do?
    // reset the state after a certain time periods
    setTimeout( () => setCopied(""), 3000);
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image 
            src={post.creator.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain" 
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>

          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image src={copied === post.prompt ? 
            '/assets/icons/tick.svg' : '/assets/icons/copy.svg'
          }
          width={12} height={12} />
        </div>

      </div>

      <div className="sm:flex hidden mt-5 flex-center container-sm rounded-md overflow-hidden shadow-md border">
        <Image 
          src={post.myFile}
          alt="posted image"
          width={500}
          height={500}
        />
      </div>

      <p className="my-4 font-satoshi text-md text-gray-700">{post.prompt}</p>
      <p className="font-inter text-md blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )}

    </div>
  )
}

export default PromptCard;