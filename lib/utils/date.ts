const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'short',
	day: '2-digit'
};

export const formatFrenchDate = (date: string): string => {
	const parsedDate = new Date(date);
	return parsedDate.toLocaleDateString('fr-FR', DEFAULT_DATE_OPTIONS);
};
