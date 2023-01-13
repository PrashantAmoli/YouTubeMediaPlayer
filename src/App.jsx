import { Route, Routes } from 'react-router-dom';
import Navbar from './components/views/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import History from './pages/History';
import Customize from './pages/Customize';
import Search from './pages/Search';
import MyModal from './components/views/MyModal';

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/explore" element={<Explore />} />
				<Route path="/search" element={<Search />} />
				<Route path="/history" element={<History />} />
				<Route path="/customize" element={<Customize />} />
			</Routes>

			<MyModal />
		</div>
	);
}

export default App;
