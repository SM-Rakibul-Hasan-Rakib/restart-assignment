const getCategory = () => {
  fetch("https://fakestoreapi.com/products/categories").then((res) =>
    res.json().then((data) => {
      const categoryList = document.getElementById("category-list");

      categoryList.innerHTML = "";

      data.forEach(categoryk);
      // console.log(data);
    }),
  );
};
getCategory();
