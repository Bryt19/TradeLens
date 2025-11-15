import React, { useEffect, useRef, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import {
  BarChart3,
  Globe,
  Shield,
  Database,
  Zap,
  TrendingUp,
  Newspaper,
  Code,
  Smartphone,
} from 'lucide-react';

interface BentoItemProps {
  className?: string;
  children: ReactNode;
}

const BentoItem = ({ className, children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty('--mouse-x', `${x}px`);
      item.style.setProperty('--mouse-y', `${y}px`);
    };

    item.addEventListener('mousemove', handleMouseMove);

    return () => {
      item.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={itemRef} className={cn('bento-item', className)}>
      {children}
    </div>
  );
};

interface CyberneticBentoGridProps {
  className?: string;
}

export const CyberneticBentoGrid = ({ className }: CyberneticBentoGridProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="w-full mx-auto z-10">
        <div className="bento-grid">
          <BentoItem className="col-span-2 row-span-2 flex flex-col justify-between">
            <div>
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Real-time Market Data
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Monitor cryptocurrency and stock prices with up-to-the-second data streams and comprehensive market analysis.
              </p>
            </div>
            <div className="mt-4 h-48 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-lg overflow-hidden border border-blue-500/20 dark:border-blue-500/30 relative">
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Real-time market data visualization"
                className="w-full h-full object-cover opacity-80 dark:opacity-60"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BarChart3 className="w-16 h-16 text-white/80 dark:text-white/60 drop-shadow-lg" />
              </div>
            </div>
          </BentoItem>

          <BentoItem>
            <Globe className="w-6 h-6 text-blue-400 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Global Coverage
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Access markets worldwide with support for multiple currencies and exchanges.
            </p>
          </BentoItem>

          <BentoItem>
            <Shield className="w-6 h-6 text-blue-400 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Secure & Private
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Bank-grade security with encrypted data transmission and secure API keys.
            </p>
          </BentoItem>

          <BentoItem className="row-span-2">
            <Database className="w-6 h-6 text-blue-400 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Portfolio Management
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Track your investments with detailed analytics, performance metrics, and risk assessment.
            </p>
          </BentoItem>

          <BentoItem className="col-span-2">
            <Code className="w-6 h-6 text-blue-400 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              API Integration
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Powerful REST API and WebSocket feeds for developers. Integrate market data seamlessly into your applications.
            </p>
          </BentoItem>

          <BentoItem>
            <Newspaper className="w-6 h-6 text-blue-400 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              News & Analysis
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Stay informed with the latest market news, expert analysis, and sentiment indicators.
            </p>
          </BentoItem>

          <BentoItem>
            <Zap className="w-6 h-6 text-blue-400 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              High Performance
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Optimized for speed with sub-second data updates and lightning-fast chart rendering.
            </p>
          </BentoItem>

          <BentoItem>
            <Smartphone className="w-6 h-6 text-blue-400 mb-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Mobile Responsive
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Access your trading dashboard anywhere with our fully responsive mobile-optimized interface.
            </p>
          </BentoItem>
        </div>
      </div>
    </div>
  );
};

