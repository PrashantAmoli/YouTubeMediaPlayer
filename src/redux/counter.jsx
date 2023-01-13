import { createSlice } from '@reduxjs/toolkit';

const modalDefaultData = {
	id: '',
	title: '',
	videoId: '',
	bucket: '',
	link: '',
};

export const appSlice = createSlice({
	name: 'counter',
	initialState: {
		count: 0,
		modalOpen: false,
		modalData: {
			id: '',
			title: '',
			videoId: '',
			bucket: '',
			link: '',
		},
		query: '',
		videos: [],
		buckets: [],
		history: [],
		searchResults: [],
	},
	reducers: {
		increment: state => {
			state.count += 1;
		},
		decrement: state => {
			state.count -= 1;
		},
		incrementByAmount: (state, action) => {
			state.count += action.payload;
		},
		openModal: (state, action) => {
			state.modalOpen = true;
			state.modalData = action.payload;
		},
		closeModal: state => {
			state.modalOpen = false;
			state.modalData = modalDefaultData;
		},
		updateQuery: (state, action) => {
			state.query = action.payload;
		},
		setVideos: (state, action) => {
			state.videos = [...action.payload, ...state.videos];
		},
		updateVideos: (state, action) => {
			state.videos = [action.payload, ...state.videos?.filter(item => item.id !== action.payload.id)];
		},
		deleteVideos: (state, action) => {
			state.videos = [...state.videos.filter(item => item.id !== action.payload.id)];
		},
		setBuckets: (state, action) => {
			state.buckets = [...action.payload];
		},
		updateBuckets: (state, action) => {
			state.buckets = [...action.payload, ...state.buckets.filter(item => item.id !== action.payload.id)];
		},
		deleteBuckets: (state, action) => {
			state.videos = [...state.videos.filter(item => item.bucket !== action.payload.name)];
			state.buckets = [...state.buckets.filter(item => item.id !== action.payload.id)];
		},
		updateSearchResults: (state, action) => {
			state.searchResults = [...action.payload];
		},
		setHistory: (state, action) => {
			state.history = [...action.payload, ...state.history];
		},
		updateHistory: (state, action) => {
			state.history = [action.payload, ...state.history.filter(item => item.id !== action.payload.id)];
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	increment,
	decrement,
	incrementByAmount,
	openModal,
	closeModal,
	setVideos,
	updateVideos,
	deleteVideos,
	setBuckets,
	deleteBuckets,
	updateBuckets,
	setHistory,
	updateHistory,
	updateSearchResults,
	updateQuery,
} = appSlice.actions;

export default appSlice.reducer;
