import Bucket from '../components/views/Bucket';
import { useState, useEffect } from 'react';

export default function Explore() {
	const [buckets, setBuckets] = useState([]);

	useEffect(() => {
		async function getBuckets() {
			const response = await fetch('http://localhost:3000/_buckets/');
			const data = await response.json();
			console.log(data);
			setBuckets(data);
			return data;
		}
		getBuckets();
	}, []);

	return (
		<div className="sm:p-4">
			{buckets.map((bucket, index) => {
				return <Bucket key={index} bucket={bucket.name} />;
			})}
		</div>
	);
}
