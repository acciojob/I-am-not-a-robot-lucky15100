document.addEventListener("DOMContentLoaded", function () {
  const imageUrls = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg",
  ];

  // Shuffle the image URLs to randomize their arrangement
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  shuffleArray(imageUrls);

  const main = document.querySelector("main");
  const h3 = document.createElement("h3");
  h3.id = "h";
  h3.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
  main.appendChild(h3);

  let selectedImages = [];
  let state = 1;

  function resetState() {
    selectedImages = [];
    state = 1;
    updateUI();
  }

  function verifyState() {
    if (selectedImages.length === 2) {
      state = 4;
      if (selectedImages[0].src === selectedImages[1].src) {
        displayResult("You are a human. Congratulations!");
      } else {
        displayResult("We can't verify you as a human. You selected the non-identical tiles.");
      }
    }
    updateUI();
  }

  function displayResult(message) {
    const p = document.createElement("p");
    p.textContent = message;
    p.id = "para";
    main.appendChild(p);
  }

  function updateUI() {
    const images = document.querySelectorAll("img");

    // Remove "selected" class from all images
    images.forEach((img) => img.classList.remove("selected"));

    // Add "selected" class to selected images
    selectedImages.forEach((img) => img.classList.add("selected"));

    const resetButton = document.getElementById("reset");
    const verifyButton = document.getElementById("verify");

    switch (state) {
      case 1:
        resetButton.style.display = "none";
        verifyButton.style.display = "none";
        break;
      case 2:
        resetButton.style.display = "block";
        verifyButton.style.display = "none";
        break;
      case 3:
        resetButton.style.display = "block";
        verifyButton.style.display = "block";
        break;
      case 4:
        resetButton.style.display = "none";
        verifyButton.style.display = "none";
        break;
    }
  }

  // Create and add Reset button
  const resetButton = document.createElement("button");
  resetButton.id = "reset";
  resetButton.textContent = "Reset";
  resetButton.style.display = "none";
  resetButton.addEventListener("click", resetState);
  main.appendChild(resetButton);

  // Create and add Verify button
  const verifyButton = document.createElement("button");
  verifyButton.id = "verify";
  verifyButton.textContent = "Verify";
  verifyButton.style.display = "none";
  verifyButton.addEventListener("click", verifyState);
  main.appendChild(verifyButton);

  // Create and add images with class names
  for (let i = 0; i < imageUrls.length; i++) {
    const img = document.createElement("img");
    img.src = imageUrls[i];
    img.classList.add(`img${i + 1}`);
    img.addEventListener("click", () => {
      if (state === 1 || state === 2) {
        if (!selectedImages.includes(img)) {
          selectedImages.push(img);
        }
        if (selectedImages.length === 2) {
          state = 3;
        } else {
          state = 2;
        }
        updateUI();
      }
    });
    main.appendChild(img);
  }
});
