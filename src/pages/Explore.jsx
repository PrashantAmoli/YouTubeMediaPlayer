import Bucket from '../components/views/Bucket';
import { useState, useEffect } from 'react';
import { getBuckets, deleteBucket } from '../components/forms/functions';
import { useSelector, useDispatch } from 'react-redux';
import { setBuckets } from '../redux/counter';

export default function Explore() {
	const buckets = useSelector(state => state.counter.buckets);
	const dispatch = useDispatch();

	useEffect(() => {
		(async function () {
			if (buckets.length > 0) return;
			const data = await getBuckets();
			dispatch(setBuckets(data));
		})();
	}, []);

	return (
		<div className="sm:p-4">
			{buckets.map((bucket, index) => {
				return <Bucket key={index} bucket={bucket} />;
			})}
		</div>
	);
}
