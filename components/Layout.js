import React, { useEffect, useState } from 'react'
import Header from '@/pages/components/Header'
import Footer from '@/pages/components/Footer';
function Layout({children}) {
     const [isMenuOpen, setIsMenuOpen] = useState(false);
   
      const [isScrolled, setIsScrolled] = useState(false);
    
      
      useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);  
    
    
  return (
      <>
          <Header isScrolled={isScrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          <main>
              {children}
          </main>
           
          <Footer />

      </>
  )
}

export default Layout