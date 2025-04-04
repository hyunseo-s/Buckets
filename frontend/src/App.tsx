import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import MyBuckets from './pages/MyBuckets'
import '@mantine/carousel/styles.css';
import GroupBuckets from './pages/GroupBuckets'
import { AddButton } from './components/AddButton'
import { createTheme, MantineProvider } from '@mantine/core'
import Groups from './pages/Groups'
import { Notifications } from '@mantine/notifications'
import WaveHeader from './assets/WaveHeader'
import './App.css';
import { GroupsProvider } from './context/GroupsProvider'
import Calendar from './pages/Calendar'

function App() {
	const theme = createTheme({
		breakpoints: {
			xs: '30em',
			sm: '48em',
			md: '64em',
			lg: '74em',
			xl: '90em',
		}
	});

  return (
    <>
			<MantineProvider theme={theme} >
				<GroupsProvider>
					<Notifications />
					<BrowserRouter>
						<WaveHeader />	
						<Routes>
							<Route index element={<Home />} />
							<Route path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
							<Route path="groups" element={<Groups />} />
							<Route path="profile" element={<Profile />} />
							<Route path="my-buckets/:gid" element={<MyBuckets />} />
							<Route path="grp-buckets/:gid" element={<GroupBuckets />} />
							<Route path="groups" element={<Groups />} />
							<Route path="calendar/:id" element={<Calendar />} />
						</Routes>
					</BrowserRouter>
					<AddButton />
				</GroupsProvider>
			</MantineProvider>
    </>
  )
}

export default App
