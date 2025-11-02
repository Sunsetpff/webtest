import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">FI</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Fino Integrino</h3>
                <p className="text-xs text-amber-400">Acta Non Verba</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium healthy food solutions for retailers and distributors. Quality through actions.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-amber-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('products')} className="hover:text-amber-400 transition-colors">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('story')} className="hover:text-amber-400 transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('partnership')} className="hover:text-amber-400 transition-colors">
                  Partner with Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('buy')} className="hover:text-amber-400 transition-colors">
                  Where to Buy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">B2B Services</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-amber-400 transition-colors cursor-pointer">
                Wholesale Distribution
              </li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">
                Private Label Manufacturing
              </li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">
                International Expansion
              </li>
              <li className="hover:text-amber-400 transition-colors cursor-pointer">
                Custom Solutions
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:b2b@finointegrino.rs" className="hover:text-amber-400 transition-colors">
                  b2b@finointegrino.rs
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+381234567890" className="hover:text-amber-400 transition-colors">
                  +381 (0)23 456 7890
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Novi Sad, Serbia</span>
              </li>
            </ul>

            <div className="flex space-x-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Fino Integrino d.o.o. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400">
              <button className="hover:text-amber-400 transition-colors">Privacy Policy</button>
              <button className="hover:text-amber-400 transition-colors">Terms of Service</button>
              <button className="hover:text-amber-400 transition-colors">Cookie Policy</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
