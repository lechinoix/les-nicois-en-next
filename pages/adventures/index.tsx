import { HOMEPAGE_US_IMAGE_URL } from '~/config/constants';
import type { Adventure } from '~/config/types';
import { getAdventuresDone } from '~/services/adventureService';
import { truncateText } from '~/utils/string';
import AdventureCard from '~/components/adventures/adventureHeader';
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix';

type LoaderDataType = {
	adventures: Adventure[]
}

export const loader: LoaderFunction = async (): Promise<LoaderDataType> => {
	const adventures = await getAdventuresDone();

	return { adventures }
}

export const meta: MetaFunction = ({ data: adventures }) => {
	const latestAdventurePictureUrl = adventures?.length > 0 && adventures[0].cover_picture ?
			(adventures[0].cover_picture.picture.formats.medium.url)
			: HOMEPAGE_US_IMAGE_URL;

	return {
		"og:image": latestAdventurePictureUrl,
		"og:title": "Nos aventures",
		"og:description": "La liste de toutes les aventures"
	}
}

export default () => {
	const { adventures } = useLoaderData<LoaderDataType>()

	return (
		<>
			{adventures.map(adventure => (
				<AdventureCard adventure={adventure}>
					<p className="text-justify text-gray-800 text-xl font-serif font-light leading-relaxed pt-7">
						{adventure.short_description || truncateText(adventure.description)}
					</p>
				</AdventureCard>
			))}
		</>
	)
}

