const WISHLIST_KEY = 'user_wishlist';

export function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
}

export function toggleWishlist(product) {
  const wishlist = getWishlist();
  const exists = wishlist.find(item => item.id === product.id);

  let updated;
  if (exists) {
    updated = wishlist.filter(item => item.id !== product.id);
  } else {
    updated = [...wishlist, product];
  }

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
}

export function isInWishlist(productId) {
  return getWishlist().some(item => item.id === productId);
}