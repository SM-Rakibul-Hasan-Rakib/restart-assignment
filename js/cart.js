let cart = JSON.parse(localStorage.getItem("cart")) || [];

function openCartModal() {
  document.getElementById("cart_modal").showModal();
}

// Navbar badge update
const updateCartCount = () => {
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    cartCount.innerText = cart.length;
  }
};

// Add To Cart
const addToCart = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product Added To Cart");
  } catch (error) {
    console.log(error);
  }
};

// Remove Cart Item
const removeFromCart = (index) => {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  displayCartItems();
};

// Show Cart Modal
const displayCartItems = () => {
  const cartItems = document.getElementById("cart-items");

  if (!cartItems) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="text-center text-gray-500">
        Cart is Empty
      </p>
    `;
    return;
  }

  cart.forEach((item, index) => {
    cartItems.innerHTML += `
      <div class="flex items-center gap-4 border-b py-3">

        <img
          src="${item.image}"
          class="w-14 h-14 object-contain"
        />

        <div class="flex-1">
          <h4 class="font-semibold text-sm line-clamp-2">
            ${item.title}
          </h4>

          <p class="text-indigo-600 font-bold">
            $${item.price}
          </p>
        </div>

        <button
          onclick="removeFromCart(${index})"
          class="text-red-500"
        >
          Remove
        </button>

      </div>
    `;
  });
};

// Open Cart Modal
const openCartModal = () => {
  displayCartItems();

  document.getElementById("cart_modal").showModal();
};

updateCartCount();
