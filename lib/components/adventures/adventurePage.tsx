import type { Adventure } from '~/config/types';
import Slider from '~/components/slider/Slider';
import TopoLink from '~/components/topoLink';
import AdventureCard from '~/components/adventures/adventureHeader';
import Container from '~/components/container';
import { formatFrenchDate } from '~/utils/date';
import { truncateText } from '~/utils/string';
import uniqBy from 'lodash/uniqBy.js';
import { getCoverPicture } from '~/services/adventureService';
import { Topo } from '../../config/types';
import Head from 'next/head';

type PropsType = {
	adventure: Adventure
}

const AdventurePage = ({ adventure }: PropsType) => {
	// sliderRef.subscribe((galleryInstance: LightGallery | null) => {
	// 	if (!galleryInstance) return;
	// 	gallery = galleryInstance;
	// });

	// adventureSlug = slugify(adventure.title);
	// if (browser) pageUrl = getUrlWithNewSlug(location, adventureSlug);
	// if (browser && $page.params.slug !== adventureSlug)
	// 	window.history.replaceState(null, '', pageUrl);

	const coverPicture = getCoverPicture(adventure)

	const pictures =
		coverPicture !== null
			? uniqBy([coverPicture, ...adventure.pictures], 'id')
			: adventure.pictures;

	// const openSlider = () => {
	// 	if (!coverPicture) return;
	// 	gallery.openGallery(findIndex(pictures, ['id', coverPicture.id]));
	// };

	return (
		<>
			<Head>
				<meta name="og:image" content={getCoverPicture(adventure)?.formats.medium.url || ''} />
				<meta name="og:title" content={adventure.title} />
				<meta name="og:description" content={adventure.short_description || truncateText(adventure.description)} />
			</Head>
			{/* <AdventureCard adventure={adventure} onClick={openSlider} /> */}
			<AdventureCard adventure={adventure} />
			<Container>
				<p className={`text-justify text-gray-800 text-xl font-sans font-thin leading-relaxed`}>
					{adventure.date &&
						<>
							<span className="italic">{formatFrenchDate(adventure.date)}</span>
							<br />
							<br />
						</>
					}
					<span dangerouslySetInnerHTML={{ __html: adventure.description || '' }} />
				</p>
				<br />
				<br />
				{adventure.topo?.length > 0 &&
					<>
						<b>Topo</b> :
						{adventure.topo.map((topo: Topo) => (
							<div key={topo.id}>
								<TopoLink topo={topo} />
								<br />
							</div>
						))}
					</>
				}
				{adventure.pictures?.length > 0 &&
					<div className="mt-5" id="slider">
						<Slider pictures={pictures} />
					</div>
				}
			</Container>
		</>
	)
}

export default AdventurePage
