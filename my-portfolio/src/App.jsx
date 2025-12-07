import Background from "./components/Background";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import CodingStats from "./sections/CodingStats";
import { Navbar } from "./components/navbar"

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-black">
      <CustomCursor/>
      <Background />
      
      {/* Vignette effect */}
      <div className="fixed inset-0 pointer-events-none z-[5] bg-gradient-radial from-transparent via-transparent to-black/60" />
      
      <div className="relative z-10">
        <Navbar/>
        <main>
          <Hero/>
          <Projects/>
          <CodingStats/>
        </main>
      </div>
    </div>
  );
}

export default App;
