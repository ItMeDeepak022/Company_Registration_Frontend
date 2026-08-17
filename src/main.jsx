import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import RootLayout from './RootLayout.jsx'


createRoot(document.getElementById('root')).render(
  <>
    <RootLayout />
  </>
)
