import { getAllAdventures } from '~/services/adventureService';
import { LoaderFunction, useLoaderData } from 'remix';
import AdventureCard from '~/components/adventures/adventureCard';
import type { Adventure } from '~/config/types';

type LoaderDataType = {
	adventures: Adventure[]
}

export const loader: LoaderFunction = async (): Promise<LoaderDataType> => {
	const adventures = await getAllAdventures();
	return { adventures };
}

export default () => {
	const { adventures } = useLoaderData<LoaderDataType>();
	return (
		<main className="h-screen pt-20 grid grid-cols-2">
			<section className="h-full overflow-hidden pl-3">
				{adventures.map(adventure => <AdventureCard adventure={adventure} />)}
			</section>
			<section>
				<img src="/img/fake-map.png" />
			</section>
		</main>
	)
}
