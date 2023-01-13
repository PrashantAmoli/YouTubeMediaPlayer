import Card from './Card';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getBucketVideos, deleteBucket } from '../forms/functions';
import { useSelector, useDispatch } from 'react-redux';
import { setVideos, updateVideos, deleteBuckets } from '../../redux/counter';

// * @prop bucket = {name: 'Namaste JS', id: 123}
export default function Bucket({ bucket }) {
	// TODO : Get the bucket videos from the redux store

	const videos = useSelector(state => state.counter.videos);
	const dispatch = useDispatch();

	const ref = useRef();

	useEffect(() => {
		(async function () {
			if (!bucket.name) return;
			const data = await getBucketVideos(bucket.name);
			// TODO : Update the bucket videos in the redux store
			dispatch(setVideos(data));
			return data;
		})();
	}, [bucket.name]);

	// For smooth scrolling buttons
	const scroll = scrollOffset => {
		ref.current.scrollLeft += scrollOffset;
	};

	const handleDelete = async () => {
		// delete the bucket from the database
		await deleteBucket(bucket);
		// TODO : Delete the bucket from the redux store
		// TODO : Delete the bucket videos from the redux store
		dispatch(deleteBuckets(bucket));
	};

	return (
		<div className="relative max-h-[30rem] py-4 my-8 select-none">
			<h2 className="sm:my-2 text-center font-semibold text-xl" onClick={() => console.log(videos)}>
				{bucket.name || `Title of the Bucket`}
			</h2>

			<div
				className="flex flex-col flex-wrap items-center justify-center shadow-2xl gap-10 px-2 sm:p-6 m-2 overflow-x-scroll h-[24rem] scroll-smooth "
				ref={ref}
			>
				{videos?.length &&
					videos.map((data, index) => {
						if (data.bucket === bucket.name) return <Card key={index} data={data} />;
					})}
			</div>

			<TrashIcon className="btn-float right-2 top-4 hover:bg-red-600" onClick={handleDelete} />

			<ArrowLeftIcon className="btn-float left-12 bottom-12 sm:bottom-36 " onClick={() => scroll(-220)} />
			<ArrowRightIcon className="btn-float right-12 bottom-12 sm:bottom-36 " onClick={() => scroll(220)} />
		</div>
	);
}
