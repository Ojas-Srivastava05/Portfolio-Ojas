import Background from "./components/Background";
import CustomCursor from "./components/CustomCursor";
import Hero from "./sections/Hero";
import { Navbar } from "./components/navbar"



function App() {
  return (
    

    <div className="relative min-h-screen text-white">
      {/* Cool animated background */}
      <CustomCursor/>
      <Background />
      <Hero/>
      <Navbar/>
      {/* Your actual page content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-center">
          Ojas Srivastava
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-slate-300 text-center max-w-xl">
          Building stylish, animated web experiences with React.
        </p>
      </main>
    </div>
  );
}

export default App;
