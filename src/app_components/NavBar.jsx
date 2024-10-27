import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Feather } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton, SignUpButton, } from '@clerk/clerk-react'
import { useAuth } from '@clerk/clerk-react'

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { userId } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
          setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);
  
    return (
        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled ? "bg-gray-900/80 backdrop-blur-md" : "bg-transparent"
          }`}
        >
          <nav className="container mx-auto px-4 sm:px-8 py-4 sm:py-6">
            <div className="flex flex-wrap justify-between items-center max-w-6xl mx-auto">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <Feather className="w-8 h-8 text-amber-400" />
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    MagicQuill
                  </span>
                </Link>
              </div>
              <button
                className="sm:hidden text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              <div
                className={`w-full sm:w-auto ${
                  isMenuOpen ? "block" : "hidden"
                } sm:block mt-4 sm:mt-0`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
                  {["Docs", "Todo"].map((item) => (
                    <Link
                      key={item}
                      to={`/${item.toLowerCase()}`}
                      className="text-gray-300 hover:text-amber-200 transition-colors py-2 sm:py-0 relative group"
                    >
                      {item}
                      <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </Link>
                  ))}
                      {userId && (
                <Link
                to="/generate"
                className="text-gray-300 hover:text-amber-200 transition-colors py-2 sm:py-0 relative group"
              >
                Dashboard
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              )}
              <SignedOut>
              <SignInButton
                    mode="modal"
                  >
                    
                  <button className="text-gray-300 hover:text-amber-200 transition-colors py-2 sm:py-0 relative group">
                    Sign In
                    <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </button>
                </SignInButton>
                <SignUpButton
                    mode="modal"
                  >
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full transition-colors mt-2 sm:mt-0">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                      color: '#ffffff'
                    },
                  }}
                />
              </SignedIn>
                 
                </div>
              </div>
            </div>
          </nav>
        </header>
      );
 }
