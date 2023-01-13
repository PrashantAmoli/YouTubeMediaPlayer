import { Route, Routes } from 'react-router-dom';
import Navbar from './components/views/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import History from './pages/History';
import Customize from './pages/Customize';
import Search from './pages/Search';
import MyModal from './components/views/MyModal';
import Banner from './components/views/Banner';

function App() {
	return (
		<div>
			<Navbar />
			<Banner />

			<Routes>
				{/* Landing Page TailwindUI component */}
				<Route path="/" element={<Home />} />
				{/* All Video Buckets */}
				<Route path="/explore" element={<Explore />} />
				{/* Search Videos */}
				<Route path="/search" element={<Search />} />
				<Route path="/history" element={<History />} />
				{/* Add Video & Add Bucket forms */}
				<Route path="/customize" element={<Customize />} />
			</Routes>

			<MyModal />
		</div>
	);
}

export default App;
