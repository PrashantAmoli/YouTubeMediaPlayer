import Card from './Card';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getBucketVideos, deleteBucket } from '../forms/functions';
import { useSelector, useDispatch } from 'react-redux';

export default function Bucket({ bucket }) {
	const [bucketData, setBucketData] = useState([]);
	const [bucketName, setBucketName] = useState('Namaste JS');

	const ref = useRef();

	useEffect(() => {
		async function getBucketData(bucketName) {
			const data = await getBucketVideos(bucketName);
			setBucketData(data);
			return data;
		}

		if (bucket) {
			setBucketName(bucket.name);
			getBucketData(bucket.name);
		}
	}, [bucket]);

	// For smooth scrolling buttons
	const scroll = scrollOffset => {
		ref.current.scrollLeft += scrollOffset;
	};

	const handleDelete = async () => {
		deleteBucket(bucket);

		console.log('Delete');
	};

	return (
		<div className="relative max-h-[30rem] py-4 my-8 select-none">
			<h2 className="sm:my-2 text-center font-semibold text-xl">{bucketName?.replace('_', ' ') || `Title of the Bucket`}</h2>

			<div
				className="flex flex-col flex-wrap items-center justify-center shadow-2xl gap-10 px-2 sm:p-6 m-2 overflow-x-scroll h-[24rem] scroll-smooth "
				ref={ref}
			>
				{bucketData.length &&
					bucketData.map((data, index) => {
						return <Card key={index} data={data} />;
					})}
			</div>

			<TrashIcon className="btn-float right-2 top-4 hover:bg-red-600" onClick={handleDelete} />

			<ArrowLeftIcon className="btn-float left-12 bottom-12 sm:bottom-36 " onClick={() => scroll(-220)} />
			<ArrowRightIcon className="btn-float right-12 bottom-12 sm:bottom-36 " onClick={() => scroll(220)} />
		</div>
	);
}
