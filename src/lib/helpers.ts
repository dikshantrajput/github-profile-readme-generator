export const getUrlPathnameWithSearchParams = (url: URL | string) => {
	const urlObject = new URL(url);
	const searchParamsString = urlObject.searchParams.toString();

	return `${urlObject.pathname}${searchParamsString ? `?${searchParamsString}` : ''}`;
}

