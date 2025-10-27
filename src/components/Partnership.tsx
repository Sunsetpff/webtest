import { Package, Truck, Globe, Mail, Phone, Building2, CheckCircle2 } from 'lucide-react';

export default function Partnership() {
  const capabilities = [
    {
      icon: Package,
      title: 'Private Label Manufacturing',
      description: 'Full private label (Robne Marke) production with your branding. Customize flavors, sizes, and packaging to match your brand identity.',
      features: ['Custom recipes', 'Flexible packaging', 'Small to large batches', 'Brand consultation']
    },
    {
      icon: Truck,
      title: 'Wholesale Distribution',
      description: 'Reliable wholesale supply for retailers and distributors. Consistent quality and on-time delivery guaranteed.',
      features: ['Competitive pricing', 'Flexible order volumes', 'Regular delivery schedules', 'Inventory support']
    },
    {
      icon: Globe,
      title: 'International Expansion',
      description: 'Proven track record in international markets. We support partners in Croatia, Slovenia, and expanding into new territories.',
      features: ['Export documentation', 'Market insights', 'Logistics support', 'Regional expertise']
    }
  ];

  const distributors = [
    { country: 'Serbia', partners: ['Idea', 'Univerexport', 'Gomex', 'DIS', 'Maxi'] },
    { country: 'Croatia', partners: ['Multiple regional distributors'] },
    { country: 'Slovenia', partners: ['Established distribution network'] }
  ];

  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            B2B Partnership Hub
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Grow Your Business with Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Partner with a proven leader in healthy food manufacturing. We offer comprehensive solutions
            for wholesale, distribution, and private label production.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {capabilities.map((capability, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <capability.icon className="w-7 h-7 text-green-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{capability.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{capability.description}</p>
              <ul className="space-y-3">
                {capability.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-3xl p-8 md:p-12 text-white mb-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Distribution Network</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {distributors.map((distributor, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Globe className="w-6 h-6" />
                  <h4 className="text-xl font-bold">{distributor.country}</h4>
                </div>
                <ul className="space-y-2">
                  {distributor.partners.map((partner, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-green-100">
                      <span className="w-1.5 h-1.5 bg-green-300 rounded-full"></span>
                      <span>{partner}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-green-100 text-lg">
            Join our growing network of successful partners across the region
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Let's Work Together</h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're interested in wholesale distribution, private label manufacturing, or
                exploring new market opportunities, we're here to help your business grow.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Email Us</div>
                    <a href="mailto:b2b@finointegrino.rs" className="text-green-700 hover:text-green-800">
                      b2b@finointegrino.rs
                    </a>
                    <div className="text-sm text-gray-600 mt-1">Response within 24 hours</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Call Us</div>
                    <a href="tel:+381234567890" className="text-green-700 hover:text-green-800">
                      +381 (0)23 456 7890
                    </a>
                    <div className="text-sm text-gray-600 mt-1">Monday - Friday, 9:00 - 17:00</div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-green-700" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">Visit Us</div>
                    <div className="text-gray-700">Fino Integrino d.o.o.</div>
                    <div className="text-gray-600">Novi Sad, Serbia</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Partnership Inquiry</h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition">
                      <option>Select your interest</option>
                      <option>Wholesale Distribution</option>
                      <option>Private Label Manufacturing</option>
                      <option>International Expansion</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent outline-none transition resize-none"
                      placeholder="Tell us about your business and partnership goals"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-800 transition-colors"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
