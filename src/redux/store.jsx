import { configureStore } from '@reduxjs/toolkit';
import appReducer from './counter';

export default configureStore({
	reducer: {
		counter: appReducer,
	},
});
