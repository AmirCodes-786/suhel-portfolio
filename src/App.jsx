import { useState, lazy, Suspense, useCallback } from "react";
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
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Contact = lazy(() => import("./pages/Contact"));
const Resume = lazy(() => import("./pages/Resume"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));

// Preload high-probability routes during idle time for instant navigation
function preloadKeyRoutes() {
  const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 800));
  idle(() => {
    import("./pages/About");
    import("./pages/Projects");
    import("./pages/ProjectCaseStudy");
    import("./pages/Skills");
    import("./pages/Resume");
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
          <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
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
      <div className={`transition-opacity duration-300 ${hideNavbar ? "pointer-events-none opacity-0 select-none" : "opacity-100"}`}>
        <Navbar />
      </div>
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
    // Preload key route chunks in background after loader finishes
    preloadKeyRoutes();
  }, []);

  return (
    <BrowserRouter>
      {isLoading && <Loader onComplete={handleLoaderComplete} />}
      <CustomCursor />
      <Layout />
    </BrowserRouter>
  );
}
