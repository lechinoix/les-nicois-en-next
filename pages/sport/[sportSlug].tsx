import type { Adventure, Sport } from '~/config/types';
import { getAllSports, getSportBySlug } from '~/services/sportService';
import AdventureCover from '~/components/adventures/adventureCover';
import { AdventureStatus, CoverTypes } from '~/config/constants';
import LargeCover from '~/components/coverPicture/largeCover';
import ResponsiveGrid from '~/components/ui/responsiveGrid';
import { useMemo } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import SimpleLayout from '~/components/layouts/SimpleLayout';

type PropsType = {
	sport: Sport
	allSports: Sport[]
}

export const getServerSideProps = async ({ params }: GetServerSidePropsContext): Promise<{ props: PropsType }> => {
	if (!params?.sportSlug) throw new Error('You need to specify a sportSlug');
	if (Array.isArray(params.sportSlug)) throw new Error('Only one sport slug can be used');

	const allSports = await getAllSports()
	const sport = await getSportBySlug(params.sportSlug);
	return { props: { sport, allSports } }
}

const SportPage = ({ sport, allSports }: PropsType) => {
	const sportTiles = useMemo(() => sport.adventures
		.filter((adventure: Adventure) => adventure.status === AdventureStatus.DONE)
		.sort((a: Adventure, b: Adventure) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((adventure: Adventure) => ({
			component: AdventureCover,
			props: { adventure, coverType: CoverTypes.SMALL },
			key: `${adventure.id}`
		})), [sport]);

	return (
		<SimpleLayout sports={allSports}>
			<Head>
				<meta name="og:image" content={sport.cover_picture.picture.formats.medium.url} />
				<meta name="og:title" content={sport.name} />
				<meta name="og:description" content={`Toutes les sorties de ${sport.name}`} />
			</Head>
			{sport?.cover_picture &&
				<LargeCover
					picture={sport.cover_picture.picture}
					position={sport.cover_picture.position}
					title={sport.name}
				/>
			}
			<div className="my-7 mx-5 lg:mx-12 lg:my-10">
				<ResponsiveGrid items={sportTiles} />
			</div>
		</SimpleLayout>
	)
}

export default SportPage
