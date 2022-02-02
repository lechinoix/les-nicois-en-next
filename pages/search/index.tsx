import { getAllAdventures } from '~/services/adventureService';
import AdventureCard from '~/components/adventures/adventureCard';
import type { Adventure } from '~/config/types';
import { GetStaticPropsContext } from 'next/types';

type PropsType = {
	adventures: Adventure[]
}

export const getStaticProps = async ({ params }: GetStaticPropsContext): Promise<{ props: PropsType }> => {
	const adventures = await getAllAdventures();
	return { props: { adventures } };
}

const SearchPage = ({ adventures }: PropsType) => {
	return (
		<main className="h-screen pt-20 grid grid-cols-2">
			<section className="h-full overflow-hidden pl-3">
				{adventures.map(adventure => <AdventureCard key={adventure.id} adventure={adventure} />)}
			</section>
			<section>
				<img src="/img/fake-map.png" />
			</section>
		</main>
	)
}

export default SearchPage
