export const fetchWithRefresh = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
};