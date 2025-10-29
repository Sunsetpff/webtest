import { useState, useEffect } from 'react';
import { MapPin, ShoppingCart, ExternalLink } from 'lucide-react';
import { supabase, type Retailer } from '../lib/supabase';

export default function WhereToBuy() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRetailers();
  }, []);

  const loadRetailers = async () => {
    const { data } = await supabase
      .from('retailers')
      .select('*')
      .eq('is_active', true)
      .order('display_order');

    if (data) setRetailers(data);
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
      <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading retailers...</div>
        </div>
      </div>
    );
  }

  const serbianRetailers = retailers.filter(r => r.country === 'Serbia');
  const internationalRetailers = retailers.filter(r => r.country !== 'Serbia');

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

        {serbianRetailers.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {serbianRetailers.map((retailer) => (
              <div
                key={retailer.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100 hover:border-green-200"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-700">{retailer.name.charAt(0)}</span>
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
        )}

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
              With {serbianRetailers.reduce((sum, r) => {
                const match = r.locations.match(/(\d+)\+/);
                return sum + (match ? parseInt(match[1]) : 0);
              }, 0)}+ retail locations across Serbia, you're never far from Fino Integrino products.
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
              onClick={() => scrollToSection('partnership')}
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

        {internationalRetailers.length > 0 && (
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              International Availability
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {Array.from(new Set(internationalRetailers.map(r => r.country))).map((country) => {
                const countryRetailers = internationalRetailers.filter(r => r.country === country);
                return (
                  <div key={country} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{country}</h4>
                      <p className="text-gray-600 mb-2">
                        Available through our distribution partners in major cities.
                      </p>
                      {countryRetailers.length > 0 && (
                        <ul className="text-sm text-gray-600 space-y-1">
                          {countryRetailers.map((retailer) => (
                            <li key={retailer.id}>• {retailer.name} - {retailer.locations}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
