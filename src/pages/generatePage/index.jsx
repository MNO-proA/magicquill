import {
  Loader2,
  Upload,
  Copy,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  Zap,
  TwitterIcon,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const contentTypes = [
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

export const GenerateContent = () => {
  const [userPoints, setUserPoints] = useState();
  const [selectedType, setSelectedType] = useState(contentTypes[0]);
  const [isOpen, setIsOpen] = useState(false);
  
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
                    {contentTypes.map((type) => (
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
              />
              <p className="mt-1 text-sm text-slate-400">
                Gemini AI Content Generator
              </p>
            </div>

            <button className=" bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium transition-colors duration-200">
              Generate Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateContent;