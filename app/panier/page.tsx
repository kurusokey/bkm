'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function PanierPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const handleCheckout = async () => {
    alert('Intégration Stripe Checkout à venir ! Le panier contient ' + cart.length + ' produit(s) pour un total de ' + (totalPrice / 100).toFixed(2) + ' €');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Votre panier est vide</h1>
        <p className="text-gray-600 mb-8">
          Découvrez nos rhums arrangés et ajoutez vos favoris au panier.
        </p>
        <Link
          href="/boutique"
          className="inline-block bg-amber-900 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition"
        >
          Découvrir nos produits
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Votre Panier</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Liste des produits */}
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => {
            const price = (item.price_cents / 100).toFixed(2);
            const total = ((item.price_cents * item.quantity) / 100).toFixed(2);

            return (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-200 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">🍹</span>
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{price} € l'unité</p>

                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        −
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 text-sm ml-auto"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-xl">{total} €</p>
                </div>
              </div>
            );
          })}

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Vider le panier
          </button>
        </div>

        {/* Récapitulatif */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span>{(totalPrice / 100).toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span className="text-green-600">Gratuite</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{(totalPrice / 100).toFixed(2)} €</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-amber-900 text-white py-3 rounded-lg hover:bg-amber-800 transition font-bold"
            >
              Passer la commande
            </button>

            <div className="bg-red-50 border-l-4 border-red-500 p-3 mt-4">
              <p className="text-red-800 text-xs font-semibold">
                ⚠️ L'abus d'alcool est dangereux pour la santé.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
