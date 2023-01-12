import SVG1 from '../assets/video_player.svg';
import SVG2 from '../assets/video_influencer.svg';
import SVG3 from '../assets/movie_night.svg';
import SVG4 from '../assets/tutorial_video.svg';

const features = [
	{ name: 'React', description: 'It is a front-end JS library for building user interfaces based on reusable UI componenets.' },
	{
		name: 'Redux',
		description: 'It is a predictable state container of JavaScript applications used for managing and centralizing application state.',
	},
	{
		name: 'Tailwind',
		description:
			'It is utility-first CSS framework packed which provides several of these opinionated single-purpose utility classes to be used directly inside markup.',
	},
	{ name: 'HeadlessUI', description: 'It is an unstyled component library for React & Vue from the developers of Tailwind CSS.' },
];

export default function Home() {
	return (
		<main className="">
			<div className="relative px-6 lg:px-8 bg-video-influencer bg-no-repeat bg-contain bg-blend-darken bg-fixed">
				<div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
					<div>
						<div className="hidden sm:mb-8 sm:flex sm:justify-center">
							<div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
								<span className="text-gray-600">
									Want to contribute with content or code{' '}
									<a href="#" className="font-semibold text-indigo-600">
										<span className="absolute inset-0" aria-hidden="true" />
										Read more <span aria-hidden="true">&rarr;</span>
									</a>
								</span>
							</div>
						</div>
						<div>
							<h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">Mutimedia App with customizable curated content</h1>
							<p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
								We aim to provide buckets of resources for people to learn and grow. We are a community of people who are passionate about learning
								and sharing knowledge. There are sections for entainment, education, and you can add more to it by being a part of this community.
							</p>
							<div className="mt-8 flex gap-x-4 sm:justify-center">
								<a
									href="#"
									className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
								>
									Get started{' '}
									<span className="text-indigo-200" aria-hidden="true">
										&rarr;
									</span>
								</a>
								<a
									href="#"
									className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
								>
									Live demo{' '}
									<span className="text-gray-400" aria-hidden="true">
										&rarr;
									</span>
								</a>
							</div>
						</div>
						<div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
							<svg
								className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
								viewBox="0 0 1155 678"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
									fillOpacity=".3"
									d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
								/>
								<defs>
									<linearGradient
										id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
										x1="1155.49"
										x2="-78.208"
										y1=".177"
										y2="474.645"
										gradientUnits="userSpaceOnUse"
									>
										<stop stopColor="#9089FC" />
										<stop offset={1} stopColor="#FF80B5" />
									</linearGradient>
								</defs>
							</svg>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section source: https://tailwindui.com/components/ecommerce/components/product-features */}

			<div className="">
				<div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
					<div>
						<h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Technical Specifications</h2>
						<p className="mt-4 text-gray-500">This app was developed using React, Redux, Tailwind CSS, and HeadlessUI.</p>

						<dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
							{features.map(feature => (
								<div key={feature.name} className="border-t border-gray-200 pt-4">
									<dt className="font-medium text-gray-900">{feature.name}</dt>
									<dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
								</div>
							))}
						</dl>
					</div>
					<div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
						<img src={SVG1} alt="Video Player Image" className="rounded-lg" />
						<img src={SVG2} alt="Video Player Image" className="rounded-lg" />
						<img src={SVG3} alt="Video Player Image" className="rounded-lg" />
						<img src={SVG4} alt="Video Player Image" className="rounded-lg" />
					</div>
				</div>
			</div>
		</main>
	);
}
