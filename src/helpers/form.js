/**
 * Return the search string from provided params
 * @param {*} params 
 * @returns 
 */
export function getSearchString(params) {
    const searchParams = new URLSearchParams(Object.entries(params));

    return searchParams.toString();
}