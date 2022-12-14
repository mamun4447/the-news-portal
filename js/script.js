const fetchUrl = () => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
        .then((response) => response.json())
        .then((data) => createCategory(data.data.news_category));
};

//Fetch news URL
const newsURL = async(id) => {
    console.log(id)
    const res = await fetch(
        `https://openapi.programming-hero.com/api/news/category/${id}`
    );
    const data = await res.json();

    cardData(data.data);
};

//News details URL
const newsDetailsURL = async(id) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/news/${id}`
    );
    const data = await res.json();
    // console.log(data.data);
    detailsModal(data.data);
};

// Category section
const createCategory = (info) => {
    const categorys = document.getElementById("categorys");
    // console.log(data.category_id);
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
const cardData = (datas) => {
    const cardElement = document.getElementById("cardElement");
    // console.log(datas);
    cardElement.textContent = "";
    const forSort = []

    if (datas.length > 0) {

        datas.forEach((data) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <label onclick="newsDetailsURL('${data._id}')" for="my-modal" class="modal-button">

                    <div class="card cursor-pointer lg:card-side bg-base-100 shadow-xl my-3">

                        <figure><img class="rounded-lg h-full w-full  lg:w-12/4" src="${data.thumbnail_url}" alt="Movie"></figure>

                        <div class="card-body  lg:w-9/12">
                            <h2 class="lg:text-3xl text-2xl">${data.title}</h2>
                            <p class="truncate sm:text-xl">${data.details}</p>
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
            </label>
            `;
            cardElement.appendChild(div);
            forSort.push(data.total_view);
        });

    } else {
        cardElement.innerText = "";
        const d = document.createElement("div");
        d.innerHTML = `<h1 class="text-6xl text-center">There is no news.</h1>`;
        cardElement.appendChild(d);
    }
    const numOfCategory = document.getElementById("numOfCategory");
    numOfCategory.innerText = datas.length;
};

//Modal
const detailsModal = (data) => {
    const modalItems = document.getElementById("modalItems");

    // console.log(data);
    modalItems.textContent = "";

    // const
    data.forEach((data) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <input type="checkbox" id="my-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box">
                    <img src="${
                      data.author.img ? data.author.img : "No autor Image"
                    }"/>
                    <h3 class="font-bold text-lg">${
                      data.author.name ? data.author.name : "No autor Name"
                    }</h3>
                    <p>Publish Date: ${data.author.published_date}</p>
                    <p class="py-4">Title: ${data.title}</p>
                    <div class="modal-action">
                        <label for="my-modal" class="btn">Close</label>
                    </div>
                </div>
            </div>`;
        modalItems.appendChild(div);
    });
    // modalItems.textContent = "";
};
newsURL('08');
fetchUrl();