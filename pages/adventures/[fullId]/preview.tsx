import { getPreviewById } from '~/services/adventureService';
import type { Adventure, Sport } from '~/config/types';
import AdventurePage from '~/components/adventures/adventurePage';
import { extractIdAndSlug } from '~/utils/url';
import { GetServerSidePropsContext } from 'next/types';
import SimpleLayout from '~/components/layouts/SimpleLayout';
import { getAllSports } from '~/services/sportService';

type PropsType = { adventure: Adventure, allSports: Sport[] }

export const getServerSideProps = async ({ params, query }: GetServerSidePropsContext): Promise<{ props: PropsType }> => {
	if (!params?.fullId) throw new Error('Could not find fullId url param')
	if (!query?.token) throw new Error('Could not find token in query string')
	if (Array.isArray(params.fullId)) throw new Error('Multiple fullid not allowed')
	if (Array.isArray(query.token)) throw new Error('Multiple tokens not allowed')

	const { id } = extractIdAndSlug(params.fullId)
	const adventure = await getPreviewById(id, query.token);
	const allSports = await getAllSports()
	return { props: { adventure, allSports } }
}

const PreviewPage = ({ adventure, allSports }: PropsType) => (
	<SimpleLayout sports={allSports}>
		<AdventurePage adventure={adventure} />
	</SimpleLayout>
)

export default PreviewPage

