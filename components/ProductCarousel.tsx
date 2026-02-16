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
      <div className="relative max-w-lg mx-auto px-12 sm:px-16">
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
          <div className="text-center">
            {/* Image */}
            <Link href={`/produits/${product.slug}`} className="block">
              <div className="relative h-[350px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden mx-auto">
                <Image
                  src={getProductImage(product.slug, product.image_url)}
                  alt={product.name}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 640px) 100vw, 480px"
                />
              </div>
            </Link>

            {/* Name */}
            <h2 className="font-serif text-2xl sm:text-3xl text-gold mt-8 mb-4 tracking-wider">
              {product.name}
            </h2>

            {/* Price */}
            <p className="text-xl font-semibold text-warm-white tracking-wide mb-8">
              {price}&euro;
            </p>

            {/* Add to cart */}
            <button
              onClick={() => handleAdd(product)}
              className="btn-luxury-filled"
            >
              {addedId === product.id ? 'Ajouté !' : 'Ajouter au panier'}
            </button>
          </div>
        </div>

        {/* Arrow Left */}
        <button
          onClick={goPrev}
          aria-label="Produit precedent"
          className="absolute left-0 top-[175px] sm:top-[210px] md:top-[240px] z-10 w-10 h-10 rounded-full flex items-center justify-center text-cream-muted/50 hover:text-gold transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Arrow Right */}
        <button
          onClick={goNext}
          aria-label="Produit suivant"
          className="absolute right-0 top-[175px] sm:top-[210px] md:top-[240px] z-10 w-10 h-10 rounded-full flex items-center justify-center text-cream-muted/50 hover:text-gold transition-colors duration-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2.5 mt-10">
        {products.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goToSlide(i)}
            aria-label={`Voir ${p.name}`}
            aria-current={i === currentIndex ? 'true' : undefined}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === currentIndex
                ? 'bg-gold w-6'
                : 'bg-cream-muted/20 hover:bg-cream-muted/40 w-2'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
