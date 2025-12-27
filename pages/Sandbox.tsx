import React, { useState } from 'react';
import SEO from '../components/Layout/SEO';
import CardShowcase from '../components/Cards/CardShowcase';
import Background3D from '../components/Layout/Background3D';
import LightningEffect from '../components/Layout/LightningEffect';

const Sandbox: React.FC = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [showLightning, setShowLightning] = useState(false);

  return (
    <main>
      <SEO title="Sandbox" description="Komponent-playground för utveckling" />

      <CardShowcase />

      {/* Optional: Background Effects Toggle */}
      <section className="relative py-12 bg-dark-900/50">
        <div className="container mx-auto px-4 lg:px-12">
          <div className="flex items-center gap-6 mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showBackground} 
                onChange={(e) => setShowBackground(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="font-medium text-white/80">Background3D</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showLightning} 
                onChange={(e) => setShowLightning(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <span className="font-medium text-white/80">LightningEffect</span>
            </label>
          </div>

          {(showBackground || showLightning) && (
            <div className="relative border border-white/10 rounded-lg p-8 min-h-[200px] bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-sm">
              <div className="mb-4 text-sm text-white/50">Render area — effects positioned absolutely</div>

              {showBackground && <Background3D />}
              {showLightning && <LightningEffect />}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Sandbox;
