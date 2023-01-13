import { useState, useEffect } from 'react';
import Card from '../components/views/Card';
import { getHistory } from '../components/forms/functions';
import { useSelector, useDispatch } from 'react-redux';
import { setHistory } from '../redux/counter';

export default function History() {
	const history = useSelector(state => state.counter.history);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!history || history?.length === 0)
			(async function () {
				const data = await getHistory();
				// set history in redux store
				dispatch(setHistory(data));
			})();
	}, []);

	return (
		<div className="flex flex-col flex-wrap justify-center items-center px-2 py-8 gap-10 w-full bg-movie-night bg-contain bg-no-repeat min-h-screen bg-origin-padding">
			{history.length &&
				history.map((data, index) => {
					return <Card key={index} data={data} />;
				})}
		</div>
	);
}
