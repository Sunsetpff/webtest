import { MapPin, ShoppingCart, ExternalLink } from 'lucide-react';

export default function WhereToBuy() {
  const retailers = [
    {
      name: 'Idea',
      type: 'Supermarket Chain',
      locations: '200+ stores nationwide',
      logo: 'https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'Univerexport',
      type: 'Supermarket Chain',
      locations: '150+ stores nationwide',
      logo: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'Gomex',
      type: 'Retail Chain',
      locations: '100+ stores nationwide',
      logo: 'https://images.pexels.com/photos/1005638/pexels-photo-1005638.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'Maxi',
      type: 'Hypermarket Chain',
      locations: '80+ stores nationwide',
      logo: 'https://images.pexels.com/photos/1797428/pexels-photo-1797428.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'DIS',
      type: 'Discount Chain',
      locations: '120+ stores nationwide',
      logo: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'Tempo',
      type: 'Supermarket Chain',
      locations: '90+ stores nationwide',
      logo: 'https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'Aman',
      type: 'Retail Chain',
      locations: '60+ stores nationwide',
      logo: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    },
    {
      name: 'Roda',
      type: 'Supermarket Chain',
      locations: '50+ stores nationwide',
      logo: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Where to Buy Our Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find Fino Integrino products at leading retail chains across Serbia. Available in the healthy snacks
            and organic food sections.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {retailers.map((retailer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 hover:border-green-200"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 overflow-hidden">
                <img
                  src={retailer.logo}
                  alt={retailer.name}
                  className="w-full h-full object-cover mix-blend-multiply opacity-60"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{retailer.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{retailer.type}</p>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-green-700" />
                <span>{retailer.locations}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">In-Store Availability</h3>
            <p className="text-gray-600 leading-relaxed">
              Visit your nearest retailer and look for our products in the healthy snacks or organic food aisles.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Nationwide Coverage</h3>
            <p className="text-gray-600 leading-relaxed">
              With 800+ retail locations across Serbia, you're never far from Fino Integrino products.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-8 h-8 text-green-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Growing Network</h3>
            <p className="text-gray-600 leading-relaxed">
              We're constantly expanding our retail presence. Check back regularly for new locations.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Can't Find Us in Your Store?
          </h3>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Let your local retailer know you'd like to see Fino Integrino products on their shelves.
            Customer requests make a difference!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const element = document.getElementById('partnership');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              Retailer Partnerships
            </button>
            <a
              href="mailto:info@finointegrino.rs"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-500 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            International Availability
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Croatia</h4>
                <p className="text-gray-600">
                  Available through our distribution partners in major Croatian cities. Expanding coverage across the region.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Slovenia</h4>
                <p className="text-gray-600">
                  Growing presence through established distribution networks. Contact us for specific retailer information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
