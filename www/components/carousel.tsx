'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface CarouselProps {
  title: string
  viewMoreHref?: string
  children: ReactNode
  className?: string
}

export function Carousel({ title, viewMoreHref, children, className = '' }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollPosition()
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition)
      window.addEventListener('resize', checkScrollPosition)
      return () => {
        scrollElement.removeEventListener('scroll', checkScrollPosition)
        window.removeEventListener('resize', checkScrollPosition)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth
      const scrollAmount = containerWidth * 0.8
      const newScrollPosition = direction === 'left'
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount
      scrollRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' })
    }
  }

  return (
    <section className={`py-10 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
          <div className="flex items-center gap-4">
            {viewMoreHref && (
              <Link href={viewMoreHref} className="text-sm text-neutral-600 hover:underline hidden sm:block">
                Ver mais
              </Link>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-8 h-8 border rounded-full flex items-center justify-center transition ${
                  canScrollLeft
                    ? 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                    : 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                }`}
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-8 h-8 border rounded-full flex items-center justify-center transition ${
                  canScrollRight
                    ? 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
                    : 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                }`}
                aria-label="Proximo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
      </div>
    </section>
  )
}

interface CarouselItemProps {
  children: ReactNode
  className?: string
}

export function CarouselItem({ children, className = '' }: CarouselItemProps) {
  return (
    <div className={`flex-shrink-0 snap-start ${className}`}>
      {children}
    </div>
  )
}
