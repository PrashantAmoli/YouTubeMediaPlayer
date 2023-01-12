import { createBucket, addVideo, getBuckets } from './functions';
import { useState, useEffect } from 'react';

export default function AddVideo() {
	const [buckets, setBuckets] = useState([]);

	useEffect(() => {
		async function updateBuckets() {
			const data = await getBuckets();
			setBuckets(data);
		}
		updateBuckets();
	}, []);

	const addNewVideo = async e => {
		e.preventDefault();
		try {
			const bucketName = e.target.bucket.value;
			const title = e.target.title.value;
			const link = e.target.link.value;
			const videoId = link.includes('embed/') ? link.split('embed/')[1].split('?')[0] : link.split('be/')[1].split('&')[0];

			if (!bucketName || !title || !link || !videoId || bucketName.length < 3 || title.length < 3 || videoId.length < 5)
				return alert('Please fill all the fields properly!');

			const body = {
				id: Math.floor(10 + Math.random() * 900),
				bucket: bucketName,
				title: title,
				link: `https://www.youtube-nocookie.com/embed/${videoId}`,
				videoId: videoId,
				type: `youtube/video`,
			};

			await addVideo(body);
			// e.target.reset();
		} catch (err) {
			console.log(err);
		}
	};

	const createNewBucket = async e => {
		e.preventDefault();
		try {
			const bucketName = e.target['new-bucket'].value;
			return createBucket(bucketName);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center gap-20 my-8">
			<form
				className="flex flex-col justify-center items-center gap-8 shadow-lg rounded-lg backdrop-blur-xl w-11/12 sm:w-6/12 py-6 sm:p-8"
				onSubmit={addNewVideo}
			>
				{buckets && (
					<label htmlFor="bucket" className="label-primary">
						Bucket Name:
						<select className="input-primary" name="bucket" id="bucket" required>
							{buckets.map((bucket, index) => {
								return (
									<option key={index} value={bucket.name}>
										{bucket.name}
									</option>
								);
							})}
						</select>
					</label>
				)}

				<label htmlFor="title" className="label-primary">
					Title of Video:
					<input className="input-primary" type="text" name="title" id="title" placeholder="SSR vs SSG vs ISR explained" required />
				</label>

				<label htmlFor="link" className="label-primary">
					YouTube Link:
					<input className="input-primary" type="url" name="link" id="link" placeholder="https://www.youtube.com/embed/tk54gmrk45/" required />
				</label>

				<button type="submit" className="btn-primary">
					Add to Bucket
				</button>
			</form>

			<form className="form-primary" onSubmit={createNewBucket}>
				<label htmlFor="new-bucket" className="label-primary">
					New Bucket Name:
					<input className="input-primary" type="text" name="new-bucket" id="new-bucket" placeholder="Next JS Tutorial" required />
				</label>

				<button type="submit" className="btn-primary">
					Create Bucket
				</button>
			</form>
		</div>
	);
}
