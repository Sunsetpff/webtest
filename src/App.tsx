import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import OurStory from './components/OurStory';
import Partnership from './components/Partnership';
import WhereToBuy from './components/WhereToBuy';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="products">
          <Products />
        </section>
        <section id="story">
          <OurStory />
        </section>
        <section id="partnership">
          <Partnership />
        </section>
        <section id="buy">
          <WhereToBuy />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
