import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteVideoCard, getDateTime } from '../forms/functions';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../redux/counter';

export default function Card({ data }) {
	const modalOpen = useSelector(state => state.counter.modalOpen);
	const dispatch = useDispatch();

	const handleDelete = async () => {
		await deleteVideoCard(data.id);
	};

	const handleClick = () => {
		console.log('Card Clicked: show moadal with video');
		dispatch(openModal(data));
	};
	return (
		<div
			className="relative z-10 shadow-xl hover:drop-shadow-2xl w-96 h-80 rounded-lg hover:scale-105 overflow-hidden transition duration-150 ease-in-out"
			onClick={handleClick}
		>
			<img
				src={`https://img.youtube.com/vi/${data?.videoId || `t1nFAMws5FI`}/hqdefault.jpg`}
				alt="Thumbnail of Video"
				className="absolute -top-10 w-full rounded-lg z-10 cursor-pointer"
			/>

			{data.timestamp && (
				<span className="btn-float backdrop-blur-md bg-transparent rounded-lg top-1 right-0 z-20 h-8 w-fit hover:opacity-80 tracking-tighter transition duration-150 ease-in-out">
					{getDateTime(data.timestamp)}
				</span>
			)}

			{/* Delete Button */}
			<TrashIcon className="btn-float right-0 bottom-24 hover:bg-red-600" onClick={handleDelete} />

			<p className="absolute test-center bottom-0 leading-4 hover:shadow-inner hover:py-1 text-center font-medium w-full h-2/6 px-1 py-4 overflow-hidden z-20 bg-white transition duration-250 ease-in-out">
				{data?.bucket && data.bucket + ': '} {data?.title || `Title of the video`}
			</p>
		</div>
	);
}
