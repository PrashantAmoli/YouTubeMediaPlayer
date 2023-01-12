// * Headless UI Modal Component for React JS
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, updateHistory } from '../../redux/counter';
import { deleteVideoCard, renameBucket, moveToBucket } from '../forms/functions';

export default function MyModal() {
	const modalOpen = useSelector(state => state.counter.modalOpen);
	const buckets = useSelector(state => state.counter.buckets);
	const data = useSelector(state => state.counter.modalData);
	const dispatch = useDispatch();

	const [showOptions, setShowOptions] = useState(true);
	const [XY, setXY] = useState({ x: 500, y: 300 });

	const frameRef = useRef(null);

	const handleClose = async () => {
		const historyData = {
			...data,
			timestamp: Date.now(),
		};
		dispatch(updateHistory(historyData));
		dispatch(closeModal());
	};

	const handleDelete = async () => {
		e.preventDefault();
		await deleteVideoCard(data.id);
		dispatch(closeModal());
	};

	const handleMove = async e => {
		e.preventDefault();
		const newName = e.target['bucket'].value;
		await moveToBucket(data, newName);
		dispatch(closeModal());
	};

	const handleBucketRename = async e => {
		e.preventDefault();
		const newName = e.target['newName'].value;
		const oldBucket = buckets?.filter(bucket => bucket.name === data.bucket)[0];
		await renameBucket(oldBucket, newName);
		dispatch(closeModal());
	};

	// * IMPORTANT: This is the function that resizes the iframe in modal
	// * % width and height is causing the i frame to flicker and fallback to default dimentions multiple times in every few seconds so this will help until solution is found
	function resizePlayer() {
		// width should be 10% less than the parent containers width
		const width = frameRef.current.offsetWidth - (frameRef.current.offsetWidth * 22) / 100;
		if (XY.x == 500) {
			// Height should be proportional to width
			setXY({ x: width, y: (width * 4) / 6 });
		} else {
			// Defaults values
			setXY({ x: 500, y: 380 });
		}
	}

	return (
		<>
			{/* Button to toggle modal when testing. Not for Production */}

			{/* <div className="fixed inset-0 flex items-center justify-center">
				<button type="button" onClick={openModal} className="btn-red">
					Open dialog
				</button>
			</div> */}

			<Transition appear show={modalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-30" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex flex-col min-h-full items-center justify-center p-4 sm:p-0 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-11/12 min-h-[600px] transform overflow-hidden rounded-2xl bg-white backdrop-blur p-6 text-left align-middle shadow-xl transition-all flex flex-col items-center justify-between">
									<Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
										{data?.bucket + ': ' || ' '} {data?.title || `Card Name: Video Title`}
									</Dialog.Title>

									<button onClick={handleClose} className="absolute right-5 top-5 bg-gray-200 hover:bg-red-600 rounded-md">
										<XMarkIcon className="h-6 w-6 fill-blue-600 hover:fill-red-700 hover:animate-spin" aria-hidden="true" />
									</button>

									<div className="mt-2">
										<p className="text-sm text-gray-500">{}</p>
									</div>

									<div className="mt-4 w-full h-[40vh] sm:h-[60vh]  flex justify-center items-center overflow-hidden" ref={frameRef}>
										<iframe
											width={XY.x}
											height={XY.y}
											src={(data && data.link) || 'https://www.youtube.com/embed/t1nFAMws5FI'}
											title="YouTube video player"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowFullScreen
											autoPlay={true}
											autoFocus={true}
											className="rounded-xl shadow-xl"
										></iframe>
									</div>

									{showOptions && (
										<>
											<form className="flex flex-row justify-center gap-6 w-full md:w-7/12 my-4" onSubmit={handleMove}>
												{buckets && (
													<select className="input-primary" name="bucket" id="bucket" required>
														{buckets.map((bucket, index) => {
															return (
																<option key={index} value={bucket.name}>
																	{index + '.  ' + bucket.name}
																</option>
															);
														})}
														<option key={99999} value={null} defaultValue disabled>
															Move to Bucket
														</option>
													</select>
												)}
												<button className="btn-red" type="submit">
													Move
												</button>
											</form>

											<form className="flex flex-row justify-center gap-6 w-full md:w-7/12 my-4" onSubmit={handleBucketRename}>
												<input type="text" className="input-primary" name="newName" placeholder="Rename Bucket" />
												<button className="btn-red" type="submit">
													Rename
												</button>
											</form>
										</>
									)}

									{/* Resize button: like theratre mode */}
									<div className="flex flex-row justify-center gap-6 w-full mt-4">
										<button className="btn-blue" onClick={resizePlayer}>
											Resize
										</button>

										<button className="btn-red" onClick={handleDelete}>
											Delete
										</button>
										<button className="btn-green" onClick={() => setShowOptions(!showOptions)}>
											{showOptions ? 'Hide' : 'Show'} Options
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
