import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">

        <h1 className="head_text text-center">
            Moments that Move
            <br className="max-md:hidden"/>
            <scan className="purple_gradient text-center"> Stories that Shine </scan>
        </h1>

        <p className="desc text-center">
          A canvas for your life's best moments - express, explore and connect
        </p>

        {/* Feed section of the homepage */}
        <Feed/>

    </section>
    
  )
}

export default Home