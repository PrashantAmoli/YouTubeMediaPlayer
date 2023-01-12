import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function MyModal({ open, setModalOpen, data }) {
	const [isOpen, setIsOpen] = useState(true);
	const [XY, setXY] = useState({ x: 500, y: 300 });

	const frameRef = useRef(null);

	useEffect(() => {
		setIsOpen(open);
	}, [open]);

	function closeModal() {
		setIsOpen(false);
		setModalOpen(false);
		console.log('closeModal()');
	}

	function openModal() {
		setModalOpen(true);
		setIsOpen(true);
	}

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

			<div className="fixed inset-0 flex items-center justify-center">
				<button type="button" onClick={openModal} className="btn-red">
					Open dialog
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
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
										{data?.title || `Card Name: Video Title`}
									</Dialog.Title>

									<button onClick={closeModal} className="absolute right-5 top-5 bg-gray-200 hover:bg-red-600 rounded-md">
										<XMarkIcon className="h-6 w-6 fill-blue-600 hover:fill-red-700 hover:animate-spin" aria-hidden="true" />
									</button>

									<div className="mt-2">
										<p className="text-sm text-gray-500">{}</p>
									</div>

									<div className="mt-4 w-full sm:h-[40vh] md:h-[60vh] lg:h-[75vh] flex justify-center items-center overflow-hidden" ref={frameRef}>
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

									{/* Resize button: like theratre mode */}
									<div className="flex flex-row justify-center gap-6 w-full mt-4">
										<button className="btn-blue" onClick={resizePlayer}>
											Resize
										</button>

										<button className="btn-red">Delete</button>
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
