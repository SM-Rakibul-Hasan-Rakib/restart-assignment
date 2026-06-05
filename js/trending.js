const loadTrendingProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    const trendingProducts = products
      .sort((a, b) => b.rating.count - a.rating.count)
      .slice(0, 8);

    displayTrendingProducts(trendingProducts);
  } catch (error) {
    console.log(error);
  }
};

const displayTrendingProducts = (products) => {
  const container = document.getElementById("trending-products");

  container.innerHTML = "";

  products.forEach((product) => {
    container.innerHTML += `
      <div class="bg-white rounded-xl shadow p-4">

        <div class="bg-gray-100 rounded-xl h-56 flex items-center justify-center mb-4">
          <img
            src="${product.image}"
            alt="${product.title}"
            class="h-40 object-contain"
          >
        </div>

        <h3 class="font-bold mb-2 line-clamp-2">
          ${product.title}
        </h3>

        <p class="text-indigo-600 font-bold text-xl mb-4">
          $${product.price}
        </p>

        <div class="grid grid-cols-2 gap-2">
          <button
            onclick="loadDisplayDetails(${product.id})"
            class="border border-gray-300 rounded-lg py-2"
          >
            Details
          </button>

          <button
            onclick="addToCart(${product.id})"
            class="bg-indigo-600 text-white rounded-lg py-2"
          >
            Add Cart
          </button>
        </div>

      </div>
    `;
  });
};

const loadDisplayDetails = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    displayDetails(product);
  } catch (error) {
    console.log(error);
  }
};

const displayDetails = (product) => {
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
    <div class="grid md:grid-cols-2 gap-8">

      <div class="bg-gray-100 rounded-xl p-6 flex justify-center items-center">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="h-72 object-contain"
        >
      </div>

      <div>
        <span class="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm capitalize">
          ${product.category}
        </span>

        <h2 class="text-2xl font-bold mt-4 mb-3">
          ${product.title}
        </h2>

        <div class="flex gap-2 mb-4">
          <span class="text-yellow-500">★</span>
          <span>${product.rating.rate}</span>
          <span class="text-gray-500">
            (${product.rating.count} Reviews)
          </span>
        </div>

        <p class="text-gray-600 mb-5">
          ${product.description}
        </p>

        <h3 class="text-3xl font-bold text-indigo-600 mb-4">
          $${product.price}
        </h3>

        <button
          onclick="addToCart(${product.id})"
          class="bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          Add To Cart
        </button>
      </div>

    </div>
  `;

  document.getElementById("my_modal_1").showModal();
};

const cart = [];

const addToCart = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  cart.push(product);

  alert(`${product.title} added to cart`);
  console.log(cart);
};

loadTrendingProducts();
