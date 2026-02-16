'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { getProductImage } from '@/lib/productImages';
import { useCart } from '@/context/CartContext';

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [animKey, setAnimKey] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isDragging = useRef(false);

  const product = products[currentIndex];
  const price = (product.price_cents / 100).toFixed(2);

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right') => {
      setDirection(dir);
      setCurrentIndex(index);
      setAnimKey((k) => k + 1);
    },
    [],
  );

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % products.length, 'right');
  }, [currentIndex, products.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + products.length) % products.length, 'left');
  }, [currentIndex, products.length, goTo]);

  const goToSlide = useCallback(
    (i: number) => {
      goTo(i, i > currentIndex ? 'right' : 'left');
    },
    [currentIndex, goTo],
  );

  // Keyboard navigation
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  // Touch / pointer handling
  const handlePointerDown = (e: React.PointerEvent) => {
    touchStartX.current = e.clientX;
    touchEndX.current = e.clientX;
    isDragging.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const handleAdd = (p: Product) => {
    addToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <section
      ref={carouselRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Collection de planteurs"
      tabIndex={0}
      className="outline-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'pan-y' }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Slide */}
        <div
          key={animKey}
          role="group"
          aria-roledescription="slide"
          aria-label={`${currentIndex + 1} sur ${products.length}`}
          className={
            direction === 'right'
              ? 'animate-carousel-in-right'
              : 'animate-carousel-in-left'
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Image */}
            <div className="relative h-[350px] sm:h-[400px] md:h-[550px] lg:h-[600px] bg-charcoal/50 border border-gold-muted/10 rounded-2xl overflow-hidden">
              <Image
                src={getProductImage(product.slug, product.image_url)}
                alt={product.name}
                fill
                className="object-contain p-8 md:p-12"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Info */}
            <div className="px-2 md:px-0">
              <span className="text-cream-muted/30 text-sm font-serif tracking-widest">
                N&deg;{String(currentIndex + 1).padStart(2, '0')}
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold mt-3 mb-5 tracking-wider">
                {product.name}
              </h2>

              {product.flavor && (
                <span className="inline-block bg-gold/10 border border-gold-muted/40 text-gold px-4 py-1.5 rounded-full text-sm font-serif tracking-wider mb-6">
                  {product.flavor}
                </span>
              )}

              <div className="gold-line mb-6" />

              <p className="text-cream/80 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>

              <div className="flex items-baseline gap-3 mb-10">
                <span className="text-3xl md:text-4xl font-semibold text-warm-white tracking-wide">
                  {price}&euro;
                </span>
                <span className="text-xs text-cream-muted/60 uppercase tracking-wider">
                  {product.volume || '70cl'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => handleAdd(product)}
                  className="btn-luxury-filled"
                >
                  {addedId === product.id ? 'Ajoute !' : 'Ajouter au panier'}
                </button>
                <Link
                  href={`/produits/${product.slug}`}
                  className="btn-luxury"
                >
                  Decouvrir
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Left */}
        <button
          onClick={goPrev}
          aria-label="Produit precedent"
          className="absolute left-0 md:left-2 top-[175px] sm:top-[200px] md:top-1/2 md:-translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-ink/60 backdrop-blur-sm border border-gold-muted/30 flex items-center justify-center text-gold hover:bg-gold/20 hover:border-gold/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Arrow Right */}
        <button
          onClick={goNext}
          aria-label="Produit suivant"
          className="absolute right-0 md:right-2 top-[175px] sm:top-[200px] md:top-1/2 md:-translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-ink/60 backdrop-blur-sm border border-gold-muted/30 flex items-center justify-center text-gold hover:bg-gold/20 hover:border-gold/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-3 mt-10">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goToSlide(i)}
            aria-label={`Voir ${p.name}`}
            aria-current={i === currentIndex ? 'true' : undefined}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === currentIndex
                ? 'bg-gold w-8'
                : 'bg-cream-muted/30 hover:bg-cream-muted/60 w-2.5'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
