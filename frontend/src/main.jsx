import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)


// to do listcd

// install npm react router dom react hot toast initallize tailwind css npm install -D tailwindcss autoprefixer daisy ui go to daisy ui .com use import daisy ui
//delete app.css
//delete all in appp.jsx rafce
