import { renderProductDetails } from './Cells/productRenderer.js';
import { addToCart } from './Cells/cartManager.js';
import { toggleWishlist, isInWishlist } from './Cells/wishlist.js';
import { useUrl } from './Cells/commonFun.js';
import { makeURL } from './Cells/commonFun.js';
import { renderReviewSection } from './Cells/reviewRenderar.js';

function loadData(){
  const {id} = useUrl();
  const uRl = makeURL(`/item/${id}`);
  fetch(uRl)
  .then(res => res.json())
  .then(res => {
    renderProductDetails(res, 'product', { onAddToCart: () => addToCart(res), onToggleWishlist: () => toggleWishlist(res), isWishlisted: isInWishlist(id)});
    renderReviewSection(res.review, 'reviews');

  })
}
loadData();



// export async function loadProductPage(Id, containerId) {
//   try {
//     const URL = makeURL(`/products/id=${Id}`);
//     const res = await fetch(URL);
//     

//     const product = await res.json();
//     console.log(product);

    // renderProductDetails(product, containerId, {
    //   onAddToCart: () => addToCart(product),
    //   onToggleWishlist: () => toggleWishlist(product),
    //   isWishlisted: isInWishlist(product.id)
    // });

//   } 
//   catch (err) {
//     console.error('Failed to load product:', err);
//     document.getElementById(containerId).innerHTML = `<p>Sorry, this product is unavailable.</p>`;
//   }
// }

// loadProductPage(id, 'product');



// https://mega.nz/folder/0uoRXIpR#WHAxQmBbKyeUWvCA7wfF1g