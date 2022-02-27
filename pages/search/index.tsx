import { getAdventureRoute, getAllAdventures } from '~/services/adventureService';
import AdventureCard from '~/components/adventures/adventureCard';
import Map from '~/components/map'
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
				<section className="h-full overflow-scroll pl-3 cursor-pointer">
					{adventures.map(adventure => <a href={getAdventureRoute(adventure)} key={adventure.id}><AdventureCard adventure={adventure} /></a>)}
				</section>
				<section className="w-full h-full">
					<Map adventures={adventures} />
				</section>
			</main>
		</SimpleLayout>
	)
}

export default SearchPage
