import PromptCard from "./PromptCard";

import { gql, useQuery } from '@apollo/client';

const USER_QUERY = gql`
  query users {
    users {
      id
      email
      username
      image
    }
  }
`;

const Profile = ({name, desc, posts, handleEdit, handleDelete}) => {

  const {data, loading, error} = useQuery(USER_QUERY);

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>

      <p>Testing, {data?.users?.name}</p>

      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {posts.map((post) => (
          <PromptCard
          key={post.id}
          post={post}
          handleEdit={() => handleEdit && handleEdit(post)}
          handleDelete={() => handleDelete && handleDelete(post)} />
        ))}
      </div>

    </section>
  )
}

export default Profile;