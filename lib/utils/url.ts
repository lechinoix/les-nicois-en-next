export const getUrlWithNewSlug = (location: Location, slug: string): string => {
	const urlSlugMatcher = /^(.*)_[a-z-]*(.*)/;
	const match = new RegExp(urlSlugMatcher).exec(location.href);

	if (!match) throw new Error('Current location does not have the required format')
	const [, urlWithoutSlug, endOfUrl] = match;

	return `${urlWithoutSlug}_${slug}${endOfUrl}`;
};

export const extractIdAndSlug = (fullId: string) => {
	const match = new RegExp(/^([0-9]*)_([a-zA-Z0-9-]*)$/).exec(fullId)

	if (!match) throw new Error('Could not extract id and slug')
	const [, id, slug] = match

	return { id, slug }
}
