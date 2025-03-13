function loadCategories() {
  // 1 - Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2 - Convert the Promise to JSON
    .then((response) => response.json())
    // 3 - Send data to display
    .then((data) => displayCategories(data.categories));
}

function displayCategories(categories) {
  // Get the container
  const categoryContainer = document.getElementById("category-container");

  // Loop Operation on Array of Object
  for (let category of categories) {
    // Create Element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button class="btn btn-sm text-[#25252570] bg-[#25252515] hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
      `;
    // Append the ELement
    categoryContainer.appendChild(categoryDiv);
  }
}

loadCategories();
