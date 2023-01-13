import { TrashIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, deleteVideos } from '../../redux/counter';
import { deleteVideoCard, getDateTime } from '../forms/functions';

// * @prop data = {id, title, videoId, bucket, link, type}
export default function Card({ data }) {
	const dispatch = useDispatch();

	const handleDelete = async () => {
		await deleteVideoCard(data.id);
		//  TODO : Delete the video from the redux store
		dispatch(deleteVideos(data));
	};

	const handleClick = () => {
		dispatch(openModal(data));
	};
	return (
		<div className="relative z-10 shadow-xl hover:drop-shadow-2xl w-96 h-80 rounded-lg hover:scale-105 overflow-hidden transition duration-150 ease-in-out">
			<img
				src={`https://img.youtube.com/vi/${data?.videoId || `t1nFAMws5FI`}/hqdefault.jpg`}
				alt="Thumbnail of Video"
				className="absolute -top-10 w-full rounded-lg z-10 cursor-pointer"
				onClick={handleClick}
			/>

			{data.timestamp && (
				<span className="btn-float backdrop-blur-lg bg-transparent rounded-lg bottom-0 -right-1 z-30 h-8 w-fit tracking-tighter transition duration-150 ease-in-out">
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
