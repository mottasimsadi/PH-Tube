function loadCategories() {
  // 1 - Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2 - Convert the Promise to JSON
    .then((response) => response.json())
    // 3 - Send data to display
    .then((data) => displayCategories(data.categories));
}

function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displayVideos(data.category));
};

function displayCategories(categories) {
  // Get the container
  const categoryContainer = document.getElementById("category-container");

  // Loop Operation on Array of Object
  for (let category of categories) {
    // Create Element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm text-[#25252570] bg-[#25252515] hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
      `;
    // Append the ELement
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  videos.forEach((video) => {
    // Create Element
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100">
                <figure class="relative">
                    <img class="w-full h-[150px] object-cover" src="${video.thumbnail}" />
                    <span class="absolute bottom-2 right-2 text-white text-sm bg-black px-2 rounded-full">3hrs 56 min
                        ago</span>
                </figure>
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                <img src="${video.authors[0].profile_picture}" />
                            </div>
                        </div>
                    </div>
                    <div class="intro">
                        <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name}
                            <img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt="">
                        </p>
                        <p class="text-sm text-gray-400">${video.others.views} views</p>
                    </div>
                </div>
            </div>
        `;
    // Append the Element
    videoContainer.appendChild(videoCard);
  });
};

loadCategories();
