import { useState, useEffect } from 'react';
import { supabase, type Product, type Retailer, type SiteImage, type HeroContent } from '../lib/supabase';
import { Upload, Save, Trash2, Plus, X, Image as ImageIcon } from 'lucide-react';

type TabType = 'hero' | 'products' | 'retailers' | 'images';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<TabType>('images');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Content Management System</h1>
            <p className="text-amber-100 text-sm mt-1">Manage website images, products, and retailers</p>
          </div>

          {message && (
            <div className={`mx-6 mt-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-800'}`}>
              {message.text}
            </div>
          )}

          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'images', label: 'Images', icon: ImageIcon },
                { id: 'hero', label: 'Hero Content', icon: Upload },
                { id: 'products', label: 'Products', icon: Plus },
                { id: 'retailers', label: 'Retailers', icon: Plus }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-amber-700 text-amber-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'images' && <ImagesManager showMessage={showMessage} />}
            {activeTab === 'hero' && <HeroManager showMessage={showMessage} />}
            {activeTab === 'products' && <ProductsManager showMessage={showMessage} />}
            {activeTab === 'retailers' && <RetailersManager showMessage={showMessage} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ImagesManager({ showMessage }: { showMessage: (type: 'success' | 'error', text: string) => void }) {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<SiteImage | null>(null);
  const [newImage, setNewImage] = useState({ name: '', url: '', alt_text: '', category: 'hero' });

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_images')
      .select('*')
      .order('category', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) {
      showMessage('error', 'Failed to load images');
    } else {
      setImages(data || []);
    }
    setLoading(false);
  };

  const handleAddImage = async () => {
    if (!newImage.name || !newImage.url) {
      showMessage('error', 'Name and URL are required');
      return;
    }

    const { error } = await supabase.from('site_images').insert([{
      name: newImage.name,
      url: newImage.url,
      alt_text: newImage.alt_text,
      category: newImage.category,
      display_order: images.filter(img => img.category === newImage.category).length
    }]);

    if (error) {
      showMessage('error', 'Failed to add image');
    } else {
      showMessage('success', 'Image added successfully');
      setNewImage({ name: '', url: '', alt_text: '', category: 'hero' });
      loadImages();
    }
  };

  const handleUpdateImage = async (image: SiteImage) => {
    const { error } = await supabase
      .from('site_images')
      .update({
        name: image.name,
        url: image.url,
        alt_text: image.alt_text,
        category: image.category
      })
      .eq('id', image.id);

    if (error) {
      showMessage('error', 'Failed to update image');
    } else {
      showMessage('success', 'Image updated successfully');
      setEditingImage(null);
      loadImages();
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    const { error } = await supabase.from('site_images').delete().eq('id', id);

    if (error) {
      showMessage('error', 'Failed to delete image');
    } else {
      showMessage('success', 'Image deleted successfully');
      loadImages();
    }
  };

  if (loading) return <div className="text-center py-8">Loading images...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Image</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Image Name"
            value={newImage.name}
            onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
          />
          <select
            value={newImage.category}
            onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
          >
            <option value="hero">Hero</option>
            <option value="product">Product</option>
            <option value="retailer">Retailer</option>
            <option value="story">Story</option>
          </select>
          <input
            type="url"
            placeholder="Image URL"
            value={newImage.url}
            onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none md:col-span-2"
          />
          <input
            type="text"
            placeholder="Alt Text (for accessibility)"
            value={newImage.alt_text}
            onChange={(e) => setNewImage({ ...newImage, alt_text: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none md:col-span-2"
          />
        </div>
        <button
          onClick={handleAddImage}
          className="mt-4 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Image</span>
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Images</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {images.map((image) => (
            <div key={image.id} className="bg-white border border-gray-200 rounded-lg p-4">
              {editingImage?.id === image.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingImage.name}
                    onChange={(e) => setEditingImage({ ...editingImage, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="url"
                    value={editingImage.url}
                    onChange={(e) => setEditingImage({ ...editingImage, url: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="text"
                    value={editingImage.alt_text}
                    onChange={(e) => setEditingImage({ ...editingImage, alt_text: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUpdateImage(editingImage)}
                      className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingImage(null)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
                    <img src={image.url} alt={image.alt_text} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1 mb-3">
                    <h4 className="font-semibold text-gray-900">{image.name}</h4>
                    <p className="text-xs text-gray-600">Category: {image.category}</p>
                    {image.alt_text && <p className="text-xs text-gray-500">Alt: {image.alt_text}</p>}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingImage(image)}
                      className="flex-1 bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="px-3 py-1.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroManager({ showMessage }: { showMessage: (type: 'success' | 'error', text: string) => void }) {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [heroRes, imagesRes] = await Promise.all([
      supabase.from('hero_content').select('*').eq('is_active', true).maybeSingle(),
      supabase.from('site_images').select('*').eq('category', 'hero')
    ]);

    if (heroRes.data) setHero(heroRes.data);
    if (imagesRes.data) setImages(imagesRes.data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!hero) return;

    const { error } = await supabase
      .from('hero_content')
      .update({
        headline: hero.headline,
        subheadline: hero.subheadline,
        image_id: hero.image_id,
        cta_primary_text: hero.cta_primary_text,
        cta_secondary_text: hero.cta_secondary_text
      })
      .eq('id', hero.id);

    if (error) {
      showMessage('error', 'Failed to update hero content');
    } else {
      showMessage('success', 'Hero content updated successfully');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!hero) return <div className="text-center py-8">No hero content found</div>;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
        <input
          type="text"
          value={hero.headline}
          onChange={(e) => setHero({ ...hero, headline: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subheadline</label>
        <textarea
          value={hero.subheadline}
          onChange={(e) => setHero({ ...hero, subheadline: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary CTA Text</label>
          <input
            type="text"
            value={hero.cta_primary_text}
            onChange={(e) => setHero({ ...hero, cta_primary_text: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secondary CTA Text</label>
          <input
            type="text"
            value={hero.cta_secondary_text}
            onChange={(e) => setHero({ ...hero, cta_secondary_text: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Hero Image</label>
        <select
          value={hero.image_id || ''}
          onChange={(e) => setHero({ ...hero, image_id: e.target.value || null })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
        >
          <option value="">Select an image</option>
          {images.map((img) => (
            <option key={img.id} value={img.id}>{img.name}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSave}
        className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2"
      >
        <Save className="w-4 h-4" />
        <span>Save Changes</span>
      </button>
    </div>
  );
}

function ProductsManager({ showMessage }: { showMessage: (type: 'success' | 'error', text: string) => void }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [productsRes, imagesRes] = await Promise.all([
      supabase.from('products').select('*').order('display_order'),
      supabase.from('site_images').select('*').eq('category', 'product')
    ]);

    if (productsRes.data) setProducts(productsRes.data);
    if (imagesRes.data) setImages(imagesRes.data);
    setLoading(false);
  };

  const handleUpdate = async (product: Product) => {
    const { error } = await supabase
      .from('products')
      .update({
        name: product.name,
        description: product.description,
        image_id: product.image_id,
        flavors: product.flavors,
        benefits: product.benefits,
        is_active: product.is_active
      })
      .eq('id', product.id);

    if (error) {
      showMessage('error', 'Failed to update product');
    } else {
      showMessage('success', 'Product updated successfully');
      setEditingProduct(null);
      loadData();
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-50 rounded-lg p-6">
          {editingProduct?.id === product.id ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editingProduct.name}
                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Product Name"
              />
              <textarea
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Description"
              />
              <select
                value={editingProduct.image_id || ''}
                onChange={(e) => setEditingProduct({ ...editingProduct, image_id: e.target.value || null })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Image</option>
                {images.map((img) => (
                  <option key={img.id} value={img.id}>{img.name}</option>
                ))}
              </select>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flavors (comma-separated)</label>
                <input
                  type="text"
                  value={editingProduct.flavors.join(', ')}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    flavors: e.target.value.split(',').map(f => f.trim()).filter(Boolean)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Benefits (comma-separated)</label>
                <input
                  type="text"
                  value={editingProduct.benefits.join(', ')}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    benefits: e.target.value.split(',').map(b => b.trim()).filter(Boolean)
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={editingProduct.is_active}
                  onChange={(e) => setEditingProduct({ ...editingProduct, is_active: e.target.checked })}
                  className="w-4 h-4 text-amber-700 focus:ring-amber-600 rounded"
                />
                <label className="text-sm text-gray-700">Active (visible on website)</label>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdate(editingProduct)}
                  className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${product.is_active ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Flavors:</span>
                  <p className="text-gray-600">{product.flavors.join(', ')}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Benefits:</span>
                  <p className="text-gray-600">{product.benefits.join(', ')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RetailersManager({ showMessage }: { showMessage: (type: 'success' | 'error', text: string) => void }) {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingRetailer, setEditingRetailer] = useState<Retailer | null>(null);
  const [newRetailer, setNewRetailer] = useState({ name: '', type: '', locations: '', country: 'Serbia' });

  useEffect(() => {
    loadRetailers();
  }, []);

  const loadRetailers = async () => {
    const { data } = await supabase.from('retailers').select('*').order('display_order');
    if (data) setRetailers(data);
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newRetailer.name || !newRetailer.type || !newRetailer.locations) {
      showMessage('error', 'All fields are required');
      return;
    }

    const { error } = await supabase.from('retailers').insert([{
      ...newRetailer,
      display_order: retailers.length
    }]);

    if (error) {
      showMessage('error', 'Failed to add retailer');
    } else {
      showMessage('success', 'Retailer added successfully');
      setNewRetailer({ name: '', type: '', locations: '', country: 'Serbia' });
      loadRetailers();
    }
  };

  const handleUpdate = async (retailer: Retailer) => {
    const { error } = await supabase
      .from('retailers')
      .update({
        name: retailer.name,
        type: retailer.type,
        locations: retailer.locations,
        country: retailer.country,
        is_active: retailer.is_active
      })
      .eq('id', retailer.id);

    if (error) {
      showMessage('error', 'Failed to update retailer');
    } else {
      showMessage('success', 'Retailer updated successfully');
      setEditingRetailer(null);
      loadRetailers();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this retailer?')) return;
    const { error } = await supabase.from('retailers').delete().eq('id', id);
    if (error) {
      showMessage('error', 'Failed to delete retailer');
    } else {
      showMessage('success', 'Retailer deleted successfully');
      loadRetailers();
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Retailer</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Retailer Name"
            value={newRetailer.name}
            onChange={(e) => setNewRetailer({ ...newRetailer, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Type (e.g., Supermarket Chain)"
            value={newRetailer.type}
            onChange={(e) => setNewRetailer({ ...newRetailer, type: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Locations (e.g., 100+ stores)"
            value={newRetailer.locations}
            onChange={(e) => setNewRetailer({ ...newRetailer, locations: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Country"
            value={newRetailer.country}
            onChange={(e) => setNewRetailer({ ...newRetailer, country: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Retailer</span>
        </button>
      </div>

      <div className="space-y-4">
        {retailers.map((retailer) => (
          <div key={retailer.id} className="bg-gray-50 rounded-lg p-4">
            {editingRetailer?.id === retailer.id ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingRetailer.name}
                  onChange={(e) => setEditingRetailer({ ...editingRetailer, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={editingRetailer.type}
                  onChange={(e) => setEditingRetailer({ ...editingRetailer, type: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={editingRetailer.locations}
                  onChange={(e) => setEditingRetailer({ ...editingRetailer, locations: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={editingRetailer.country}
                  onChange={(e) => setEditingRetailer({ ...editingRetailer, country: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingRetailer.is_active}
                    onChange={(e) => setEditingRetailer({ ...editingRetailer, is_active: e.target.checked })}
                    className="w-4 h-4 text-amber-700 rounded"
                  />
                  <label className="text-sm">Active</label>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdate(editingRetailer)}
                    className="flex-1 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingRetailer(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-900">{retailer.name}</h4>
                  <p className="text-sm text-gray-600">{retailer.type} • {retailer.locations}</p>
                  <p className="text-xs text-gray-500">{retailer.country}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${retailer.is_active ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                    {retailer.is_active ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    onClick={() => setEditingRetailer(retailer)}
                    className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(retailer.id)}
                    className="px-3 py-1 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
