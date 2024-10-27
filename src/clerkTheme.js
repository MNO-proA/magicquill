const clerkTheme = {
    variables: {
      colorPrimary: '#d97706', // amber-600
      colorTextOnPrimaryBackground: '#ffffff',
      colorBackground: '#1f2937', // gray-800
      colorText: '#ffffff',
      colorInputBackground: '#374151', // gray-700
      colorInputText: '#ffffff',
      colorTextSecondary: '#d1d5db', // gray-300
      borderRadius: '0.5rem',
    },
    elements: {
      formButtonPrimary: {
        backgroundColor: '#d97706', // amber-600
        '&:hover': {
          backgroundColor: '#b45309', // amber-700
        },
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
      },
      card: {
        backgroundColor: '#1f2937', // gray-800
        border: '1px solid #374151', // gray-700
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      socialButtonsIconButton: {
        backgroundColor: '#374151', // gray-700
        '&:hover': {
          backgroundColor: '#4b5563', // gray-600
        },
      },
      socialButtonsBlockButton: {
        backgroundColor: '#374151', // gray-700
        '&:hover': {
          backgroundColor: '#4b5563', // gray-600
        },
      },
      formField: {
        backgroundColor: '#374151', // gray-700
        borderColor: '#4b5563', // gray-600
        borderRadius: '5px',
        padding: '0.5rem 1rem',
        // transitionProperty: 'all',
        // transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        // transitionDuration: '300ms',
      },
      footerActionLink: {
        color: '#d97706', // amber-600
        '&:hover': {
          color: '#b45309', // amber-700
        },
      },
      navbarButton: {
        color: '#d97706', // amber-600
        '&:hover': {
          color: '#b45309', // amber-700
        },
      },
      
    },
  };
  
  export default clerkTheme;