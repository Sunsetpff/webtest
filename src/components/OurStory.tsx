import { Target, Eye, Award, Users } from 'lucide-react';

export default function OurStory() {
  return (
    <div className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Quality Through Actions
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Fino Integrino, we live by our motto: <strong className="text-amber-700">Acta Non Verba</strong> - Actions, Not Words.
              We don't just talk about quality and health; we demonstrate it through every product we create.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our commitment to carefully selected raw materials, innovative production processes, and unwavering
              dedication to nutritional excellence has made us a trusted partner for leading retailers across the region.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every ingredient is chosen with purpose. Every recipe is refined with care. Every product is crafted
              to inspire healthier living without compromising on taste.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/5855375/pexels-photo-5855375.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Quality Production"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-amber-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">
              To inspire healthier living by providing premium, nutritious food products that combine
              exceptional taste with uncompromising quality. We aim to make healthy choices accessible
              and enjoyable for everyone.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-amber-700" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To become the regional leader in healthy snack solutions, recognized for innovation,
              quality, and partnership excellence. We envision a future where healthy eating is
              the norm, not the exception.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-3xl p-8 md:p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Quality First</h4>
              <p className="text-amber-100 leading-relaxed">
                We never compromise on quality. From raw material selection to final packaging,
                excellence is our standard.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Social Responsibility</h4>
              <p className="text-amber-100 leading-relaxed">
                We're committed to sustainable practices and contributing positively to the communities
                we serve.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-3">Innovation</h4>
              <p className="text-amber-100 leading-relaxed">
                Continuous innovation in recipes, processes, and products keeps us at the forefront
                of the healthy food industry.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-700 mb-2">10+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-700 mb-2">3</div>
            <div className="text-gray-600">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-700 mb-2">15+</div>
            <div className="text-gray-600">Product Variants</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-700 mb-2">100%</div>
            <div className="text-gray-600">Natural</div>
          </div>
        </div>
      </div>
    </div>
  );
}
