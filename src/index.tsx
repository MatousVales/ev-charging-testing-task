import React from 'react'
import 'tailwindcss/tailwind.css'
import {createRoot} from 'react-dom/client'

import App from './App'

const rootNode = document.getElementById('root') as HTMLDivElement
const root = createRoot(rootNode)
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
