import type { Adventure, Sport } from '~/config/types';
import { getSportBySlug } from '~/services/sportService';
import AdventureCover from '~/components/adventures/adventureCover';
import { AdventureStatus, CoverTypes } from '~/config/constants';
import LargeCover from '~/components/coverPicture/largeCover';
import ResponsiveGrid from '~/components/ui/responsiveGrid';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';
import { useMemo } from 'react';

type LoaderDataType = {
	sport: Sport
}

export const loader: LoaderFunction = async ({ params }): Promise<LoaderDataType> => {
	if (!params.sportSlug) throw new Error('You need to specify a sportSlug');

	const sport = await getSportBySlug(params.sportSlug);
	return { sport }
}


export const meta: MetaFunction = ({ data: { sport } }) => ({
	"og:image": sport.cover_picture.picture.formats.medium.url,
	"og:title": sport.name,
	"og:description": `Toutes les sorties de ${sport.name}`
})

export default () => {
	const { sport } = useLoaderData<LoaderDataType>();
	const sportTiles = useMemo(() => sport.adventures
		.filter((adventure) => adventure.status === AdventureStatus.DONE)
		.sort((a: Adventure, b: Adventure) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((adventure) => ({
			component: AdventureCover,
			props: { adventure, coverType: CoverTypes.SMALL },
			key: `${adventure.id}`
		})), [sport]);

	return (
		<>
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
		</>
	)
}

