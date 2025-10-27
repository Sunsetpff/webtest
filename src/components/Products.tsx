import { Leaf, Heart, ShieldCheck, Wheat } from 'lucide-react';

export default function Products() {
  const products = [
    {
      name: 'Integral Breadsticks',
      description: 'Crunchy, wholesome breadsticks made with 100% integral flour. Perfect for snacking or pairing with your favorite dips.',
      image: 'https://images.pexels.com/photos/1775283/pexels-photo-1775283.jpeg?auto=compress&cs=tinysrgb&w=800',
      flavors: ['Classic', 'Sesame', 'Rosemary', 'Multi-grain'],
      benefits: ['No Added Sugar', 'High Fiber', 'Vegan', 'Palm-Free']
    },
    {
      name: 'Oat Bars - Classic',
      description: 'Nutritious oat bars that deliver sustained energy without the sugar crash. Made with premium oats and natural ingredients.',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800',
      flavors: ['Natural Oat', 'Honey & Nuts', 'Dark Chocolate', 'Cranberry'],
      benefits: ['No Added Sugar', 'Rich in Fiber', 'Vegan', 'Clean Label']
    },
    {
      name: 'Oat Bars - Premium',
      description: 'Our premium line featuring exotic flavors and superfoods. Crafted for health-conscious consumers seeking exceptional taste.',
      image: 'https://images.pexels.com/photos/7262775/pexels-photo-7262775.jpeg?auto=compress&cs=tinysrgb&w=800',
      flavors: ['Matcha Green Tea', 'Coconut & Mango', 'Blueberry', 'Protein Plus'],
      benefits: ['No Added Sugar', 'Superfood Ingredients', 'Vegan', 'High Protein']
    }
  ];

  const benefitIcons = {
    'No Added Sugar': Heart,
    'High Fiber': Wheat,
    'Vegan': Leaf,
    'Palm-Free': ShieldCheck,
    'Rich in Fiber': Wheat,
    'Clean Label': ShieldCheck,
    'Superfood Ingredients': Leaf,
    'High Protein': Heart
  };

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
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
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

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Available Flavors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                        {flavor}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                  <div className="space-y-2">
                    {product.benefits.map((benefit, idx) => {
                      const Icon = benefitIcons[benefit as keyof typeof benefitIcons] || ShieldCheck;
                      return (
                        <div key={idx} className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-green-700" />
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

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Custom Solutions Available</h3>
              <p className="text-lg text-gray-700 mb-6">
                We offer private label manufacturing with customizable flavors, sizes, and packaging.
                Perfect for retailers looking to expand their healthy snack offerings.
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById('partnership');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-green-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
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
