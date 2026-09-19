const menuDict = new Map();
menuDict.set("home", ["contentHome","Home_Banner.png"]);
menuDict.set("commissions", ["contentCommissions","Comms_Banner.png"]);
menuDict.set("trello", ["contentTrello","Home_Banner.png"]);
menuDict.set("freeside", ["contentConstruction","Home_Banner.png"]);
menuDict.set("comics", ["contentConstruction","Home_Banner.png"]);
menuDict.set("socials", ["contentSocials","Home_Banner.png"]);
menuDict.set("gallery", ["contentGallery","AG_Banner.png"]);
const filePrefix = "assets/gallery/";
var nsfwBlurred = true;

/* cache JSON so we don't need to make multipme XML requests*/
var jsonCacheRequest = new XMLHttpRequest();
jsonCacheRequest.open("GET", "assets/gallery/0metadata.json", false);
jsonCacheRequest.send(null);
var globalTableData = JSON.parse(jsonCacheRequest.responseText);


function switchContent(obj, argid) {
	var contentBoxes = document.querySelectorAll(".contentBox");
	console.log(menuDict.get(argid)[0])

	var visibleBox = document.getElementById(menuDict.get(argid)[0]);

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
		if (document.getElementById(menuDict.get(argid)[0]+"Mobile")){
			visibleBox = document.getElementById(menuDict.get(argid)[0]+"Mobile");
		}
	}

	var allButtons = document.querySelectorAll(".naventry");
	var child = obj.getElementsByTagName("img")[0];
	for (var i = 0; i < allButtons.length; i++){
		allButtons[i].classList.remove("buttonSelected");
		restartAnimation(allButtons[i]);
	};
	for (var i = 0; i < contentBoxes.length; i++){
		contentBoxes[i].style.visibility = "hidden";
		contentBoxes[i].style.display = "none";
	}
	visibleBox.style.visibility = "visible";
	visibleBox.style.display = "initial";
	obj.classList.add("buttonSelected");
	obj.style.animation = "none";
	obj.style.background = "black";
	child.style.animation = "none";
	child.style.filter = "invert(100%)";

	document.getElementsByClassName("mainBanner")[0].src = "assets/banners/" + menuDict.get(argid)[1]
}

function highlightButton(obj){
	var child = obj.getElementsByTagName("img")[0];
	if (!obj.classList.contains("buttonSelected")){ /* if the button is not selected */
		obj.style.animationPlayState = "running";
		child.style.animationPlayState = "running";
	}
}

function unhighlightButton(obj){
	if (!obj.classList.contains("buttonSelected")){ /* if the button is not selected */
		restartAnimation(obj);
	}
}

function restartAnimation(obj){
	var child = obj.getElementsByTagName("img")[0];
	obj.style.animation = "none";
	obj.offsetHeight; /* trigger reflow */
	obj.style.animationName = "selectGlow";
	obj.style.animationDuration = "2s";
	obj.style.animationPlayState = "paused";
	obj.style.animationIterationCount = "infinite";
	obj.style.color = "black";

	child.style.animation = "none";
	child.offsetHeight;
	child.style.animationName = "selectGlowImg";
	child.style.animationDuration = "2s";
	child.style.animationPlayState = "paused";
	child.style.animationIterationCount = "infinite";
	child.style.filter = "invert(0%)";
}

function carouselSlideToNum(id,slide){ /* supply the carousel inner object and slide number to jump to it when an image is clicked */
	const carouselSelected = document.getElementById(id);
	let slideCounter = 0;
	for (const child of carouselSelected.children) {
		child.classList.remove('active');
		if (slideCounter == slide) {
			child.classList.add('active');
		}
		slideCounter++
	}
}


function changeGallery(id){
	const extensions = [".png",".webp",".jpg"];
	var galleryImage = document.getElementById("galleryImage");
	var galleryImageLink = document.getElementById("galleryImageLink");
	/* try to find all possible image extensions, then set the gallery modal image to the one that exists */
	for (var i = 0; i < extensions.length; i++){
		if (doesImageExist(filePrefix+id+extensions[i])){
			galleryImage.src = filePrefix+id+extensions[i];
			galleryImageLink.href = filePrefix+id+extensions[i];
		}
	}
	/* obtain JSON and find object with matching ID */
   	var obtainedItem = filterById(globalTableData,id);
   	if (obtainedItem != undefined){
	   	document.getElementById("galleryTitle").textContent = obtainedItem.title;
	   	document.getElementById("galleryDesc").textContent = obtainedItem.desc;
	   	document.getElementById("galleryDate").textContent = "Uploaded " + obtainedItem.date;
	} else{ /* if ID isn't found in JSON */
		document.getElementById("galleryTitle").textContent = "Untitled";
		document.getElementById("galleryDesc").textContent = "";
		document.getElementById("galleryDate").textContent = "";
	}
}

function toggleNSFW(){
	var nsfwImages = document.getElementsByClassName("nsfwImage");
	const extensions = [".png",".webp",".jpg"];
	for (var i = 0; i < nsfwImages.length; i++){
		if (nsfwBlurred){
			for (var j = 0; j < extensions.length; j++){
				if (doesImageExist(filePrefix+nsfwImages[i].id+extensions[i])){
					nsfwImages[i].src = filePrefix+nsfwImages[i].id+extensions[i];
				} 
			} 
		} else{
			nsfwImages[i].src = filePrefix+"nsfw.png";
		}
	}

	nsfwBlurred = !nsfwBlurred;
	if (document.getElementById("nsfwButton").src.includes("button-off")){
		document.getElementById("nsfwButton").src = "assets/gallery/button-on.png";
	} else{
		document.getElementById("nsfwButton").src = "assets/gallery/button-off.png";
	}
}

function doesImageExist(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function searchUpdate(value) {
	console.log(value);
	var galleryImages = document.getElementsByClassName("galleryPanel");
	var searchMatches = [];
	for (const image of galleryImages){
		const indexFound = globalTableData.findIndex(
            x => image.id == x.id
        );
        console.log(globalTableData[indexFound].title.toLowerCase())
        console.log(value.toLowerCase())
        if (globalTableData[indexFound].title.toLowerCase().includes(value.toLowerCase()) || globalTableData[indexFound].desc.toLowerCase().includes(value.toLowerCase())) { /*if search value is included in title or description */
        	searchMatches.push(image);
        }
        image.style.display = "none";
	}
	console.log(searchMatches);
	for (const match of searchMatches){
		match.style.display = "grid";
	}
}


function filterById(jsonObject, id) {return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];}