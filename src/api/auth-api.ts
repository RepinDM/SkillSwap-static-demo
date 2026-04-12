export const apiAuth = async (url: string, options: RequestInit = {}) => {
    const accessToken = localStorage.getItem("accessToken");

    const headers: HeadersInit = {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...((options.body instanceof FormData)
            ? {}
            : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
    };

    return fetch(url, {
        ...options,
        headers,
    });
};