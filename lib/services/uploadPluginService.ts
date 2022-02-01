import config from '~/config/env';
import type { Picture } from '~/config/types';

export const fetchPictureById = async (fetch: any, pictureId: string): Promise<Picture> => {
	const res = await fetch(`${config.BASE_API_URL}/upload/files/${pictureId}`);
	if (!res.ok) throw new Error(res.statusText);

	const picture = await res.json();
	return picture;
};
