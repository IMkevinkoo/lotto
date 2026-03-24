/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Sparkles, Trophy } from 'lucide-react';

export default function App() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateNumbers = useCallback(() => {
    setIsGenerating(true);
    setNumbers([]);

    // Simulate a "drawing" effect
    setTimeout(() => {
      const newNumbers: number[] = [];
      while (newNumbers.length < 6) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!newNumbers.includes(num)) {
          newNumbers.push(num);
        }
      }
      setNumbers(newNumbers.sort((a, b) => a - b));
      setIsGenerating(false);
    }, 800);
  }, []);

  const getBallColors = (num: number) => {
    if (num <= 10) return { bg: 'bg-[#facc15]', text: 'text-[#facc15]', shadow: 'shadow-yellow-900/20' };
    if (num <= 20) return { bg: 'bg-[#1d4ed8]', text: 'text-[#1d4ed8]', shadow: 'shadow-blue-900/20' };
    if (num <= 30) return { bg: 'bg-[#dc2626]', text: 'text-[#dc2626]', shadow: 'shadow-red-900/20' };
    if (num <= 40) return { bg: 'bg-[#171717]', text: 'text-[#facc15]', shadow: 'shadow-black/20' };
    return { bg: 'bg-[#059669]', text: 'text-[#059669]', shadow: 'shadow-green-900/20' };
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="bg-[#0f172a] p-10 text-center relative overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-10 -right-10 text-white"
          >
            <Trophy size={200} />
          </motion.div>
          
          <h1 className="text-white text-4xl font-black tracking-tighter flex items-center justify-center gap-3 italic">
            <Sparkles className="text-yellow-400 fill-yellow-400" />
            LOTTO 6/45
          </h1>
          <p className="text-slate-500 mt-3 text-xs uppercase tracking-[0.4em] font-bold">
            Official Drawing Simulation
          </p>
        </div>

        {/* Content */}
        <div className="p-10 flex flex-col items-center gap-12">
          <div className="flex flex-wrap justify-center gap-5 min-h-[120px] items-center">
            <AnimatePresence mode="popLayout">
              {numbers.length > 0 ? (
                numbers.map((num, idx) => {
                  const colors = getBallColors(num);
                  return (
                    <motion.div
                      key={`${num}-${idx}`}
                      initial={{ 
                        scale: 0, 
                        rotate: -720,
                        y: -100,
                        opacity: 0 
                      }}
                      animate={{ 
                        scale: 1, 
                        rotate: 0,
                        y: 0,
                        opacity: 1 
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 120, 
                        damping: 12,
                        delay: idx * 0.15,
                        duration: 0.8
                      }}
                      className="relative"
                    >
                      {/* Real-life Lotto Ball Design */}
                      <div className={`
                        w-16 h-16 sm:w-20 sm:h-20 rounded-full 
                        ${colors.bg}
                        flex items-center justify-center 
                        shadow-[inset_-6px_-6px_12px_rgba(0,0,0,0.3),inset_6px_6px_12px_rgba(255,255,255,0.2),0_15px_30px_-10px_rgba(0,0,0,0.4)]
                        relative overflow-hidden
                      `}>
                        {/* Multiple Number Squares (Real Pattern) */}
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 p-1 gap-1 rotate-12 scale-110">
                          {[0, 1, 2, 3].map((i) => (
                            <div 
                              key={i} 
                              className="bg-black rounded-sm flex items-center justify-center overflow-hidden"
                            >
                              <span className={`${colors.text} text-[10px] sm:text-[12px] font-black leading-none`}>
                                {num < 10 ? `0${num}` : num}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Center Number (Main Focus) */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                           <div className="bg-black w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center shadow-lg border border-white/10">
                              <span className={`${colors.text} text-base sm:text-xl font-black leading-none`}>
                                {num < 10 ? `0${num}` : num}
                              </span>
                           </div>
                        </div>
                        
                        {/* Surface Shine */}
                        <div className="absolute top-2 left-4 w-6 h-3 bg-white/20 rounded-full blur-[2px] rotate-[-25deg] z-20" />
                      </div>
                      
                      {/* Ground Shadow */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.3, scale: 1 }}
                        transition={{ delay: (idx * 0.15) + 0.3 }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-3 bg-black rounded-full blur-lg z-0"
                      />
                    </motion.div>
                  );
                })
              ) : (
                !isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-slate-300 text-center flex flex-col items-center gap-4"
                  >
                    <div className="w-20 h-20 rounded-full border-4 border-dashed border-slate-200 flex items-center justify-center">
                      <Trophy className="opacity-10" size={40} />
                    </div>
                    <p className="font-bold tracking-widest text-slate-400 uppercase text-xs">Awaiting Draw</p>
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {isGenerating && (
              <div className="flex gap-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      opacity: [0.2, 1, 0.2],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="w-5 h-5 bg-slate-200 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98, translateY: 0 }}
            onClick={generateNumbers}
            disabled={isGenerating}
            className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 transition-all shadow-2xl relative overflow-hidden group ${
              isGenerating 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-[#0f172a] text-white hover:bg-black active:shadow-inner'
            }`}
          >
            {!isGenerating && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              />
            )}
            <RefreshCw className={`w-7 h-7 ${isGenerating ? 'animate-spin' : ''}`} />
            {numbers.length > 0 ? 'START NEW DRAW' : 'DRAW NUMBERS'}
          </motion.button>
        </div>

        {/* Legend */}
        <div className="px-10 pb-12">
          <div className="flex justify-between items-center px-4">
            {[
              { range: '1-10', color: 'bg-[#facc15]' },
              { range: '11-20', color: 'bg-[#1d4ed8]' },
              { range: '21-30', color: 'bg-[#dc2626]' },
              { range: '31-40', color: 'bg-[#171717]' },
              { range: '41-45', color: 'bg-[#059669]' },
            ].map((item) => (
              <div key={item.range} className="flex flex-col items-center gap-2">
                <div className={`w-4 h-4 rounded-full ${item.color} shadow-md border border-white/10`} />
                <span className="text-[10px] font-black text-slate-400 tracking-tight">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.p 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="mt-12 text-slate-400 text-xs font-black tracking-[0.5em] uppercase"
      >
        Official Drawing Simulation
      </motion.p>
    </div>
  );
}
