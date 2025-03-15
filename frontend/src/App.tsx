import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { MantineProvider } from '@mantine/core'
import MyBuckets from './pages/MyBuckets'
import '@mantine/carousel/styles.css';

function App() {

  return (
    <>
			<MantineProvider >
				<BrowserRouter>
					<Routes>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="my-buckets" element={<MyBuckets />} />
					</Routes>
				</BrowserRouter>
			</MantineProvider>
    </>
  )
}

export default App
