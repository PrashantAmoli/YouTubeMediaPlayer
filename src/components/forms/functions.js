// * @param 1661351540 => returns 1/19/1970 11:30:00 PM format
export const getDateTime = t => {
	return new Date(t).toLocaleDateString('en-US') + ' ' + new Date(t).toLocaleTimeString('en-US');
};

/* 
* fetch/Get all videos from /_history
@param query = 'react'
*/
export const getHistory = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_history?_sort=timestamp&_order=desc`);
		const data = await response.json();
		return data;
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

/* 
* Search/get all videos with query === @param from /_videos
@param query = 'react'
*/
export const searchVideos = async query => {
	try {
		const response = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_videos?q=${query}`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

/* 
* Patch/update /_history with the cardData and timestamp
@param cardData  = {id: 1, bucket: 'bucket1', title: 'title1', link: 'link1', videoId: 'videoId1', type: 'youtube/video', timestamp: 123456789 }
*/
export const updateHistory = async cardData => {
	try {
		const body = {
			timestamp: new Date().now(),
			...cardData,
		};
		const response = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_history`, {
			method: 'PATCH',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});
		const data = await response.json();
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

/* 
* Fetch/get all buckets from /_buckets
@param 
*/
export const getBuckets = async () => {
	try {
		const res = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_buckets`);
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

/* 
* Fetch/get all videos with bucket name === @param from /_videos
@param bucketName = 'bucket1'
*/
export const getBucketVideos = async bucketName => {
	try {
		const res = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_videos?bucket=${bucketName}`);
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

/* 
* Create a new video in the /_videos
@param body = {id: 1, bucket: 'bucket1', title: 'title1', link: 'link1', videoId: 'videoId1', type: 'youtube/video'}
*/
export const addVideo = async body => {
	try {
		const res = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_videos`, {
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		const result = await res.json();
		console.log(result);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

/* 
* Create a new bucket in the /_buckets
@param bucketName = 'bucket1'
*/
export const createBucket = async bucketName => {
	try {
		const res = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_buckets`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: Math.floor(10 + Math.random() * 90), name: bucketName }),
		});
		const content = await res.json();
		return content;
	} catch (err) {
		console.log(err);
		return false;
	}
};

/* 
* Delete the video using id 
@param id = 1
*/
export const deleteVideoCard = async id => {
	try {
		const response = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_videos/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log(data);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

/* 
* Patch/Update the bucket name in the video  
@param cardData = {id: 1, bucket: 'bucket1', title: 'title1', link: 'link1', videoId: 'videoId1', type: 'youtube/video'}
*/
export const moveToBucket = async (cardData, newBucket) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_videos/${cardData.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: cardData.id,
				bucket: newBucket,
				title: cardData.title,
				link: cardData.link,
				videoId: cardData.videoId,
				type: cardData.type,
			}),
		});
		const data = await response.json();
		console.log(data);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

/* 
* Rename bucket and update the bucket name in all the videos by fetching all the videos with that bucket name
@param bucket = {id: 1, name: 'bucket1'}
*/
export const renameBucket = async (bucket, newName) => {
	try {
		const oldName = bucket.name;

		// Patch the _buckets
		const res1 = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_buckets/${bucket.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: bucket.id,
				name: newName,
			}),
		});

		// fetch all the videos in the bucket
		const videos = await getBucketVideos(oldName);

		// move all the videos to the new bucket by renaming bucket
		videos.forEach(async video => {
			await moveToBucket(video, newName);
		});
	} catch (err) {
		console.log(err);
		return false;
	}
};

/* 
* Delete bucket and all the videos in the bucket
@param bucket = {id: 1, name: 'bucket1'}
*/
export const deleteBucket = async bucket => {
	try {
		const res1 = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_buckets/${bucket.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		// fetch all the videos in the bucket
		const videos = await getBucketVideos(bucket.name);

		// move all the videos to the new bucket by renaming bucket
		videos.forEach(async video => {
			await deleteVideoCard(video.id);
		});
	} catch (err) {
		console.log(err);
		return false;
	}
};
