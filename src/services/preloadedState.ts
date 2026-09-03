export const loadFavoriteState = () => {
  const userRaw = localStorage.getItem("user");
  let favorites = {};

  if (userRaw) {
    try {
      const user = JSON.parse(userRaw);
      const userId = user?.id;
      const favoritesRaw = localStorage.getItem(`favorites_${userId}`);
      favorites = favoritesRaw ? JSON.parse(favoritesRaw) : {};
    } catch {
      favorites = {};
    }
  }
  return favorites
};
