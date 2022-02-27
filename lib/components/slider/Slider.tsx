import { formatAssetUrl } from '~/services/adventureService';
import type { Picture } from '~/config/types';
import isMobile from '~/utils/isMobile';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import { useEffect, useRef } from 'react';

type PropsType = {
	pictures: Picture[],
	galleryName?: string
}

const Slider = ({ pictures = [] }: PropsType) => {
	const sliderRef = useRef(null);
	useEffect(() => {
		const setupGallery = async () => {
			const { default: lightGallery } = await import('lightgallery');
			const { default: lgZoom } = await import('lightgallery/plugins/zoom/lg-zoom.umd');

			const plugins = [lgZoom];

			if (!isMobile()) {
				const { default: lgThumbnail } = await import(
					'lightgallery/plugins/thumbnail/lg-thumbnail.umd'
				);
				plugins.push(lgThumbnail);
			}

			if (!sliderRef.current) return

			lightGallery(sliderRef.current, {
				plugins,
				speed: 500,
				mobileSettings: { showCloseIcon: true }
			});
		}
		setupGallery()
  }, [sliderRef]);

	return (
		<div
			ref={sliderRef}
			className="cursor-pointer w-full h-40 overflow-x-scroll overflow-y-hidden whitespace-nowrap"
		>
			{pictures.filter(picture => !!picture.url).map((picture: Picture) => (
				<a
					key={picture.id}
					className="relative inline-block mr-2 h-full"
					data-lg-size={`${picture.width}-${picture.height}`}
					data-src={formatAssetUrl(picture.url)}
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						alt={picture.alternativeText}
						src={formatAssetUrl(picture.formats.small.url)}
						className="h-full object-contain"
					/>
				</a>
			))}
		</div>
	)
}

export default Slider
