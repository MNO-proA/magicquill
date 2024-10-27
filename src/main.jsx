import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { ClerkProvider } from '@clerk/clerk-react'
import clerkTheme from './clerkTheme.js';
import { QueryClient, QueryClientProvider} from 'react-query'

const queryClient = new QueryClient()

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={clerkTheme}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </ClerkProvider>
    </MantineProvider>
  </React.StrictMode>,
)
