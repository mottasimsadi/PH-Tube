function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

function loadCategories() {
  // 1 - Fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // 2 - Convert the Promise to JSON
    .then((response) => response.json())
    // 3 - Send data to display
    .then((data) => displayCategories(data.categories));
}

function loadVideos(searchText = "") {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayVideoDetails(data.video));
};

const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");

  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
    </div>
  </div>
</div>
  `;
};

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActiveClass();
      // No active class
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

function displayCategories(categories) {
  // Get the container
  const categoryContainer = document.getElementById("category-container");

  // Loop Operation on Array of Object
  for (let category of categories) {
    // Create Element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm text-[#25252570] bg-[#25252515] hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
      `;
    // Append the ELement
    categoryContainer.appendChild(categoryDiv);
  }
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full text center flex flex-col justify-center items-center py-20">
        <img class="w-[120px]" src="assets/Icon.png" alt="">
        <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
    </div>
    `;
  }

  videos.forEach((video) => {
    // Create Element
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
        <div class="card bg-base-100">
                <figure class="relative">
                    <img class="w-full h-[150px] object-cover" src="${
                      video.thumbnail
                    }" />
                    <span class="absolute bottom-2 right-2 text-white text-sm bg-black px-2 rounded-full">3hrs 56 min
                        ago</span>
                </figure>
                <div class="flex gap-3 px-0 py-5">
                    <div class="profile">
                        <div class="avatar">
                            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                                <img src="${
                                  video.authors[0].profile_picture
                                }" />
                            </div>
                        </div>
                    </div>
                    <div class="intro">
                        <h2 class="text-sm font-semibold">${video.title}</h2>
                        <p class="text-sm text-gray-400 flex gap-1">${
                          video.authors[0].profile_name
                        }
                            ${
                              video.authors[0].verified == true
                                ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=SRJUuaAShjVD&format=png" alt="">`
                                : ``
                            }
                        </p>
                        <p class="text-sm text-gray-400">${
                          video.others.views
                        } views</p>
                    </div>
                </div>
                <button onclick=loadVideoDetails("${
                  video.video_id
                }") class="btn btn-block">Show Details</button>
            </div>
        `;
    // Append the Element
    videoContainer.appendChild(videoCard);
  });
};

document.getElementById("search-input").addEventListener("keyup", (event) => {
  const input = event.target.value;
  loadVideos(input);
});

loadCategories();
