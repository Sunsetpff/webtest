import { useState, useEffect } from 'react';
import { Leaf, Heart, ShieldCheck, Wheat } from 'lucide-react';
import { supabase, type Product, type SiteImage } from '../lib/supabase';

export default function Products() {
  const [products, setProducts] = useState<(Product & { image?: SiteImage })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (productsData) {
      const productsWithImages = await Promise.all(
        productsData.map(async (product) => {
          if (product.image_id) {
            const { data: imageData } = await supabase
              .from('site_images')
              .select('*')
              .eq('id', product.image_id)
              .maybeSingle();

            return { ...product, image: imageData || undefined };
          }
          return product;
        })
      );
      setProducts(productsWithImages);
    }
    setLoading(false);
  };

  const benefitIcons: Record<string, typeof Heart> = {
    'No Added Sugar': Heart,
    'High Fiber': Wheat,
    'Vegan': Leaf,
    'Palm-Free': ShieldCheck,
    'Rich in Fiber': Wheat,
    'Clean Label': ShieldCheck,
    'Superfood Ingredients': Leaf,
    'High Protein': Heart
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Product Range</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Carefully crafted products that combine exceptional taste with premium nutritional value.
            Each product is made with carefully selected ingredients and manufactured to the highest standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={product.image?.url || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={product.image?.alt_text || product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Available Flavors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor, idx) => (
                      <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                  <div className="space-y-2">
                    {product.benefits.map((benefit, idx) => {
                      const Icon = benefitIcons[benefit] || ShieldCheck;
                      return (
                        <div key={idx} className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-amber-700" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Custom Solutions Available</h3>
              <p className="text-lg text-gray-700 mb-6">
                We offer private label manufacturing with customizable flavors, sizes, and packaging.
                Perfect for retailers looking to expand their healthy snack offerings.
              </p>
              <button
                onClick={() => scrollToSection('partnership')}
                className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Learn About Private Label
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl mb-2">🏭</div>
                <div className="text-sm text-gray-600">Modern Production</div>
                <div className="text-xl font-bold text-gray-900">Facility</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl mb-2">🔬</div>
                <div className="text-sm text-gray-600">Quality</div>
                <div className="text-xl font-bold text-gray-900">Certified</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl mb-2">🌍</div>
                <div className="text-sm text-gray-600">International</div>
                <div className="text-xl font-bold text-gray-900">Distribution</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-3xl mb-2">📦</div>
                <div className="text-sm text-gray-600">Custom</div>
                <div className="text-xl font-bold text-gray-900">Packaging</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
