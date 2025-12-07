import Background from "./components/Background";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import CodingStats from "./sections/CodingStats";
import { Navbar } from "./components/navbar"

function App() {
  return (
    <div className="relative min-h-screen text-white">
      <CustomCursor/>
      <Background />
      <Navbar/>
      
      <main className="relative z-10">
        <Hero/>
        <Projects/>
        <CodingStats/>
      </main>
    </div>
  );
}

export default App;
