/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
			backgroundImage: {
				'video-influencer': "url('/src/assets/video_influencer.svg')",
				'video-player': "url('/src/assets/video_player.svg')",
				'movie-night': "url('/src/assets/movie_night.svg')",
				tutorial_video: "url('/src/assets/tutorial_video.svg')",
			},
		},
	},
	plugins: [],
};
