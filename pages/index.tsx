import type { Adventure, Picture, Sport } from '~/config/types';
import {
	CoverTypes,
	DEFAULT_DESCRIPTION,
	DEFAULT_TITLE,
	HOMEPAGE_US_IMAGE_URL,
	PicturePosition
} from '~/config/constants';
import AdventureCover from '~/components/adventures/adventureCover';
import { ROUTES } from '~/config/routes';
import SeparatorTitle from '~/components/ui/separatorTitle';
import ResponsiveGrid from '~/components/ui/responsiveGrid';
import SmallCover from '~/components/coverPicture/smallCover';
import HomeCover from '~/components/coverPicture/homeCover';
import env from '~/config/env';
import { getLatestAdventures } from '~/services/adventureService';
import { getAllSports } from '~/services/sportService';
import { fetchPictureById } from '~/services/uploadPluginService';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';

export const loader: LoaderFunction = async (): Promise<LoaderDataType> => {
	const latestAdventures = await getLatestAdventures();
	const coverPicture = await fetchPictureById(fetch, env.COVER_PICTURE_ID);
	const sports = await getAllSports();

	return { latestAdventures, coverPicture, sports }
};

type LoaderDataType = {
	latestAdventures: Adventure[];
	coverPicture: Picture;
	sports: Sport[];
}

export const meta: MetaFunction = ({ data }) => ({
	"og:image": data.coverPicture.formats.medium.url,
	"og:title": DEFAULT_TITLE,
	"og:description": DEFAULT_DESCRIPTION,
})

export default () => {
	const { latestAdventures, coverPicture, sports } = useLoaderData<LoaderDataType>()

	const adventureItems = latestAdventures.map((adventure) => ({
		component: AdventureCover,
		props: { adventure, coverType: CoverTypes.SMALL },
		key: `${adventure.id}`
	}));

	const sportItems = sports.map((sport) => ({
		component: SmallCover,
		props: {
			picture: sport.cover_picture.picture,
			position: sport.cover_picture.position,
			title: sport.name,
			href: `/sport/${sport.slug}`
		},
		key: `${sport.id}`
	}));

	return (
		<>
			<HomeCover picture={coverPicture} position={PicturePosition.TOP_LEFT} />
			<div className="p-10 flex flex-col w-full justify-center items-center">
				<div className="flex justify-center flex-col md:flex-row mx-5">
					<div className="flex flex-col mb-10 md:mb-0 md:mr-10">
						<strong className="font-light text-3xl">HELLO</strong>
						<br />
						<p className="text-xl text-justify font-sans font-thin">
							Nous sommes un couple de jeunes aventuriers à la recherche de sensations fortes en montagne
							! Basés sur Grenoble, on pratique l'alpinisme, l'escalade et le ski.
							<br />
							Notre objectif : raconter nos aventures, donner envie de s’installer dans cette belle région
							et de se lancer dans l’aventure outdoor quel quelle soit ..
						</p>
					</div>
					<img
						src={HOMEPAGE_US_IMAGE_URL}
						className="w-full md:w-96"
						alt="Nous deux en haut du mont Coolidge, la Barre des Écrins est juste derrière !"
					/>
				</div>
				<SeparatorTitle title="Nos dernières sorties" />
				<div className="w-full">
					<ResponsiveGrid items={adventureItems} />
				</div>
				<a className="pt-5 text-xl text-gray-800 self-end" href={ROUTES.ADVENTURES.DONE}>En voir plus</a>
				<SeparatorTitle title="Nos sports" />
				<div className="w-full">
					<ResponsiveGrid items={sportItems} />
				</div>
			</div>
		</>
	)
}
