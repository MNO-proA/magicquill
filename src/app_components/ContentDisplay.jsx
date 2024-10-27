/* eslint-disable react/prop-types */
import { Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
// import { Skeleton } from '@mantine/core';


const ContentDisplay = ({ 
  selectedHistoryItem, 
  generatedContent, 
  selectedType,
//   isLoading
}) => {
    
    const [copiedIndex, setCopiedIndex] = useState(null);
  
    const handleCopy = async (text, index) => {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 2000); // Reset after 2 seconds
      };

  const hasContent = selectedHistoryItem || generatedContent.length > 0;
  if (!hasContent) return null;

  const title = selectedHistoryItem ? "History Item" : "Generated Content";
  const content = selectedHistoryItem ? selectedHistoryItem.content : generatedContent;
    const MAX_TWEET_LENGTH = 280;

  return (
    <div className="bg-slate-800 p-6 rounded-2xl space-y-4">
      <h2 className="text-2xl font-semibold text-blue-400">
        {title}
      </h2>
      
      {selectedType.value === "twitter"? (
        <div className="space-y-4">
          {(Array.isArray(content)? content : content.split("\n\n")).map((tweet, index) => (
            <div key={index} className="bg-slate-700 p-4 rounded-xl relative">
              <div className="prose prose-invert max-w-none mb-2 text-sm text-slate-300">
                <ReactMarkdown>{tweet}</ReactMarkdown>
              </div>
              
              <div className="flex justify-between items-center text-gray-400 text-xs mt-2">
                <span>{tweet.length}/{MAX_TWEET_LENGTH}</span>
                <button
                onClick={() => handleCopy(tweet, index)}
                className={`${
                  copiedIndex === index ? 'bg-gray-600 hover:bg-grey-500' : 'bg-slate-600 hover:bg-slate-500'
                } text-white rounded-full p-2 transition-colors`}
              >
                {copiedIndex === index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-700 p-4 rounded-xl">
          <div className="prose prose-invert max-w-none text-sm text-slate-300">
            <ReactMarkdown>
              {Array.isArray(content)? content[0] : content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDisplay;





// import { Copy, Check } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';
// import { useState } from 'react';

// const ContentDisplay = ({ 
//   selectedHistoryItem, 
//   generatedContent, 
//   selectedType,
//   MAX_TWEET_LENGTH,
//   copyToClipboard: propsCopyToClipboard
// }) => {
//   const [copiedIndex, setCopiedIndex] = useState(null);
  
//   const handleCopy = async (text, index) => {
//     await navigator.clipboard.writeText(text);
//     setCopiedIndex(index);
//     setTimeout(() => {
//       setCopiedIndex(null);
//     }, 2000); // Reset after 2 seconds
//   };

//   const hasContent = selectedHistoryItem || generatedContent.length > 0;
//   if (!hasContent) return null;

//   const title = selectedHistoryItem ? "History Item" : "Generated Content";
//   const content = selectedHistoryItem ? selectedHistoryItem.content : generatedContent;
//   const tweets = Array.isArray(content) ? content : content.split("\n\n");

//   return (
//     <div className="bg-slate-800 p-6 rounded-2xl space-y-4">
//       <h2 className="text-2xl font-semibold text-blue-400">
//         {title}
//       </h2>
      
//       <div className="space-y-4">
//         {tweets.map((tweet, index) => (
//           <div key={index} className="bg-slate-700 p-4 rounded-xl relative">
//             <div className="prose prose-invert max-w-none mb-2 text-sm">
//               <ReactMarkdown>{tweet}</ReactMarkdown>
//             </div>
            
//             <div className="flex justify-between items-center text-gray-400 text-xs mt-2">
//               <span>{tweet.length}/{MAX_TWEET_LENGTH}</span>
//               <button
//                 onClick={() => handleCopy(tweet, index)}
//                 className={`${
//                   copiedIndex === index ? 'bg-green-600 hover:bg-green-500' : 'bg-slate-600 hover:bg-slate-500'
//                 } text-white rounded-full p-2 transition-colors`}
//               >
//                 {copiedIndex === index ? (
//                   <Check className="h-4 w-4" />
//                 ) : (
//                   <Copy className="h-4 w-4" />
//                 )}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ContentDisplay;