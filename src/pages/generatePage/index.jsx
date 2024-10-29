import {
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  ChevronDown,
  Upload,
  Feather
} from "lucide-react";
import { useState } from "react";
import {  SignInButton } from '@clerk/clerk-react'
import { useAuth } from "@clerk/clerk-react";
import { Button} from "@mantine/core";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {InstagramMock} from "../../app_components/social-mocks/InstagramMock";
import { TwitterMock } from "../../app_components/social-mocks/TwitterMock";
import { LinkedInMock } from "../../app_components/social-mocks/LinkedInMock";
import ContentDisplay from "../../app_components/ContentDisplay";
import Loader from "../../app_components/Loader";



const selectedTypes = [
  { 
    value: "twitter", 
    label: "Twitter Thread",
    icon: <Twitter className="h-5 w-5 text-sky-400" />
  },
  { 
    value: "instagram", 
    label: "Instagram Caption",
    icon: <Instagram className="h-5 w-5 text-pink-400" />
  },
  { 
    value: "linkedin", 
    label: "LinkedIn Post",
    icon: <Linkedin className="h-5 w-5 text-blue-400" />
  },
];

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const GenerateContent = () => {
  const [selectedType, setSelectedType] = useState(selectedTypes[0]);
  const [isOpen, setIsOpen] = useState(false);
  const { userId, isSignedIn } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  // const [history, setHistory] = useState([]);
  // const [selectedHistoryItem, setSelectedHistoryItem] =
  //   useState(null);
  const [myWorkSpace, setMyWorkSpace] = useState("")


  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
        <div className="text-center bg-[#111111] p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-4">
            Welcome to MagicQuill
          </h1>
          <p className="text-gray-400 mb-6">
            To start generating amazing content, please sign in or create an
            account.
          </p>
          <SignInButton mode="modal">
          <Button variant="filled" color="#B45309" radius="lg">
              Sign In / Sign Up
            </Button>
          </SignInButton>
          <p className="text-gray-500 mt-4 text-sm">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    );
  }
  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };


// ----------------------------------------------------------------------
const handleGenerate = async () => {
  
  if (!genAI || !userId) { 
    return
  }

  setIsLoading(true);
  try {
    console.log("clicked...")
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    let promptText = `Generate ${selectedType.label} content about "${prompt}".`;
    if (selectedType.value === "twitter") {
      promptText += " Provide a thread of 5 tweets, each under 280 characters.";
    }

    // Initialize imagePart as null and proceed with the image conversion if needed
    let imagePart = null;
    if (selectedType.value  === "instagram" && image) {
      const reader = new FileReader();
      
      // Use a promise to handle asynchronous FileReader
      const imageData = await new Promise((resolve, reject) => {
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === "string") {
            resolve(e.target.result);
          } else {
            reject(new Error("Failed to read image data"));
          }
        };
        reader.onerror = () => reject(new Error("Error reading file"));
        reader.readAsDataURL(image);
      });

      // Extract the base64 data from the DataURL
      const base64Data = imageData.split(",")[1];
      if (base64Data) {
        imagePart = {
          inlineData: {
            data: base64Data,
            mimeType: image.type || "image/jpeg", // Default to "image/jpeg" if image.type is undefined
          },
        };
      }
      promptText += " Describe the image and incorporate it into the caption.";
    }

    const parts = [promptText];
    if (imagePart) parts.push(imagePart);

    const result = await model.generateContent(parts);
    const generatedText = await result.response.text();
    // setGeneratedContent(generatedText);
    // console.log(generatedText)
    let content;
    if (selectedType.value  === "twitter") {
      content = generatedText
        .split("\n\n")
        .filter((tweet) => tweet.trim() !== "");
    } else {
      content = [generatedText];
    }

    setGeneratedContent(content);
    

    // Save generated content
    // const savedContent = await saveGeneratedContent(
    //   user.id,
    //   content.join("\n\n"),
    //   prompt,
    //   selectedType
    // );

    // if (savedContent) {
    //   setHistory((prevHistory) => [savedContent, ...prevHistory]);
    // }

  } catch (error) {
    console.error("Error generating content:", error);
    setGeneratedContent(["An error occurred while generating content."]);
  } finally {
    setIsLoading(false);
  }

}

// ======================================================================

const renderContentMock = () => {
  if (generatedContent.length === 0) return null;

  switch (selectedType.value) {
    case "twitter":
      return <TwitterMock content={generatedContent} />;
    case "instagram":
      return <InstagramMock content={generatedContent[0]} />;
    case "linkedin":
      return <LinkedInMock content={generatedContent[0]} />;
    default:
      return null;
  }
};
  
  return (
    <div className="container mx-auto px-4 mb-8 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 mt-14 lg:grid-cols-3 gap-8">
        {/* Left sidebar - History */}
        <div className="lg:col-span-1 bg-slate-900 rounded-2xl p-6 h-[calc(100vh-12rem)] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-indigo-400">History</h2>
            <Clock className="h-6 w-6 text-indigo-400" />
          </div>
        </div>

        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl space-y-6">
            <div>
              <label className="block text-slate-200 mb-2 text-sm font-medium">
                Content Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full bg-slate-800 text-slate-200 p-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {selectedType.icon}
                    <span>{selectedType.label}</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg">
                    {selectedTypes.map((type) => (
                      <button
                        key={type.value}
                        className="w-full px-3 py-2 flex items-center gap-3 hover:bg-slate-700 text-slate-200 text-left"
                        onClick={() => {
                          setSelectedType(type);
                          setIsOpen(false);
                        }}
                      >
                        {type.icon}
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-slate-200 mb-2 text-sm font-medium">
                Prompt
              </label>
              <textarea
                className="w-full bg-slate-800 text-slate-200 p-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none min-h-[120px] resize-vertical"
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <label className="block text-slate-200 mb-2 text-sm font-medium">
                Workspace
              </label>
              <textarea
                className="w-full bg-slate-800 text-slate-200 p-3 rounded-lg border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none min-h-[120px] resize-vertical"
                placeholder="Workshop your copied prompt..."
                value={myWorkSpace}
                onChange={(e) => setMyWorkSpace(e.target.value)}
              />
              
            </div>
            {selectedType.value === "instagram" && (
                <div>
                  <div className="flex items-center space-x-3">
                  <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex items-center justify-center px-4 py-2 bg-pink-400 text-white rounded-xl text-sm font-medium hover:bg-pink-700 transition-colors"
                    >
                      <Upload className="mr-2 h-5 w-5" /> {/* Icon if you have one */}
                      <span>Upload Image</span>
                    </label>
                    {image && (
                      <span className="text-sm text-gray-400">
                        {image.name}
                      </span>
                    )} 
                  </div>
                </div>
              )}

            <button 
            className=" bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200"
            onClick={handleGenerate}
            hidden={isLoading}
            >
            <Feather className="m-2 h-5 w-20" /> 
            </button>
            {isLoading ? (
              <>
              <Loader size={30} />
                  <p className="ml-2 text-amber-500" >
                    Generating...
                  </p>
              </>
                ) : null
              }
               
              {/* Generated content display */}
              <ContentDisplay
                // selectedHistoryItem={selectedHistoryItem}
                generatedContent={generatedContent}
                selectedType={selectedType}
                isLoading={isLoading}
              />

            </div>
                    {/* Content preview */}
                    {generatedContent.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">
                  Preview
                </h2>
                {renderContentMock()}
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default GenerateContent;