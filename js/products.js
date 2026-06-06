let allProducts = [];
let activeButton = null;

const loadAllProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    allProducts = products;
    displayCard(products);
  } catch (error) {
    console.log("Error fetching all products", error);
  }
};

const setupSearch = () => {
  const searchInput = document.getElementById("search-input");

  searchInput.addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();

    const filteredProducts = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchText),
    );

    displayCard(filteredProducts);
  });
};

const getCategory = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");

    const categories = await res.json();

    const categoryList = document.getElementById("category-list");

    categoryList.innerHTML = "";

    // All Button
    const allBtn = document.createElement("button");

    allBtn.textContent = "All";

    allBtn.className =
      "px-5 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white shadow-lg scale-105 transition-all duration-300";

    activeButton = allBtn;

    allBtn.addEventListener("click", () => {
      loadAllProducts();

      if (activeButton) {
        activeButton.classList.remove(
          "bg-indigo-600",
          "text-white",
          "shadow-lg",
          "scale-105",
        );

        activeButton.classList.add("bg-white", "text-gray-600");
      }

      allBtn.classList.remove("bg-white", "text-gray-600");

      allBtn.classList.add(
        "bg-indigo-600",
        "text-white",
        "shadow-lg",
        "scale-105",
      );

      activeButton = allBtn;
    });

    categoryList.appendChild(allBtn);

    // Category Buttons
    categories.forEach((category) => {
      const button = document.createElement("button");

      button.textContent = category;

      button.className =
        "px-5 py-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 capitalize";

      button.addEventListener("click", () => {
        loadCard(category);

        if (activeButton) {
          activeButton.classList.remove(
            "bg-indigo-600",
            "text-white",
            "shadow-lg",
            "scale-105",
          );

          activeButton.classList.add("bg-white", "text-gray-600");
        }

        button.classList.remove("bg-white", "text-gray-600");

        button.classList.add(
          "bg-indigo-600",
          "text-white",
          "shadow-lg",
          "scale-105",
        );

        activeButton = button;
      });

      categoryList.appendChild(button);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const loadCard = async (category) => {
  try {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`,
    );

    const products = await res.json();

    displayCard(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const displayCard = (products) => {
  const container = document.getElementById("card-container");

  if (!container) {
    console.error("product-container not found");
    return;
  }

  container.innerHTML = "";

  // কার্ডগুলোকে গ্রিড লেআউটে সাজানোর জন্য কন্টেইনারে ক্লাস যোগ করা (যদি আগে থেকে না থাকে)
  container.className =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4";

  products.forEach((product) => {
    container.innerHTML += `
      <div class="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
        <div>
          <!-- প্রোডাক্ট ইমেজ ব্যাকগ্রাউন্ড (স্ক্রিনশটের মতো হালকা গ্রে) -->
          <div class="bg-gray-100 rounded-xl p-6 h-60 flex items-center justify-center overflow-hidden mb-4">
            <img src="${product.image}" class="h-full w-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-200" alt="${product.title}">
          </div>

          <!-- ক্যাটাগরি এবং রেটিং সেকশন -->
          <div class="flex items-center justify-between mb-2">
            <span class="bg-indigo-50 text-indigo-600 text-xs font-medium px-2.5 py-1 rounded-md capitalize">
              ${product.category}
            </span>
            <div class="flex items-center gap-1 text-sm text-gray-600">
              <span class="text-amber-400">★</span>
              <span class="font-semibold text-gray-700">${product.rating?.rate || 0}</span>
              <span class="text-gray-400">(${product.rating?.count || 0})</span>
            </div>
          </div>

          <!-- প্রোডাক্ট টাইটেল (২ লাইনে লিমিট করা) -->
          <h2 class="text-gray-800 font-bold text-base line-clamp-2 mb-2 min-h-[3rem]" title="${product.title}">
            ${product.title}
          </h2>
        </div>

        <div>
          <!-- প্রাইস সেকশন -->
          <p class="text-gray-900 font-extrabold text-xl mb-4">
            $${product.price}
          </p>

          <!-- বাটন গ্রুপ (Details & Add) -->
          <div class="grid grid-cols-2 gap-2">
            <button  onClick="loadDisplayDetails(${product.id})" class="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors w-full">
              <!-- Details Eye Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Details
            </button>
            
            <button onclick = "addToCart(${product.id})" class="flex items-center justify-center gap-1.5 bg-indigo-600 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors w-full shadow-sm">
              <!-- Add Cart Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
    `;
  });
};

// displayDetails

const loadDisplayDetails = async (id) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();

    displayDetails(product);
  } catch (error) {
    console.log("Details Error:", error);
  }
};

const displayDetails = (product) => {
  const displayContainer = document.getElementById("details-container");

  displayContainer.innerHTML = `
    <div class="grid md:grid-cols-2 gap-8 items-center">

      <div class="bg-slate-100 rounded-2xl p-8 flex justify-center items-center">
        <img
          src="${product.image}"
          alt="${product.title}"
          class="h-80 object-contain"
        />
      </div>

      <div>
        <span class="inline-block bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium capitalize mb-4">
          ${product.category}
        </span>

        <h2 class="text-2xl font-bold text-gray-800 mb-4">
          ${product.title}
        </h2>

        <div class="flex items-center gap-2 mb-4">
          <span class="text-yellow-500 text-lg">★</span>
          <span class="font-semibold">${product.rating.rate}</span>
          <span class="text-gray-500">
            (${product.rating.count} Reviews)
          </span>
        </div>

        <p class="text-gray-600 leading-relaxed mb-6">
          ${product.description}
        </p>

        <h3 class="text-3xl font-bold text-indigo-600 mb-6">
          $${product.price}
        </h3>

        <button onclick = "addToCart(${product.id})"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Add To Cart
        </button>
      </div>

    </div>
  `;

  document.getElementById("my_modal_1").showModal();
};

getCategory();
loadAllProducts();
setupSearch();
