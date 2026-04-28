
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TYPING_TEXTS } from '../constants';
import { calculateWPM } from '../lib/utils';
import { TestMode, TypingStats } from '../types';

export function useTypingTest(mode: TestMode) {
  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState<TypingStats>({ wpm: 0, accuracy: 0, chars: 0, errors: 0, timestamp: 0 });
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const duration = parseInt(mode);

  const reset = useCallback(() => {
    const randomText = TYPING_TEXTS[Math.floor(Math.random() * TYPING_TEXTS.length)];
    setText(randomText);
    setUserInput('');
    setTimeLeft(duration);
    setIsActive(false);
    setIsFinished(false);
    setStats({ wpm: 0, accuracy: 0, chars: 0, errors: 0, timestamp: 0 });
    if (timerRef.current) clearInterval(timerRef.current);
  }, [duration]);

  useEffect(() => {
    reset();
  }, [reset]);

  const start = () => {
    setIsActive(true);
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          finish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finish = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Calculate final stats
    const totalChars = userInput.length;
    let errors = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== text[i]) errors++;
    }
    
    const accuracy = totalChars > 0 ? Math.max(0, Math.round(((totalChars - errors) / totalChars) * 100)) : 100;
    const finalWpm = calculateWPM(totalChars - errors, duration);
    
    setStats({
      wpm: finalWpm,
      accuracy,
      chars: totalChars,
      errors,
      timestamp: Date.now()
    });
  }, [userInput, text, duration]);

  const audioContext = useRef<AudioContext | null>(null);

  const playTypingSound = useCallback(() => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const osc = audioContext.current.createOscillator();
    const gain = audioContext.current.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400 + Math.random() * 100, audioContext.current.currentTime);
    
    gain.gain.setValueAtTime(0.05, audioContext.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(audioContext.current.destination);
    
    osc.start();
    osc.stop(audioContext.current.currentTime + 0.05);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isActive && val.length > 0) {
      start();
    }
    
    if (val.length <= text.length) {
      // Play sound only if it's a new character
      if (val.length > userInput.length) {
        playTypingSound();
      }
      
      setUserInput(val);
      
      // Auto finish if text complete
      if (val.length === text.length) {
        finish();
      }
    }
  };

  return {
    text,
    userInput,
    timeLeft,
    isActive,
    isFinished,
    stats,
    handleInput,
    reset
  };
}
