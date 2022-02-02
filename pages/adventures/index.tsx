import { HOMEPAGE_US_IMAGE_URL } from '~/config/constants';
import type { Adventure, Sport } from '~/config/types';
import { getAdventuresDone } from '~/services/adventureService';
import { truncateText } from '~/utils/string';
import AdventureCard from '~/components/adventures/adventureHeader';
import Head from 'next/head';
import { getAllSports } from '~/services/sportService';
import SimpleLayout from '~/components/layouts/SimpleLayout';

type PropsType = {
	adventures: Adventure[],
	allSports: Sport[]
}

export const getStaticProps = async (): Promise<{ props: PropsType }> => {
	const adventures = await getAdventuresDone();
	const allSports = await getAllSports();

	return { props: { adventures, allSports } }
}

const AllAdventuresPage = ({ adventures, allSports }: PropsType) => {
	const latestAdventurePictureUrl = adventures?.length > 0 && adventures[0].cover_picture ?
			(adventures[0].cover_picture.picture.formats.medium.url)
			: HOMEPAGE_US_IMAGE_URL;

	return (
		<SimpleLayout sports={allSports}>
			<Head>
				<meta name="og:image" content={latestAdventurePictureUrl} />
				<meta name="og:title" content="Nos aventures" />
				<meta name="og:description" content="La liste de toutes les aventures" />
			</Head>
			{adventures.map(adventure => (
				<AdventureCard adventure={adventure} key={adventure.id}>
					<p className="text-justify text-gray-800 text-xl font-serif font-light leading-relaxed pt-7">
						{adventure.short_description || truncateText(adventure.description)}
					</p>
				</AdventureCard>
			))}
		</SimpleLayout>
	)
}

export default AllAdventuresPage
