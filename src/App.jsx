import { BrowserRouter } from 'react-router-dom';
import {
  About,
  Contact,
  Footer,
  Hero,
  Navbar,
  Tech,
  Projects,
} from './components';

const GRAIN_VIDEO_SRC = '/grain-bg.mp4';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0">
        {/* ===== HERO & NAV ===== */}
        <div className="relative z-[1] min-h-screen">
          <Navbar />
          <Hero />

          {/* H1 for SEO, visually hidden */}
          <h1 className="sr-only">Genald – Filmmaker Portfolio</h1>
        </div>

        {/* ===== BACKGROUND LAYERS ===== */}
        <div className="relative z-0">
          <div
            className="pointer-events-none fixed inset-0 z-0 bg-[#0a0a0a]"
            aria-hidden
          />
          <video
            className="pointer-events-none fixed inset-0 z-0 h-full w-full object-cover opacity-50"
            autoPlay
            muted
            loop
            playsInline
            src={GRAIN_VIDEO_SRC}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* ===== PAGE CONTENT ===== */}
          <div className="relative z-0">
            {/* H2 for About section */}
            <h2 className="sr-only">About</h2>
            <About />

            {/* H2 for Projects section */}
            <h2 className="sr-only">Projects</h2>
            <Projects />

            {/* H2 for Tech section */}
            <h2 className="sr-only">Tech</h2>
            <Tech />

            {/* H2 for Contact section */}
            <h2 className="sr-only">Contact</h2>
            <Contact />

            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;