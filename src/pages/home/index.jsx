import { Link } from "react-router-dom";
import {
  Feather,
  Crown,
  Compass,
  Star,
  Globe,
  Pen,
  BookOpen,
  Shield,
} from "lucide-react";
import { Button } from "@mantine/core";
import { SignUpButton, SignInButton, useAuth} from '@clerk/clerk-react'



export const Home = () => {
  const { userId } = useAuth();
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Star className="w-8 h-8 text-amber-300 opacity-50" />
      </div>
      <div className="absolute top-40 right-20 animate-float animation-delay-2000">
        <Crown className="w-10 h-10 text-amber-400 opacity-50" />
      </div>
      <div className="absolute bottom-20 left-1/4 animate-float animation-delay-4000">
        <Compass className="w-12 h-12 text-amber-200 opacity-50" />
      </div>

      {/* Hero Section */}
      <div className="text-center py-20 lg:py-32 relative">
        <Feather className="w-16 h-16 text-amber-400 mx-auto mb-6 animate-bounce" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-600">
          Craft Your Digital Legacy Powered By Gemini AI
        </h1>
        <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
          Create engaging content for Twitter, Instagram, and LinkedIn with
          cutting-edge Gemini AI technology.
        </p>
        <div className="flex justify-center space-x-4">
          <div className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
            {userId ? 
              <Link to={"/generate"}>
                <Feather className="m-2 h-5 w-20" />
              </Link> 
              :    
              <SignInButton
                    mode="modal"
                  >
                Start creating
              </SignInButton>
            }        
          </div>
          <button className="bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full text-lg transition duration-300 ease-in-out">
            <Link href="#features">Learn More</Link>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20" id="features">
        <h2 className="text-3xl font-bold mb-16 text-center text-white">
          Supercharge Your Social Media Presence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {[
            {
              title: "Twitter Threads",
              icon: <Pen className="w-10 h-10 mb-4 text-amber-400" />,
              description:
                "Generate compelling Twitter threads that engage your audience and boost your reach.",
            },
            {
              title: "Instagram Captions",
              icon: <BookOpen className="w-10 h-10 mb-4 text-amber-400" />,
              description:
                "Create catchy captions for your Instagram posts that increase engagement and followers.",
            },
            {
              title: "LinkedIn Posts",
              icon: <Globe className="w-10 h-10 mb-4 text-amber-400" />,
              description:
                "Craft professional content for your LinkedIn network to establish thought leadership.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-2xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-900 rounded-3xl my-20 relative">
        {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl">
          <svg
            className="absolute w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 L100,0 L100,100 L0,100 Z"
              fill="url(#grid-pattern)"
            />
          </svg>
          <defs>
            <pattern
              id="grid-pattern"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
        </div> */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-12 text-center text-white">
            Why use AI Content Generator?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              "Save time and effort on content creation",
              "Consistently produce high-quality posts",
              "Increase engagement across all platforms",
              "Stay ahead of social media trends",
              "Customize content to match your brand voice",
              "Scale your social media presence effortlessly",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-amber-500 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center py-20 relative">
        <div className="absolute top-10 right-10 animate-spin-slow">
          <Compass className="w-20 h-20 text-amber-500 opacity-20" />
        </div>
        <h2 className="text-4xl font-bold mb-8 text-white">
          Ready to revolutionize your social media strategy?
        </h2>
        {userId ? (
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105">
            <Link to="/generate">
              {/* Generate Content Now  */}
              <Feather className="mx-5 h-5 w-5" />
            </Link>
          </button>
          ) : (
            <SignUpButton mode="modal" >
               <Button variant="filled" color="#B45309" radius="lg">
                Get Started
                <Feather className="m-2 h-5 w-5" />
              </Button>
            </SignUpButton>
          )}
        
      </div>
    </main>
  );
};
