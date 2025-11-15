import React, { useState, useRef, useEffect } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

interface NavItem {
  label: string
  id: string
  href: string
}

interface PillBaseProps {
  navItems: NavItem[]
  onItemClick?: (href: string) => void
  theme?: 'light' | 'dark'
}

/**
 * 3D Adaptive Navigation Pill
 * Smart navigation with scroll detection and hover expansion
 */
export const PillBase: React.FC<PillBaseProps> = ({ navItems, onItemClick, theme = 'light' }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Get active section from current pathname
  const getActiveSection = () => {
    const currentPath = location.pathname
    const activeItem = navItems.find(item => item.href === currentPath)
    return activeItem?.id || navItems[0]?.id || 'home'
  }

  const [activeSection, setActiveSection] = useState(getActiveSection())

  // Update active section when route changes
  useEffect(() => {
    setActiveSection(getActiveSection())
  }, [location.pathname, navItems])

  // Spring animations for smooth motion
  const pillWidth = useSpring(110, { stiffness: 220, damping: 25, mass: 1 })
  const pillShift = useSpring(0, { stiffness: 220, damping: 25, mass: 1 })

  // Handle hover expansion
  useEffect(() => {
    if (hovering) {
      setExpanded(true)
      pillWidth.set(450)
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false)
        pillWidth.set(100)
      }, 600)
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [hovering, pillWidth])

  const handleMouseEnter = () => {
    setHovering(true)
  }

  const handleMouseLeave = () => {
    setHovering(false)
  }

  const handleSectionClick = (item: NavItem) => {
    // Trigger transition state
    setIsTransitioning(true)
    setActiveSection(item.id)

    // Use custom handler if provided, otherwise navigate
    if (onItemClick) {
      onItemClick(item.href)
    } else {
      navigate(item.href)
    }

    // Collapse the pill after selection
    setHovering(false)

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false)
    }, 400)
  }

  const activeItem = navItems.find(item => item.id === activeSection)

  return (
    <motion.nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-full"
      style={{
        width: pillWidth,
        height: '46px',
        background: theme === 'dark'
          ? `
            linear-gradient(135deg, 
              #000000 0%, 
              #0a0a0a 15%, 
              #0f0f0f 30%, 
              #141414 45%, 
              #0a0a0a 60%, 
              #050505 75%, 
              #0a0a0a 90%, 
              #000000 100%
            )
          `
          : `
            linear-gradient(135deg, 
              #ffffff 0%, 
              #fafafa 15%, 
              #f5f5f5 30%, 
              #f0f0f0 45%, 
              #fafafa 60%, 
              #f5f5f5 75%, 
              #fafafa 90%, 
              #ffffff 100%
            )
          `,
        boxShadow: expanded
          ? `
            0 2px 4px rgba(0, 0, 0, 0.08),
            0 6px 12px rgba(0, 0, 0, 0.12),
            0 12px 24px rgba(0, 0, 0, 0.14),
            0 24px 48px rgba(0, 0, 0, 0.10),
            inset 0 2px 2px rgba(255, 255, 255, 0.8),
            inset 0 -3px 8px rgba(0, 0, 0, 0.12),
            inset 3px 3px 8px rgba(0, 0, 0, 0.10),
            inset -3px 3px 8px rgba(0, 0, 0, 0.09),
            inset 0 -1px 2px rgba(0, 0, 0, 0.08)
          `
          : isTransitioning
          ? `
            0 3px 6px rgba(0, 0, 0, 0.10),
            0 8px 16px rgba(0, 0, 0, 0.08),
            0 16px 32px rgba(0, 0, 0, 0.06),
            0 1px 2px rgba(0, 0, 0, 0.10),
            inset 0 2px 1px rgba(255, 255, 255, 0.85),
            inset 0 -2px 6px rgba(0, 0, 0, 0.08),
            inset 2px 2px 8px rgba(0, 0, 0, 0.06),
            inset -2px 2px 8px rgba(0, 0, 0, 0.05),
            inset 0 0 1px rgba(0, 0, 0, 0.12),
            inset 0 0 20px rgba(255, 255, 255, 0.15)
          `
          : `
            0 3px 6px rgba(0, 0, 0, 0.12),
            0 8px 16px rgba(0, 0, 0, 0.10),
            0 16px 32px rgba(0, 0, 0, 0.08),
            0 1px 2px rgba(0, 0, 0, 0.12),
            inset 0 2px 1px rgba(255, 255, 255, 0.7),
            inset 0 -2px 6px rgba(0, 0, 0, 0.10),
            inset 2px 2px 8px rgba(0, 0, 0, 0.08),
            inset -2px 2px 8px rgba(0, 0, 0, 0.07),
            inset 0 0 1px rgba(0, 0, 0, 0.15)
          `,
        x: pillShift,
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease-out',
      }}
    >
      {/* Primary top edge ridge - ultra bright */}
      <div 
        className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 5%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 1) 85%, rgba(255, 255, 255, 0.95) 95%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(0.3px)',
        }}
      />
      
      {/* Top hemisphere light catch */}
      <div 
        className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
        style={{
          height: '55%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.10) 60%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
      
      {/* Directional light - top left */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 20%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0) 65%)',
        }}
      />
      
      {/* Premium gloss reflection - main */}
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          left: expanded ? '18%' : '15%',
          top: '16%',
          width: expanded ? '110px' : '48px',
          height: '11px',
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.10) 70%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(4px)',
          transform: 'rotate(-12deg)',
          transition: 'all 0.3s ease',
        }}
      />
      
      {/* Secondary gloss accent - only show when expanded */}
      {expanded && (
        <div 
          className="absolute rounded-full pointer-events-none"
          style={{
            right: '22%',
            top: '20%',
            width: '64px',
            height: '8px',
            background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.15) 60%, rgba(255, 255, 255, 0) 100%)',
            filter: 'blur(3px)',
            transform: 'rotate(8deg)',
          }}
        />
      )}
      
      {/* Left edge illumination - only show when expanded */}
      {expanded && (
        <div 
          className="absolute inset-y-0 left-0 rounded-l-full pointer-events-none"
          style={{
            width: '35%',
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.10) 40%, rgba(255, 255, 255, 0.03) 70%, rgba(255, 255, 255, 0) 100%)',
          }}
        />
      )}
      
      {/* Right edge shadow - only show when expanded */}
      {expanded && (
        <div 
          className="absolute inset-y-0 right-0 rounded-r-full pointer-events-none"
          style={{
            width: '35%',
            background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.02) 70%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
      )}
      
      {/* Bottom curvature - deep shadow */}
      <div 
        className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.08) 25%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      {/* Bottom edge contact shadow */}
      <div 
        className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
        style={{
          height: '20%',
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0) 100%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Inner diffuse glow */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.22)',
          opacity: 0.7,
        }}
      />
      
      {/* Micro edge definition */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.10)',
        }}
      />

      {/* Navigation items container */}
      <div 
        ref={containerRef}
        className="relative z-10 h-full flex items-center justify-center px-4"
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro", Poppins, sans-serif',
        }}
      >
        {/* Collapsed state - show only active section with smooth text transitions */}
        {!expanded && (
          <div className="flex items-center relative">
            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.span
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                  transition={{
                    duration: 0.35,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  style={{
                    fontSize: '14px',
                    fontWeight: 680,
                    color: theme === 'dark' ? '#e5e5e5' : '#1a1a1a',
                    letterSpacing: '0.4px',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    textShadow: theme === 'dark'
                      ? `
                        0 1px 0 rgba(0, 0, 0, 0.8),
                        0 -1px 0 rgba(255, 255, 255, 0.1),
                        1px 1px 0 rgba(0, 0, 0, 0.5),
                        -1px 1px 0 rgba(0, 0, 0, 0.4)
                      `
                      : `
                        0 1px 0 rgba(0, 0, 0, 0.35),
                        0 -1px 0 rgba(255, 255, 255, 0.8),
                        1px 1px 0 rgba(0, 0, 0, 0.18),
                        -1px 1px 0 rgba(0, 0, 0, 0.15)
                      `,
                  }}
                >
                  {activeItem.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Expanded state - show all sections with stagger */}
        {expanded && (
          <div className="flex items-center justify-evenly w-full">
            {navItems.map((item, index) => {
              const isActive = item.id === activeSection
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ 
                    delay: index * 0.08,
                    duration: 0.25,
                    ease: 'easeOut'
                  }}
                  onClick={() => handleSectionClick(item)}
                  className="relative cursor-pointer transition-all duration-200"
                  style={{
                    fontSize: isActive ? '14px' : '13.5px',
                    fontWeight: isActive ? 680 : 510,
                    color: isActive 
                      ? (theme === 'dark' ? '#e5e5e5' : '#1a1a1a')
                      : (theme === 'dark' ? '#a0a0a0' : '#656565'),
                    textDecoration: 'none',
                    letterSpacing: '0.4px',
                    background: 'transparent',
                    border: 'none',
                    padding: '8px 12px',
                    outline: 'none',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", Poppins, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    transform: isActive ? 'translateY(-1.5px)' : 'translateY(0)',
                    textShadow: isActive 
                      ? (theme === 'dark'
                        ? `
                          0 1px 0 rgba(0, 0, 0, 0.8),
                          0 -1px 0 rgba(255, 255, 255, 0.1),
                          1px 1px 0 rgba(0, 0, 0, 0.5),
                          -1px 1px 0 rgba(0, 0, 0, 0.4)
                        `
                        : `
                          0 1px 0 rgba(0, 0, 0, 0.35),
                          0 -1px 0 rgba(255, 255, 255, 0.8),
                          1px 1px 0 rgba(0, 0, 0, 0.18),
                          -1px 1px 0 rgba(0, 0, 0, 0.15)
                        `)
                      : (theme === 'dark'
                        ? `
                          0 1px 0 rgba(0, 0, 0, 0.6),
                          0 -1px 0 rgba(255, 255, 255, 0.05),
                          1px 1px 0 rgba(0, 0, 0, 0.4),
                          -1px 1px 0 rgba(0, 0, 0, 0.3)
                        `
                        : `
                          0 1px 0 rgba(0, 0, 0, 0.22),
                          0 -1px 0 rgba(255, 255, 255, 0.65),
                          1px 1px 0 rgba(0, 0, 0, 0.12),
                          -1px 1px 0 rgba(0, 0, 0, 0.10)
                        `),
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = theme === 'dark' ? '#c0c0c0' : '#3a3a3a'
                      e.currentTarget.style.transform = 'translateY(-0.5px)'
                      e.currentTarget.style.textShadow = theme === 'dark'
                        ? `
                          0 1px 0 rgba(0, 0, 0, 0.7),
                          0 -1px 0 rgba(255, 255, 255, 0.08),
                          1px 1px 0 rgba(0, 0, 0, 0.45),
                          -1px 1px 0 rgba(0, 0, 0, 0.35)
                        `
                        : `
                          0 1px 0 rgba(0, 0, 0, 0.28),
                          0 -1px 0 rgba(255, 255, 255, 0.72),
                          1px 1px 0 rgba(0, 0, 0, 0.15),
                          -1px 1px 0 rgba(0, 0, 0, 0.12)
                        `
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = theme === 'dark' ? '#a0a0a0' : '#656565'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.textShadow = theme === 'dark'
                        ? `
                          0 1px 0 rgba(0, 0, 0, 0.6),
                          0 -1px 0 rgba(255, 255, 255, 0.05),
                          1px 1px 0 rgba(0, 0, 0, 0.4),
                          -1px 1px 0 rgba(0, 0, 0, 0.3)
                        `
                        : `
                          0 1px 0 rgba(0, 0, 0, 0.22),
                          0 -1px 0 rgba(255, 255, 255, 0.65),
                          1px 1px 0 rgba(0, 0, 0, 0.12),
                          -1px 1px 0 rgba(0, 0, 0, 0.10)
                        `
                    }
                  }}
                >
                  {item.label}
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </motion.nav>
  )
}

