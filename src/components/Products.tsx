import { useState, useEffect } from 'react';

interface ProductItem {
  name: string;
  description: string;
  image: string;
}

interface ProductsContent {
  title: string;
  description: string;
  items: ProductItem[];
}

export default function Products() {
  const [products, setProducts] = useState<ProductsContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/content/products.json');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
    setLoading(false);
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{products?.title || 'Our Product Range'}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {products?.description || 'Carefully crafted products that combine exceptional taste with premium nutritional value. Each product is made with carefully selected ingredients and manufactured to the highest standards.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products?.items.map((product, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
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
