const loadNavbar = async () => {
  const response = await fetch("/components/navbar.html");
  const data = await response.text();

  document.getElementById("navbar").innerHTML = data;
};
loadNavbar();
