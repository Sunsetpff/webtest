import { ArrowRight, ShoppingBag, Handshake } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-white to-green-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4 px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Acta Non Verba - Actions, Not Words
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Premium Healthy Food Solutions for Your Business
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Discover our range of integral breadsticks and oat bars. No added sugar, vegan-friendly,
              rich in fiber, and palm-free. Trusted by leading retailers across Serbia and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('partnership')}
                className="flex items-center justify-center space-x-2 bg-green-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-green-800 transition-all hover:shadow-lg"
              >
                <Handshake className="w-5 h-5" />
                <span>Partner with Us</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollToSection('buy')}
                className="flex items-center justify-center space-x-2 bg-white text-green-700 px-8 py-4 rounded-lg font-medium border-2 border-green-700 hover:bg-green-50 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Find Our Products</span>
              </button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-green-700">100%</div>
                <div className="text-sm text-gray-600 mt-1">Natural Ingredients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700">0g</div>
                <div className="text-sm text-gray-600 mt-1">Added Sugar</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-700">50+</div>
                <div className="text-sm text-gray-600 mt-1">Retail Partners</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-3xl shadow-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Healthy Food Products"
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Rich in</div>
                  <div className="font-bold text-gray-900">Fiber & Nutrients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>No Added Sugar</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Vegan Friendly</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Rich in Fiber</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Palm-Free</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✓</span>
              <span>Carefully Selected Ingredients</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
