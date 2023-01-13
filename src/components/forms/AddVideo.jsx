import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBuckets, updateBuckets, updateVideos, showBanner } from '../../redux/counter';
import { createBucket, addVideo, getBuckets } from './functions';

export default function AddVideo() {
	const buckets = useSelector(state => state.counter.buckets);
	const dispatch = useDispatch();

	useEffect(() => {
		// Update buckets in store on load if empty
		(async function () {
			if (buckets.length > 0) return;
			const data = await getBuckets();
			dispatch(setBuckets(data));
		})();
	}, []);

	const addNewVideo = async e => {
		e.preventDefault();
		try {
			const bucketName = e.target.bucket.value;
			const title = e.target.title.value;
			const link = e.target.link.value;
			const videoId = link.includes('embed/') ? link.split('embed/')[1].split('?')[0] : link.split('be/')[1].split('&')[0];

			if (!bucketName || !title || !link || !videoId || bucketName.length < 3 || title.length < 3 || videoId.length < 5)
				return dispatch(showBanner(`Failed to add ${title} video to ${bucketName} bucket! Please check your inputs`));

			const body = {
				id: Math.floor(10 + Math.random() * 900),
				bucket: bucketName,
				title: title,
				link: `https://www.youtube-nocookie.com/embed/${videoId}`,
				videoId: videoId,
				type: `youtube/video`,
			};

			// add video to bucket
			await addVideo(body);

			// update redux store
			dispatch(updateVideos(body));
			dispatch(showBanner(`${body.title} video added successfully to ${body.bucket} bucket!`));
			// e.target.reset();
		} catch (err) {
			dispatch(showBanner(`Failed to add ${body.title} video to ${body.bucket} bucket!`));
			console.log(err);
		}
	};

	const createNewBucket = async e => {
		e.preventDefault();
		try {
			const bucketName = e.target['new-bucket'].value;
			if (bucketName.length < 3) return alert('Bucket name should be atleast 3 characters long!');
			const data = await createBucket(bucketName);
			if (data.name) dispatch(updateBuckets(data)); // update redux store
			dispatch(showBanner(`${body.bucket} bucket successfully create! Next step is to add videos`));
		} catch (err) {
			dispatch(showBanner(`${body.bucket} bucket creation failed!`));
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
