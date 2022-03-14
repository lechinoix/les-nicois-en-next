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
import Head from 'next/head'
import SimpleLayout from '~/components/layouts/SimpleLayout';
import useSWR, { SWRConfig } from 'swr';
import Loader from '~/components/loader';

export const getStaticProps = async (): Promise<{ props: ServerPropsType }> => {
	const latestAdventures = await getLatestAdventures();
	const coverPicture = await fetchPictureById(env.COVER_PICTURE_ID);
	const sports = await getAllSports();

	const fallback = { latestAdventures, coverPicture, sports }

	return { props: { fallback } }
};

type PropsType = {
	latestAdventures: Adventure[];
	coverPicture: Picture;
	sports: Sport[];
}

type ServerPropsType = { fallback: PropsType }

const HomePage = ({ latestAdventures, coverPicture, sports }: PropsType) => {
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
		<SimpleLayout sports={sports}>
			<Head>
				<meta name="og:image" content={coverPicture.formats.medium.url} />
				<meta name="og:title" content={DEFAULT_TITLE} />
				<meta name="og:description" content={DEFAULT_DESCRIPTION} />
			</Head>
			<HomeCover picture={coverPicture} position={PicturePosition.TOP_LEFT} />
			<div className="p-10 flex flex-col w-full justify-center items-center">
				<div className="flex justify-center flex-col md:flex-row mx-5">
					<div className="flex flex-col mb-10 md:mb-0 md:mr-10">
						<strong className="font-light text-3xl">HELLO</strong>
						<br />
						<p className="text-xl text-justify font-sans font-thin">
							Nous sommes un couple de jeunes aventuriers à la recherche de sensations fortes en montagne
							! Basés sur Grenoble, on pratique l&apos;alpinisme, l&apos;escalade et le ski.
							<br />
							Notre objectif : raconter nos aventures, donner envie de s’installer dans cette belle région
							et de se lancer dans l’aventure outdoor quel quelle soit ..
						</p>
					</div>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						className="w-full md:w-96"
						src={HOMEPAGE_US_IMAGE_URL}
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
		</SimpleLayout>
	)
}

const LazyHomepage = () => {
	const { data: latestAdventures } = useSWR('getLatestAdventures', getLatestAdventures);
	const { data: coverPicture } = useSWR('fetchPictureById', () => fetchPictureById(env.COVER_PICTURE_ID));
	const { data: sports } = useSWR('getAllSports', getAllSports);

	if (!latestAdventures || !coverPicture || !sports) return <div className="absolute w-full h-full flex item-center justify-center"><Loader /></div>

	return <HomePage latestAdventures={latestAdventures} coverPicture={coverPicture} sports={sports} />
}

const WrappedHomePage = (serverProps: ServerPropsType) => {
	return (
		<SWRConfig value={serverProps}>
			<LazyHomepage />
		</SWRConfig>
	)
}

export default WrappedHomePage;
