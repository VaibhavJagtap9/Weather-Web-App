// ModeProvider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

const ModeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    // Ensure that the component is mounted before rendering
    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ThemeProvider attribute="class" enableSystem={true} disableTransitionOnChange={true}>
            {/* Ensure UI is visible even during initial hydration */}
            <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.2s ease' }}>
                {children}
            </div>
        </ThemeProvider>
    );
};

export default ModeProvider;
