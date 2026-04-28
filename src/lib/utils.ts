
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function calculateWPM(chars: number, seconds: number): number {
  if (seconds === 0) return 0;
  // Assume average word length of 5 chars
  const words = chars / 5;
  const minutes = seconds / 60;
  return Math.round(words / minutes);
}
