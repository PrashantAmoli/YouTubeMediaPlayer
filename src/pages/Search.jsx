import { useState, useEffect } from 'react';
import Card from '../components/views/Card';
import { searchVideos } from '../components/forms/functions';

function Search() {
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState('');

	async function getSearchResults() {
		console.log(query);
		console.log(results);
		const data = await searchVideos(query);
		setResults(data);
	}
	useEffect(() => {
		getSearchResults();
	}, []);

	return (
		<div className="flex flex-col justify-center items-center border-4 bg-video-player bg-fixed bg-contain bg-no-repeat bg-blend-darken">
			<div className="relative flex gap-8 flex-wrap w-full justify-center justify-items-center items-center py-6 px-4 bg-transparent pt-28">
				{/* Search Bar */}
				<div className="items-center justify-between w-11/12 sm:w-5/12  flex rounded-full shadow-xl p-2 mb-5 absolute z-30 top-4 backdrop-blur-lg">
					<div>
						<div className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer" onClick={() => setQuery('')}>
							<svg className="h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
								<path
									fillRule="evenodd"
									d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</div>

					<input
						className="font-bold rounded-full w-full py-4 pl-6 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs drop-shadow-2xl"
						type="text"
						placeholder="Search"
						value={query}
						onChange={e => setQuery(e.target.value)}
					/>

					<div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full" onClick={getSearchResults}>
						<svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
				</div>
				{results.length &&
					results.map((data, index) => {
						return <Card key={index} data={data} />;
					})}
			</div>
		</div>
	);
}

export default Search;
