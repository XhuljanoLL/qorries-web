import { BrowserRouter } from 'react-router-dom';
import {
  About,
  Contact,
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
        <Navbar />
        <div className="relative z-[1]">
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
            <div className="bg-flashWhite/72">
              <About />
            </div>

            <div className="bg-black/45 pb-10">
              <Tech />
            </div>

            <div className="bg-black/35">
              <Projects />
            </div>

            <div className="bg-black/35 pb-16">
              <Contact />
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
