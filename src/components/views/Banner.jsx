import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showBanner, hideBanner } from '../../redux/counter';

export default function Banner() {
	const bannerMessage = useSelector(state => state.counter.bannerMessage);
	const bannerShow = useSelector(state => state.counter.bannerShow);

	const dispatch = useDispatch();

	const bannerRef = useRef(null);

	useEffect(() => {
		if (bannerShow) {
			bannerRef.current.classList.remove('hidden');
			// bannerRef.current.classList.add('flex');
		} else {
			// bannerRef.current.classList.remove('flex');
			bannerRef.current.classList.add('hidden');
		}

		// Auto hide banner after 15 seconds
		setTimeout(() => {
			dispatch(hideBanner());
		}, 15000);
	}, [bannerShow]);

	const handleClose = () => {
		dispatch(hideBanner());
	};

	return (
		<div className="bg-indigo-600 relative z-40 ease-in-out delay-1000 animate-pulse duration-1000" ref={bannerRef}>
			<div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
				<div className="flex flex-wrap items-center justify-between">
					<div className="flex w-0 flex-1 items-center">
						<span className="flex rounded-lg bg-indigo-800 p-2">
							<MegaphoneIcon className="h-6 w-6 text-white" aria-hidden="true" />
						</span>
						<p className="ml-3 truncate font-medium text-white">
							<span className="md:hidden">Hey there! </span>
							<span className="hidden md:inline">{bannerMessage}</span>
						</p>
					</div>
					<div className="order-3 mt-2 w-full flex-shrink-0 sm:order-2 sm:mt-0 sm:w-auto">
						<a
							href="#"
							className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-50"
						>
							Learn more
						</a>
					</div>
					<div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
						<button
							type="button"
							className="-mr-1 flex rounded-md p-2 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
							onClick={handleClose}
						>
							<span className="sr-only">Dismiss</span>
							<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
