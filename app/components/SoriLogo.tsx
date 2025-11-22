'use client';

import { SoriCharacter } from './SoriCharacter';

export function SoriLogo({ className = '', size = 36 }: { className?: string; size?: number }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <SoriCharacter size={size} animated />
    </div>
  );
}

