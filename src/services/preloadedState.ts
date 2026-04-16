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

export const loadLikesState = () => {
  const favorites = loadFavoriteState();
  const likes: Record<number, { count: number; isLiked: boolean }> = {};

  Object.keys(favorites).forEach((id) => {
    likes[Number(id)] = {
      isLiked: true,
      count: Math.floor(Math.random() * 101),
    };
  });
  return { likes };
};