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

/** Post-hero grain bed: replace the file at `public/grain-bg.mp4` (see `public/grain-bg-readme.txt`). */
const GRAIN_VIDEO_SRC = '/grain-bg.mp4';

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0">
        {/* Above grain bed: fixed full-viewport layers in the next sibling would cover the hero if z-index ties — keep hero/nav on top. */}
        <div className="relative z-[1] min-h-screen">
          <Navbar />
          <Hero />
        </div>

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
          {/* z-0: above grain via DOM order; keep below Navbar (root-level z-50) */}
          <div className="relative z-0">
            <About />

            <Projects />

            <Tech />

            <Contact />

            <Footer />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
