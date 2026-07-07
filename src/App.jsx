import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
// import Cocktails from "./components/cocktails";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      {/* <Cocktails /> */}
    </main>
  )
}; 