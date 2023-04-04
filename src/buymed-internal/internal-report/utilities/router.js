export function replaceChangeParameter(key, value) {
    const url = new URL(window.location);
    if (url) {
        url.searchParams.set(
            key,
            value
        );
        window.history.replaceState(
            null,
            '',
            url.toString()
        );
    }

}

export const convertParameter = (location) => location ? decodeURIComponent(location).split(',') : []