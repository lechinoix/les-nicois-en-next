import config from '~/config/env';
import { AdventureStatus } from '~/config/constants';
import type { Adventure, Picture } from '~/config/types';
import { marked } from 'marked';
import { ROUTES } from '~/config/routes';
import { slugify } from '~/utils/string';

const fetchAdventures = async (searchParams: URLSearchParams) => {
	const res = await fetch(`${config.BASE_API_URL}/adventures?${searchParams.toString()}`);
	if (!res.ok) throw new Error(res.statusText);

	const adventures = await res.json();
	return adventures.map((adventure: Adventure) => {
		adventure.description = adventure.description ? marked(adventure.description) : ''
		return adventure;
	});
};

export const getAllAdventures = async (): Promise<Adventure[]> =>
	fetchAdventures(new URLSearchParams());

export const getAdventuresDone = async (): Promise<Adventure[]> => {
	const searchParams = new URLSearchParams({
		status: AdventureStatus.DONE,
		_sort: 'date:DESC'
	});

	return await fetchAdventures(searchParams);
};

export const getLatestAdventures = async (): Promise<Adventure[]> => {
	const adventures = await getAdventuresDone();
	return adventures.slice(0, 3);
};

export const getAdventureById = async (adventureId: string): Promise<Adventure> => {
	const res = await fetch(`${config.BASE_API_URL}/adventures/${adventureId}`);
	if (!res.ok) throw new Error(res.statusText);

	const adventures = await res.json();
	return adventures;
};

export const getPreviewById = async (
	adventureId: string,
	apiToken: string | null
): Promise<Adventure> => {
	const res = await fetch(
		`${config.BASE_API_URL}/content-manager/collection-types/application::adventure.adventure/${adventureId}`,
		{
			headers: {
				Authorization: `Bearer ${apiToken}`
			}
		}
	);
	if (!res.ok) throw new Error(res.statusText);

	const adventures = await res.json();
	return adventures;
};

export const formatAssetUrl = (assetUrl: string): string =>
	assetUrl.startsWith('/') ? `${config.BASE_API_URL}${assetUrl}` : assetUrl;

export const getCoverPicture = (adventure: Adventure): Picture | null =>
	adventure.cover_picture
		? adventure.cover_picture.picture
		: adventure.pictures.length > 0
		? adventure.pictures[0]
		: null;

export const getAdventureRoute = (adventure: Adventure) => `${ROUTES.ADVENTURES.BY_ID}${adventure.id}_${slugify(adventure.title)}`
