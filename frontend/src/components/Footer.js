import React from 'react'

function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8 px-4">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">About Us</h3>
              <p className="text-sm">
                Our platform helps people crowdfund their dreams, projects, and causes. Join us in creating positive change by supporting a campaign today.
              </p>
            </div>
    
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/faq" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
    
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://th.bing.com/th/id/OIP.cOz92GK9w_2_VxUIWBL0ngHaHa?rs=1&pid=ImgDetMain" alt="Facebook" className="w-6 h-6 hover:opacity-75" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src="https://toppng.com/public/uploads/preview/twitter-x-icon-logo-116902890413xbfexhf8l.webp" alt="Twitter" className="w-6 h-6 hover:opacity-75" />
                </a>
                <a href="https://instagram.com/luckymaurya727" target="_blank" rel="noopener noreferrer">
                  <img src="https://th.bing.com/th/id/R.c5ad0581106cbcc8bb6e654d08362c0a?rik=HxhkLGdlB41KCQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fInstagram-Logo-PNG-Image.png&ehk=9tpsBD6oOcSKvZ4ZBZeY5FU8PhVUfMT4HJLDpJzk2yY%3d&risl=&pid=ImgRaw&r=0" alt="Instagram" className="w-6 h-6 hover:opacity-75" />
                </a>
                <a href="https://www.linkedin.com/in/gurudayal-maurya-971999242/" target="_blank" rel="noopener noreferrer">
                  <img src="https://static.vecteezy.com/system/resources/previews/021/460/490/original/linkedin-logo-free-download-free-png.png" alt="LinkedIn" className="w-10 h-10 -my-2 hover:opacity-75" />
                </a>
              </div>
            </div>
    
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Start a Campaign</h3>
              <p className="text-sm mb-4">Ready to make a difference? Start your campaign today and get the support you need to succeed.</p>
              <a 
                href="/services" 
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Start a Campaign
              </a>
            </div>
          </div>
    
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
            <p>&copy; 2024 Your Crowdfunding Platform. All rights reserved.</p>
          </div>
        </footer>
      );
    };


export default Footer
