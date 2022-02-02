import { getAllAdventures } from '~/services/adventureService';
import AdventureCard from '~/components/adventures/adventureCard';
import type { Adventure, Sport } from '~/config/types';
import { getAllSports } from '~/services/sportService';
import SimpleLayout from '~/components/layouts/SimpleLayout';

type PropsType = {
	adventures: Adventure[],
	allSports: Sport[]
}

export const getStaticProps = async (): Promise<{ props: PropsType }> => {
	const adventures = await getAllAdventures();
	const allSports = await getAllSports();
	return { props: { adventures, allSports } };
}

const SearchPage = ({ adventures, allSports }: PropsType) => {
	return (
		<SimpleLayout sports={allSports}>
			<main className="h-screen pt-20 grid grid-cols-2">
				<section className="h-full overflow-hidden pl-3">
					{adventures.map(adventure => <AdventureCard key={adventure.id} adventure={adventure} />)}
				</section>
				<section>
					<img src="/img/fake-map.png" />
				</section>
			</main>
		</SimpleLayout>
	)
}

export default SearchPage
