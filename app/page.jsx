import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">

        <h1 className="head_text text-center">
            Discover and Share
            <br className="max-md:hidden"/>
            <scan className="orange_gradient text-center"> AI-Powered Prompts </scan>
        </h1>

        <p className="desc text-center">
            Promptly is an AI-prompting tool to discover, create and share AI prompts.
        </p>

        {/* Feed section of the homepage */}
        <Feed/>

    </section>
  )
}

export default Home