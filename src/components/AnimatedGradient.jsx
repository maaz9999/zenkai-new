import React from 'react';

/**
 * AnimatedGradient component recreates the organic orange, gold, pink,
 * and purple gradient appearance shown in the design references.
 * Features:
 * - Fluid mesh layers with blurred transitions matching the screenshots
 * - Seamless infinite drifting animation on GPU
 * - Tactile noise grain overlay
 * - Specialized presets for Pill, Banner, Craft Card, and Section backgrounds
 */
export default function AnimatedGradient({ 
  className = '', 
  children,
  variant = 'banner',
  rounded = '',
  style = {}
}) {
  return (
    <div 
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={style}
    >
      {/* Background base layer (only for variants that need solid base) */}
      {variant !== 'pill' && (
        <div className="absolute inset-0 bg-[#520F6B]" />
      )}

      {/* Variation specific color layouts matching screenshots */}
      {variant === 'pill' ? (
        /* Header Pill gradient matching exact reference (Image 1) */
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Base rich horizontal gradient sampled directly from reference */}
          <div 
            className="absolute inset-0"
            style={{ 
              background: 'linear-gradient(90deg, #7B2496 0%, #B5389E 4.5%, #EA3C77 9%, #F88A2E 18%, #F5BD66 34%, #FD7834 49%, #D83683 60%, #651D87 70%, #A8319B 84%, #882698 100%)' 
            }}
          />
          {/* Luminous Warm Gold center highlight with organic drift */}
          <div 
            className="absolute left-[18%] right-[36%] -top-8 -bottom-8 blur-[16px] sm:blur-[20px] opacity-80 animate-organic-1 transform-gpu"
            style={{ background: 'radial-gradient(ellipse at center, #FFD07A 0%, #FF8534 60%, transparent 100%)' }}
          />
          {/* Magenta / Violet fluid highlight */}
          <div 
            className="absolute right-[5%] w-[42%] -top-8 -bottom-8 blur-[18px] sm:blur-[22px] opacity-75 animate-organic-2 transform-gpu"
            style={{ background: 'radial-gradient(ellipse at center, #E83292 0%, #76189C 75%, transparent 100%)' }}
          />
        </div>
      ) : variant === 'statement' ? (
        /* Brand Statement Banner gradient exactly matching Image 1 */
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Base gradient with rich warm gold/orange dominance */}
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(120deg, #FFB848 0%, #FF7536 38%, #DE2288 72%, #580E6E 100%)' }}
          />
          {/* Luminous Warm Amber / Gold field across upper center-left */}
          <div 
            className="absolute -top-[20%] left-[5%] w-[80%] h-[100%] rounded-full blur-[28px] sm:blur-[70px] md:blur-[90px] opacity-95 animate-organic-1 transform-gpu"
            style={{ background: 'radial-gradient(ellipse at 40% 30%, #FFD670 0%, #FFA436 45%, #FF6428 75%, transparent 100%)' }}
          />
          {/* Hot Magenta right field */}
          <div 
            className="absolute -top-[10%] -right-[10%] w-[65%] h-[110%] rounded-full blur-[30px] sm:blur-[75px] md:blur-[95px] opacity-90 animate-organic-3 transform-gpu"
            style={{ background: 'radial-gradient(circle, #ED2892 0%, #A41EA8 65%, transparent 100%)' }}
          />
          {/* Deep Violet bottom-left fold */}
          <div 
            className="absolute -bottom-[20%] -left-[10%] w-[65%] h-[80%] rounded-full blur-[28px] sm:blur-[70px] opacity-90 animate-organic-2 transform-gpu"
            style={{ background: 'radial-gradient(circle, #78158F 0%, #46095A 75%, transparent 100%)' }}
          />
        </div>
      ) : variant === 'craft' ? (
        /* Our Craft Card gradient matching Screenshot 4 */
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Upper violet/purple field */}
          <div 
            className="absolute -top-[20%] -left-[10%] w-[120%] h-[80%] blur-[30px] sm:blur-[80px] opacity-95 animate-organic-2 transform-gpu"
            style={{ background: 'radial-gradient(ellipse at 50% 20%, #7E189E 0%, #4B0868 70%)' }}
          />
          {/* Lower fiery warm orange/gold glow */}
          <div 
            className="absolute -bottom-[25%] -left-[10%] w-[120%] h-[75%] blur-[28px] sm:blur-[75px] opacity-95 animate-organic-1 transform-gpu"
            style={{ background: 'radial-gradient(ellipse at 55% 90%, #FFB644 0%, #FF642E 50%, #DA2086 85%, transparent 100%)' }}
          />
        </div>
      ) : (
        /* General full-width banner / page background matching Screenshots 3 & 5 */
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Warm Amber / Gold core */}
          <div 
            className="absolute top-[5%] left-[25%] w-[55%] h-[65%] rounded-full blur-[30px] sm:blur-[80px] md:blur-[105px] opacity-90 animate-organic-1 transform-gpu"
            style={{ background: 'radial-gradient(circle, #FFC15C 0%, #FF7338 60%, transparent 100%)' }}
          />
          {/* Deep Violet left flank */}
          <div 
            className="absolute -top-[10%] -left-[10%] w-[65%] h-[100%] rounded-full blur-[32px] sm:blur-[90px] md:blur-[120px] opacity-90 animate-organic-2 transform-gpu"
            style={{ background: 'radial-gradient(circle, #8A1DA9 0%, #4B0868 75%, transparent 100%)' }}
          />
          {/* Hot Magenta right flank */}
          <div 
            className="absolute top-[20%] -right-[15%] w-[65%] h-[90%] rounded-full blur-[30px] sm:blur-[80px] md:blur-[110px] opacity-85 animate-organic-3 transform-gpu"
            style={{ background: 'radial-gradient(circle, #DE1A89 0%, #7E189E 70%, transparent 100%)' }}
          />
          {/* Bottom warm orange glow */}
          <div 
            className="absolute -bottom-[15%] left-[10%] w-[80%] h-[55%] rounded-full blur-[30px] sm:blur-[80px] opacity-80 transform-gpu"
            style={{ background: 'radial-gradient(circle, #FF8438 0%, #FF5A22 60%, transparent 100%)' }}
          />
        </div>
      )}

      {/* Tactile Noise/Grain texture overlay */}
      <div className="grain-overlay" />

      {/* Content wrapper */}
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
}
