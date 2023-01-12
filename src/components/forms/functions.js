export const getDateTime = t => {
	return new Date(t).toLocaleDateString('en-US') + ' ' + new Date(t).toLocaleTimeString('en-US');
	// returns 1/19/1970 11:30:00 PM format
};

export const getHistory = async () => {
	try {
		const response = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_history?_sort=timestamp&_order=desc`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

export const searchVideos = async query => {
	try {
		const response = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_videos?q=${query}`);
		const data = await response.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

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

export const getBuckets = async () => {
	try {
		const res = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_buckets`);
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};
export const getBucketVideos = async bucketName => {
	try {
		const res = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_videos?bucket=${bucketName}`);
		const data = await res.json();
		return data;
	} catch (err) {
		console.log(err);
	}
};

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

export const createBucket = async bucketName => {
	try {
		const res = await fetch(`${import.meta.env.VITE_JSON_BASE_URL}/_buckets`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: Math.floor(10 + Math.random() * 90), name: bucketName, data: [] }),
		});
		const content = await res.json();
		console.log(content);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
};

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
