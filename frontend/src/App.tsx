import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { MantineProvider } from '@mantine/core'
import Group from './pages/Group'
import { Notifications } from '@mantine/notifications'

function App() {

  return (
    <>
			<MantineProvider >
				<Notifications />
				<BrowserRouter>
					<Routes>
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="group/:groupId" element={<Group />} />
					</Routes>
				</BrowserRouter>
			</MantineProvider>
    </>
  )
}

export default App
