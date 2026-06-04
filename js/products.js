const getCategory = () => {
  fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => {
      const categoryList = document.getElementById("category-list");
      categoryList.innerHTML = "";

      data.forEach((category) => {
        categoryList.innerHTML += `
          <button class="px-5 py-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-600    hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200 capitalize">
          ${category}
           </button>
        `;
      });
    })
    .catch((err) => console.error("Error fetching category", err));
};
getCategory();

// const getCategory = () => {
//   fetch("https://fakestoreapi.com/products/categories").then((res) =>
//     res.json().then((data) => {
//       const categoryList = document.getElementById("category-list");

//       categoryList.innerHTML = "";

//       data.forEach((category) => {
//         categoryList.innerHTML = `
//         <div class= "bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md hover:border-indigo-600 transition-all cursor-pointer group">
//         <span class="capitalize font-semibold text-gray-700 group-hover:text-indigo-600 text-lg">
//               ${category}
//             </span></div>
//         `;
//       });
//       // console.log(data);
//     }),
//   );
//   // .catch((err) =>console.error("error fetching category",err))
// };
// getCategory();
