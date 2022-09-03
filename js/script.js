const fetchUrl = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then((response) => response.json())
        .then((data) => createCategory(data.data.news_category));
};

//Fetch news URL
const newsURL = async(id) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/news/category/${id}`
    );
    const data = await res.json();
    console.log(data.data);
    cardData(data.data);
};

//News details URL
const newsDetailsURL = async(id) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/news/${id}`
    );
    const data = await res.json();
    console.log(data.data);
    detailsModal(data.data);
};

// Category section
const createCategory = (info) => {
    const categorys = document.getElementById("categorys");

    info.forEach((data) => {
        const li = document.createElement("li");
        li.classList.add("category");
        li.innerHTML = `
        <a onclick="newsURL('${data.category_id}')">${data.category_name}</a>
    `;
        categorys.appendChild(li);
    });
};

//Card data
const cardData = (data) => {
    const cardElement = document.getElementById("cardElement");
    const numberOfCate = document.getElementById("numberOfCate");
    data.forEach((data) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div onclick="newsDetailsURL('${data._id}')" for="my-modal" class="card grid-cols-12 card-side bg-base-100 shadow-xl my-3">
                <figure><img class="rounded-lg grid-cols-3" src="${data.thumbnail_url}" alt="Movie"></figure>
                <div class="card-body grid-cols-9">
                    <h2 class="text-3xl">${data.title}</h2>
                    <p>${data.details}</p>
                    <div class="card-actions flex justify-between align-center">
                        
                        <div class="flex align-center m-auto">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img src="${data.author.img}" />
                                </div>
                            </div>

                            <div class="pl-3 flex flex-col m-auto">
                                <h1 class="text-xl">${data.author.name}</h1>
                                <p>${data.author.published_date}</p>
                            </div>

                        </div>

                        
                        <div class="m-auto">
                            <h1 class="text-xl"><i class="fa-solid fa-eye"></i> ${data.total_view}</h1>
                        </div>

                       
                        <div class="m-auto">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>

                        
                        <div class="m-auto">
                            <i class="fa-solid fa-right-long text-xl"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardElement.appendChild(div);
    });
    // const items = document.createElement("div");
    // items.innerHTML = `<h1 class="text-2xl p-3 m-3">${cardElement.legnth} items found for category Entertainment</h1>`;
    // numberOfCate.appendChild(items);
};

//Modal
const detailsModal = (data) => {
    const modalItems = document.getElementById("modalItems");
    const div = document.createElement("div");
    div.innerHTML = ``;
    modalItems.appendChild(div);
};

fetchUrl();