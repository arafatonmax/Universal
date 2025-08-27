import { renderProductDetails } from './Cells/productRenderer.js';
import { addToCart } from './Cells/cartManager.js';
import { toggleWishlist, isInWishlist } from './Cells/wishlist.js';

export async function loadProductPage(productId, containerId) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);
    if (!res.ok) throw new Error('Product not found');

    const product = await res.json();
    console.log(product);

    renderProductDetails(product, containerId, {
      onAddToCart: () => addToCart(product),
      onToggleWishlist: () => toggleWishlist(product),
      isWishlisted: isInWishlist(product.id)
    });

  } 
  catch (err) {
    console.error('Failed to load product:', err);
    document.getElementById(containerId).innerHTML = `<p>Sorry, this product is unavailable.</p>`;
  }
}
loadProductPage("product-1234567890abcdefg", 'product');
// https://mega.nz/folder/0uoRXIpR#WHAxQmBbKyeUWvCA7wfF1g