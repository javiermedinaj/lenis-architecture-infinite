import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';

const HeroSection = () => {
  const [percentage, setPercentage] = useState(0);
  const scrollInfoRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      infinite: true,
      smoothWheel: true,
    });

    lenis.on('scroll', ({ scroll, limit }) => {
      const newPercentage = (scroll / limit) * 100;
      setPercentage(newPercentage.toFixed(0));
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="heroSection">
      <Nav />
      <Main percentage={percentage} />
    </div>
  );
};

const Nav = () => (
  <div className="nav">
    <div className="nav_wrapper">
      <div className="navLogo">
        <img src="./j-removebg-preview.png" alt="" style={{ width: '50px', height: '50px' }} />
      </div>
      <div className="nav_extra">
        <span>Case Study</span>
      </div>
    </div>
  </div>
);

const Main = ({ percentage }) => (
  <main className="main">
    <div className="section">
      <div className="section_wrapper">
        <SectionCol />
        <SectionColInfo percentage={percentage} />
      </div>
    </div>
  </main>
);

const SectionCol = () => (
  <div className="section_col">
    <div className="section_col_container">
      {Array.from({ length: 6 }, (_, i) => (
        <img
          key={i}
          src={`/0${i + 1}.jpg`}
          alt=""
          className="section_col_container_image"
        />
      ))}
    </div>
    <div className="section_col_container --clone">
      <img src="./media/01.jpg" alt="" className="section_col_container_image" />
    </div>
  </div>
);

const SectionColInfo = ({ percentage }) => (
  <div className="section_col">
    <div className="section_col_container1">
      <div className="section_col_heading">
        <h1>Fine Architecture</h1>
      </div>
      <div className="section_col_description">
        <div className="section_col_info">
          <span>
            This inspiring architectural project showcases modern design principles. Explore the innovative use of light and space through stunning visuals.
          </span>
        <ul className="section_col_role" style={{ paddingTop: '1rem', paddingLeft: '1rem' }}>
          <li>Architecture</li>
          <li>Interior Design</li>
        </ul>
        </div>
        
      </div>
      <div className="section_col_link">
        <h2>View Project</h2>
      </div>
      <div className="section_col_scroll">
        <span>{percentage}%</span>
      </div>
    </div>
  </div>
);

export default HeroSection;