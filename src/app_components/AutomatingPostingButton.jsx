/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import Loader from "../app_components/Loader";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const AutomatedPostingButton = ({ todo, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const generateContent = async (prompt) => {
  //   if (!genAI) return null;
    
  //   const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  //   const promptText = `Generate Twitter thread content about "${prompt}". Provide a thread of 5 tweets, each under 280 characters.`;
    
  //   const result = await model.generateContent([promptText]);
  //   const generatedText = await result.response.text();
  //   return generatedText.split("\n\n").filter((tweet) => tweet.trim() !== "");
  // };

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const postToTwitter = async (content, credentials) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/post-tweet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, credentials }),
      });
      
      const data = await response.json();
      return data.success;
    // console.log(content)
    // console.log(credentials)
    } catch (error) {
      console.error('Error posting to Twitter:', error);
      return false;
    }
  };

  const handleAutoPost = async () => {
    setIsProcessing(true);
    try {
      // const generatedContent = await generateContent(todo.text);
      
      if (!todo) {
        throw new Error('Failed to post content');
      }

      const credentials = {
        username: todo.username,
        password: todo.password,
        email: todo.email
      };

      const content = String(todo.text)

      const success = await postToTwitter(content, credentials);
      
      if (success) {
        onComplete(todo.id);
      }
    } catch (error) {
      console.error('Automation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button 
      onClick={handleAutoPost}
      disabled={isProcessing}
      className={`p-2 text-indigo-400 hover:text-indigo-300 transition-colors ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isProcessing ? 
            <Loader size={30} />
            : 
            <Wand2 className="h-5 w-5" />
      }
      
    </button>
  );
};