import { getPreviewById } from '~/services/adventureService';
import type { Adventure } from '~/config/types';
import AdventurePage, { links as adventurePageLinks } from './_components/adventurePage';
import { LoaderFunction, useLoaderData } from 'remix';
import { extractIdAndSlug } from '~/utils/url';

type LoaderDataType = { adventure: Adventure }

export const links = adventurePageLinks;

export const loader: LoaderFunction = async ({ params, request }): Promise<LoaderDataType> => {
	if (!params.fullId) throw new Error('Could not find fullId url param')

	const { id } = extractIdAndSlug(params.fullId)
	const url = new URL(request.url);
	const adventure = await getPreviewById(id, url.searchParams.get('token'));
	return { adventure }
}

export default () => {
	const { adventure } = useLoaderData<LoaderDataType>()

	return (<AdventurePage adventure={adventure} />)
}

