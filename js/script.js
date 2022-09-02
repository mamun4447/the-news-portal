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
    console.log(data);
}

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


fetchUrl();