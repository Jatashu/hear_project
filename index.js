let jsonData = [
  {
    key: "ricS",
    name: "AX RIC-S",
    image: [
      "./images/img1/rose-gold-hear.png",
      "./images/img1/carbonblue-silver.png",
      "./images/img1/graphit-hear.png",
      "./images/img1/silver-black-hear.png",
      "./images/img1/white-silver-hear.png",
    ],
    content: "Content for AX RIC-S",
    colors: [
      "./icon-image/img1/rosegold.jpg",
      "./icon-image/img1/carbon-nlue-silver.jpg",
      "./icon-image/img1/black-graphit.jpg",
      "./icon-image/img1/black-silver.jpg",
      "./icon-image/img1/white-silver.jpg",
    ],
  },
  {
    key: "ricR",
    name: "AX RIC-R",
    image: [
      "./images/img2/RIC-R-AX-Black.png",
      "./images/img2/RIC-R-AX-Beige.png",
      "./images/img2/RIC-R-AX-Deep-Brown.png",
      "./images/img2/RIC-R-AX-Sandy-brown.png",
      "./images/img2/RIC-R-AX-Silver.png",
    ],
    content: "Content for AX RIC-R",
    colors: [
      "./icon-image/img2/black.png",
      "./icon-image/img2/champagne.png",
      "./icon-image/img2/graphit.png",
      "./icon-image/img2/sandy-brown.png",
      "./icon-image/img2/silver.png",
    ],
  },
  {
    key: "xRic",
    name: "X RIC",
    image: [
      "./images/img3/RIC-X-Black.png",
      "./images/img3/RIC-X-Beige.png",
      "./images/img3/RIC-X-SandyBrown.png",
      "./images/img3/RIC-X-Silver.png",
    ],
    content: "Content for X RIC",
    colors: [
      "./icon-image/img3/blac.png",
      "./icon-image/img3/ITR_COLOR_05.png",
      "./icon-image/img3/sandy-brown.png",
      "./icon-image/img3/silver.png",
    ],
  },
  {
    key: "axItcR",
    name: "AX ITC-R",
    image: ["./images/img4/black-1.png", "./images/img4/tan.png"],
    content: "Content for AX ITC-R",
    colors: [
      "./icon-image/img4/ITR_COLOR_01.png",
      "./icon-image/img4/ITR_COLOR_05.png",
    ],
  },
  {
    key: "xCic",
    name: "X CIC",
    image: [
      "./images/img5/HORIZON_WEBSITE_PRODUCT_CIC_01_475X550.png",
      "./images/img5/HORIZON_WEBSITE_PRODUCT_CIC_02_475X550.png",
    ],
    content: "Content for X CIC",
    colors: [
      "./icon-image/img5/CIC_COLOR_01.png",
      "./icon-image/img5/CIC_COLOR_02.png",
    ],
  },
  {
    key: "xRicS",
    name: "X RIC-S",
    image: [
      "./images/img6/White.png",
      "./images/img6/Black.png",
      "./images/img6/Cosmicblue.png",
      "./images/img6/White.png",
      "./images/img6/Snowwhite.png",
    ],
    content: "Content for X RIC-S",
    colors: [
      "./icon-image/img6/RICS_COLOR_01@2x-1.png",
      "./icon-image/img6/RICS_COLOR_02.png",
      "./icon-image/img6/RICS_COLOR_04.png",
      "./icon-image/img6/RICS_COLOR_-1.png",
      "./icon-image/img6/RICS_COLOR_03.png",
    ],
  },
];

let currentIndex = 0;

// Function to move to the previous product
function prevContent() {
  updateCurrentIndexFromHighlight();
  currentIndex = currentIndex === 0 ? jsonData.length - 1 : currentIndex - 1;
  updateContent(currentIndex);
}

// Function to move to the next product
function nextContent() {
  updateCurrentIndexFromHighlight();
  currentIndex = currentIndex === jsonData.length - 1 ? 0 : currentIndex + 1;
  updateContent(currentIndex);
}

// Function to update the active button
function highlightButton(index) {
  let buttons = document.querySelectorAll(".button-1, .button-2");
  buttons.forEach((button) => button.classList.remove("active"));
  buttons[index].classList.add("active");
}

// Function to update content and image based on button click
function updateContent(index) {
  let product = jsonData[index];
  let buttonName = product.name;
  let images = product.image;
  let content = product.content;
  let colors = product.colors || [];

  // Update heading content
  let heading = document.querySelector(".carousel_content_heading span");
  heading.innerHTML = "<b>hear.com</b> HORIZON <br />" + buttonName;

  // Update main image to the first image by default
  updateImage(images[0]);

  // Clear existing color icons
  let colorIconsDiv = document.getElementById("colorIcons");
  colorIconsDiv.innerHTML = "";

  // Create color icons
  colors.forEach(function (color, colorIndex) {
    let img = document.createElement("img");
    img.src = color;
    img.alt = buttonName;
    img.className = "image";
    img.onclick = function () {
      updateImage(images[colorIndex]); // Set image based on color index
    };
    colorIconsDiv.appendChild(img);
  });

  // Highlight the button
  highlightButton(index);
  updateUrlParameter("aud_device", product.key);
}

// Function to update the main image
function updateImage(imageSrc) {
  document.getElementById("mainImage").src = imageSrc;
}

// Function to update the URL parameter
function updateUrlParameter(key, value) {
  let url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.replaceState({}, "", url);
}

// Function to update current index from the highlighted button
function updateCurrentIndexFromHighlight() {
  let buttons = document.querySelectorAll(".button-1, .button-2");
  buttons.forEach((button, index) => {
    if (button.classList.contains("active")) {
      currentIndex = index;
    }
  });
}

window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const audDeviceKey = urlParams.get("aud_device");

  if (audDeviceKey) {
    const initialIndex = jsonData.findIndex(
      (product) => product.key === audDeviceKey
    );
    if (initialIndex !== -1) {
      currentIndex = initialIndex;
    }
  }

  updateContent(currentIndex); // Initially update content for the first product
};
