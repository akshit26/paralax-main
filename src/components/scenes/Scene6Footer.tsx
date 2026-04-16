"use client";

import ProximityHtml from "../ProximityHtml";

/* ═══════════════════════════════════════════
   SCENE 6 — FOOTER  (z = -295 → -340)
   Ground-level footer with links,
   social icons, copyright
   ═══════════════════════════════════════════ */

export default function Scene6Footer() {
  return (
    <group>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, -320]}>
        <planeGeometry args={[80, 60]} />
        <meshBasicMaterial color="#1a3a10" />
      </mesh>

      {/* Footer HTML overlay — only visible near the bottom */}
      <ProximityHtml position={[0, 2, -315]} targetZ={-315} range={35} distanceFactor={14}>
        <div className="footer-wrapper">
          <div className="footer-content">
            <div className="footer-col">
              <h3 className="footer-heading">Name</h3>
              <p className="footer-text">Crafting experiences<br />out of this world ✨</p>
            </div>
            <div className="footer-col">
              <h3 className="footer-heading">Explore</h3>
              <ul className="footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Work</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h3 className="footer-heading">Connect</h3>
              <div className="footer-social">
                <a href="#" className="social-icon">𝕏</a>
                <a href="#" className="social-icon">in</a>
                <a href="#" className="social-icon">📷</a>
                <a href="#" className="social-icon">▶</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Name · Made with 🍕 and a lot of scrolling</p>
          </div>
        </div>
      </ProximityHtml>
    </group>
  );
}
