import { useState, lazy, Suspense, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";

// Lazy load pages for performance — code-split per route
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Education = lazy(() => import("./pages/Education"));
const Skills = lazy(() => import("./pages/Skills"));
const Projects = lazy(() => import("./pages/Projects"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Contact = lazy(() => import("./pages/Contact"));
const Resume = lazy(() => import("./pages/Resume"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));

// Preload all routes in background during idle time for instant navigation
function preloadAllRoutes() {
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
  idle(() => {
    import("./pages/Home");
    import("./pages/About");
    import("./pages/Education");
    import("./pages/Skills");
    import("./pages/Projects");
    import("./pages/Achievements");
    import("./pages/Contact");
  });
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense
        fallback={
          <div className="page-section">
            <div className="w-6 h-6 border-2 border-dark/20 border-t-dark/60 rounded-full animate-spin" />
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/education" element={<Education />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/resume" || location.pathname === "/coming-soon";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="h-full">
        <AnimatedRoutes />
      </main>
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoaderComplete = useCallback(() => {
    setIsLoading(false);
    // Preload all route chunks in background after loader finishes
    preloadAllRoutes();
  }, []);

  return (
    <BrowserRouter>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <CustomCursor />
      <Layout />
    </BrowserRouter>
  );
}
