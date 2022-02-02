import { getPreviewById } from '~/services/adventureService';
import type { Adventure } from '~/config/types';
import AdventurePage from './_components/adventurePage';
import { extractIdAndSlug } from '~/utils/url';
import { GetServerSidePropsContext } from 'next/types';

type PropsType = { adventure: Adventure }

export const getInitalProps = async ({ params, query }: GetServerSidePropsContext): Promise<{ props: PropsType }> => {
	if (!params?.fullId) throw new Error('Could not find fullId url param')
	if (!query?.token) throw new Error('Could not find token in query string')
	if (Array.isArray(params.fullId)) throw new Error('Multiple fullid not allowed')
	if (Array.isArray(query.token)) throw new Error('Multiple tokens not allowed')

	const { id } = extractIdAndSlug(params.fullId)
	const adventure = await getPreviewById(id, query.token);
	return { props: { adventure } }
}

export default AdventurePage

