import React from 'react';

export const MobileShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-sm h-full shadow-none mobile-safe-top mobile-safe-bottom">
        {children}
      </div>
    </div>
  );
};
