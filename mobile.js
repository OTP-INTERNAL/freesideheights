/* mobile layout */
document.addEventListener("DOMContentLoaded", (event) => {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  	var mainBody = document.getElementsByClassName("mainBody")[0];
    var menuColumn = document.getElementsByClassName("menuColumn")[0];
    var menuBox = document.getElementsByClassName("nav")[0]
    var bodyColumn = document.getElementsByClassName("bodyColumn")[0];
    var galleryBar = document.getElementById("gallery")
    var galleryImage = document.getElementById("gallery").children[0];
    var galleryModalImage = document.getElementById("galleryImage");

  	mainBody.classList.add("flex-column");
    mainBody.style.height = "";
    mainBody.style.width = "";

    menuColumn.classList.remove("col");
    menuColumn.classList.remove("col-lg-auto");



    galleryBar.style.alignItems = "";
    galleryBar.style.display = "";
    galleryImage.src = "assets/sidebar/gallery-mobile.png";
    galleryImage.style.maxWidth = "100%";

    galleryModalImage.style.maxWidth = "100vw";
    galleryModalImage.style.maxHeight = "";
  }
});