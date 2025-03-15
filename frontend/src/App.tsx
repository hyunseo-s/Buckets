import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { MantineProvider } from '@mantine/core'
import { AddButton } from './components/AddButton'

function App() {

  return (
    <>
			<MantineProvider >
				<BrowserRouter>
					<Routes>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
					</Routes>
				</BrowserRouter>
				<AddButton />
			</MantineProvider>
    </>
  )
}

export default App
