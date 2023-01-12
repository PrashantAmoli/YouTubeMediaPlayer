import { useState, useEffect } from 'react';
import Card from '../components/views/Card';
import { getHistory } from '../components/forms/functions';

export default function History() {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		async function updateHistory() {
			const data = await getHistory();
			setHistory(data);
		}
		updateHistory();
	}, []);

	return (
		<div className="flex flex-col flex-wrap justify-center items-center px-2 py-8 gap-10 w-full">
			{history.length &&
				history.map((data, index) => {
					return <Card key={index} data={data} />;
				})}
		</div>
	);
}
