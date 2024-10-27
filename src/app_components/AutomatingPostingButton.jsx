/* eslint-disable react/prop-types */
// import { useState } from 'react';
// import { Wand2 } from 'lucide-react';
// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// puppeteer.use(StealthPlugin());

// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// const sleep = (milliseconds) => {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// };

// const getRandomDelay = () => Math.floor(Math.random() * (180000 - 120000 + 1) + 120000);

// export const AutomatedPostingButton = ({ todo, onComplete }) => {
//   const [isProcessing, setIsProcessing] = useState(false);

//   const generateContent = async (prompt) => {
//     if (!genAI) return null;
    
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//     const promptText = `Generate Twitter thread content about "${prompt}". Provide a thread of 5 tweets, each under 280 characters.`;
    
//     const result = await model.generateContent([promptText]);
//     const generatedText = await result.response.text();
//     return generatedText.split("\n\n").filter((tweet) => tweet.trim() !== "");
//   };

//   const postToTwitter = async (content, credentials) => {
//     const browser = await puppeteer.launch({
//       headless: false,
//       args: [
//         '--no-sandbox',
//         '--disable-setuid-sandbox',
//         '--disable-infobars',
//         '--window-position=0,0',
//         '--ignore-certificate-errors',
//         '--ignore-certificate-errors-spki-list',
//       ],
//     });

//     try {
//       const page = await browser.newPage();
      
//       // Set user agent
//       await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36');
      
//       // Configure viewport
//       await page.setViewport({ width: 1280, height: 800 });

//       // Navigate to Twitter login
//       await page.goto("https://x.com/i/flow/login", {
//         waitUntil: 'networkidle0',
//         timeout: 10000,
//       });

//       // Random delay
//       await sleep(getRandomDelay());

//       // Login process
//       await page.waitForSelector('input[name="text"]');
//       await page.type('input[name="text"]', credentials.email);
//       await sleep(5000);
//       await page.keyboard.press('Enter');
//       await sleep(10000);
      
//       // Handle username if prompted
//       if (await page.$('input[name="text"]')) {
//         await page.type('input[name="text"]', credentials.username);
//         await sleep(5000);
//         await page.keyboard.press('Enter');
//     }

//     await sleep(10000);
//     await page.type('input[name="password"]', credentials.password);
//     await sleep(5000);
//     await page.keyboard.press('Enter');
//     await sleep(10000);

//       // Click compose tweet button
      
//     // Type and post tweet
//     await page.type('div[data-testid="tweetTextarea_0_label"]', content);
//     await sleep(10000);

//     await page.keyboard.press('Enter');
//     await sleep(30000);

//     return true;
//     } catch (error) {
//       console.error('Error during Twitter posting:', error);
//       return false;
//     } finally {
//       await browser.close();
//     }
//   };

//   const handleAutoPost = async () => {
//     setIsProcessing(true);
//     try {
//       // Generate content using todo text
//       const generatedContent = await generateContent(todo.text);
      
//       if (!generatedContent || generatedContent.length < 4) {
//         throw new Error('Failed to generate content');
//       }

//       // Post to Twitter using the fourth item (index 3)
//       const credentials = {
//         username: todo.username,
//         password: todo.password,
//         email: todo.email
//       };

//       const success = await postToTwitter(generatedContent[3], credentials);
      
//       if (success) {
//         onComplete(todo.id);
//       }
//     } catch (error) {
//       console.error('Automation failed:', error);
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <button 
//       onClick={handleAutoPost}
//       disabled={isProcessing}
//       className={`p-2 text-indigo-400 hover:text-indigo-300 transition-colors ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
//     >
//       <Wand2 className="h-5 w-5" />
//     </button>
//   );
// };


import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const AutomatedPostingButton = ({ todo, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const generateContent = async (prompt) => {
    if (!genAI) return null;
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const promptText = `Generate Twitter thread content about "${prompt}". Provide a thread of 5 tweets, each under 280 characters.`;
    
    const result = await model.generateContent([promptText]);
    const generatedText = await result.response.text();
    return generatedText.split("\n\n").filter((tweet) => tweet.trim() !== "");
  };

  const postToTwitter = async (content, credentials) => {
    try {
      const response = await fetch('http://localhost:3000/api/post-tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, credentials }),
      });
      
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error posting to Twitter:', error);
      return false;
    }
  };

  const handleAutoPost = async () => {
    setIsProcessing(true);
    try {
      const generatedContent = await generateContent(todo.text);
      
      if (!generatedContent || generatedContent.length < 4) {
        throw new Error('Failed to generate content');
      }

      const credentials = {
        username: todo.username,
        password: todo.password,
        email: todo.email
      };

      const success = await postToTwitter(generatedContent[3], credentials);
      
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
      <Wand2 className="h-5 w-5" />
    </button>
  );
};