const loadAllProducts = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products = await res.json();

    displayCard(products);
  } catch (error) {
    console.log("Error fetching all products", error);
  }
};

const getCategory = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products/categories");

    const categories = await res.json();

    const categoryList = document.getElementById("category-list");

    categoryList.innerHTML = "";

    const allBtn = document.createElement("button");

    allBtn.textContent = "All";

    allBtn.className =
      "px-5 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white";

    allBtn.addEventListener("click", () => {
      // allBtn.style.display = "none";
      loadAllProducts();
    });

    categoryList.appendChild(allBtn);

    categories.forEach((category) => {
      const button = document.createElement("button");

      button.textContent = category;
      button.className =
        "px-2 py-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200 capitalize";

      button.addEventListener("click", () => {
        // allBtn.remove();
        loadCard(category);
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
            <button class="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors w-full">
              <!-- Details Eye Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Details
            </button>
            
            <button class="flex items-center justify-center gap-1.5 bg-indigo-600 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-indigo-700 transition-colors w-full shadow-sm">
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

getCategory();
loadAllProducts();
