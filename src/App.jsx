

import NavBar from './Components/Nav/NavBar.jsx'
import Hero from './Components/Main/Hero.jsx'
import Banner from './Components/Banner/Banner.jsx'
import Footer from './Components/Footer/Footer.jsx'

export default function App() {
  return (
    <>
      <main className="overflow-x-hidden bg-[#020a51] text-dark p-10">
        <NavBar />
        <Hero /> 

        <Banner />
        <Footer />

      </main>
    </>
  );
}


