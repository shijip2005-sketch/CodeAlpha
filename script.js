/* =========================================
   UNIQUE IMAGE COLLECTION
   NO IMAGE URL IS REPEATED
========================================= */

const photos = [

    {
        title: "Alpine Escape",
        category: "nature",
        image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Misty Mountains",
        category: "travel",
        image:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Forest Silence",
        category: "nature",
        image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Ocean Horizon",
        category: "travel",
        image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Midnight City",
        category: "city",
        image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Urban Lines",
        category: "city",
        image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Wild Spirit",
        category: "wildlife",
        image:
        "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Golden Coast",
        category: "travel",
        image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Desert Light",
        category: "nature",
        image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Northern Lake",
        category: "nature",
        image:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "City After Rain",
        category: "city",
        image:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=90"
    },

    {
        title: "Silent Wildlife",
        category: "wildlife",
        image:
        "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=90"
    }

];


/* =========================================
   PAGE VARIABLES
========================================= */

const photosPerPage = 4;

let currentPage = 1;

let currentFilter = "all";

let searchText = "";

let currentPhotoIndex = 0;


/* =========================================
   ELEMENTS
========================================= */

const galleryGrid =
    document.getElementById("galleryGrid");

const searchInput =
    document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const prevPageBtn =
    document.getElementById("prevPage");

const nextPageBtn =
    document.getElementById("nextPage");

const currentPageText =
    document.getElementById("currentPage");

const totalPagesText =
    document.getElementById("totalPages");

const pageInfo =
    document.getElementById("pageInfo");

const noResult =
    document.getElementById("noResult");


/* LIGHTBOX */

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCategory =
    document.getElementById("lightboxCategory");

const lightCounter =
    document.getElementById("lightCounter");

const closeBtn =
    document.getElementById("closeBtn");

const prevPhoto =
    document.getElementById("prevPhoto");

const nextPhoto =
    document.getElementById("nextPhoto");


/* =========================================
   FILTERED PHOTOS
========================================= */

function getFilteredPhotos() {

    return photos.filter(photo => {

        const categoryMatch =
            currentFilter === "all" ||
            photo.category === currentFilter;

        const textMatch =
            photo.title
                .toLowerCase()
                .includes(searchText);

        return categoryMatch && textMatch;

    });

}


/* =========================================
   RENDER GALLERY
========================================= */

function renderGallery() {

    const filteredPhotos =
        getFilteredPhotos();


    galleryGrid.innerHTML = "";


    if (filteredPhotos.length === 0) {

        galleryGrid.style.display = "none";

        noResult.style.display = "block";

        document.querySelector(".pagination")
            .style.display = "none";

        return;

    }


    galleryGrid.style.display = "grid";

    noResult.style.display = "none";

    document.querySelector(".pagination")
        .style.display = "flex";


    const totalPages =
        Math.ceil(
            filteredPhotos.length /
            photosPerPage
        );


    if (currentPage > totalPages) {

        currentPage = totalPages;

    }


    const start =
        (currentPage - 1) *
        photosPerPage;

    const end =
        start + photosPerPage;


    const pagePhotos =
        filteredPhotos.slice(
            start,
            end
        );


    pagePhotos.forEach(
        (photo, index) => {

            const actualIndex =
                photos.indexOf(photo);


            const card =
                document.createElement("div");


            card.className =
                "photo-card";


            if (
                index === 0 &&
                pagePhotos.length >= 3
            ) {

                card.classList.add("large");

            }


            card.innerHTML = `

                <img
                    src="${photo.image}"
                    alt="${photo.title}"
                >

                <button
                    class="favorite"
                    aria-label="Favorite"
                >
                    ♡
                </button>

                <div class="photo-overlay">

                    <small>
                        ${photo.category.toUpperCase()}
                    </small>

                    <h3>
                        ${photo.title}
                    </h3>

                </div>

            `;


            /* OPEN IMAGE */

            card.addEventListener(
                "click",
                event => {

                    if (
                        event.target
                        .classList
                        .contains("favorite")
                    ) {

                        return;

                    }

                    openLightbox(actualIndex);

                }
            );


            /* FAVORITE */

            const favorite =
                card.querySelector(
                    ".favorite"
                );


            favorite.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    favorite.classList.toggle(
                        "liked"
                    );


                    favorite.textContent =
                        favorite.classList.contains(
                            "liked"
                        )
                        ? "♥"
                        : "♡";

                }
            );


            galleryGrid.appendChild(card);

        }
    );


    currentPageText.textContent =
        String(currentPage);


    totalPagesText.textContent =
        String(totalPages);


    pageInfo.textContent =
        `PAGE ${String(currentPage).padStart(2,"0")}`;


    prevPageBtn.disabled =
        currentPage === 1;


    nextPageBtn.disabled =
        currentPage === totalPages;

}


/* =========================================
   NEXT PAGE
========================================= */

nextPageBtn?.addEventListener(
    "click",
    () => {

        const filteredPhotos =
            getFilteredPhotos();

        const totalPages =
            Math.ceil(
                filteredPhotos.length /
                photosPerPage
            );


        if (
            currentPage < totalPages
        ) {

            currentPage++;

            renderGallery();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }
);


/* =========================================
   PREVIOUS PAGE
========================================= */

prevPageBtn?.addEventListener(
    "click",
    () => {

        if (currentPage > 1) {

            currentPage--;

            renderGallery();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }
);


/* =========================================
   FILTERS
========================================= */

filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    btn =>
                        btn.classList
                        .remove("active")
                );


                button.classList.add("active");


                currentFilter =
                    button.dataset.filter;


                currentPage = 1;


                renderGallery();

            }
        );

    }
);


/* =========================================
   SEARCH
========================================= */

searchInput?.addEventListener(
    "input",
    event => {

        searchText =
            event.target.value
            .toLowerCase()
            .trim();


        currentPage = 1;


        renderGallery();

    }
);


/* =========================================
   LIGHTBOX
========================================= */

function openLightbox(index) {

    currentPhotoIndex = index;

    updateLightbox();

    lightbox.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function updateLightbox() {

    const photo =
        photos[currentPhotoIndex];


    lightboxImage.src =
        photo.image;


    lightboxImage.alt =
        photo.title;


    lightboxTitle.textContent =
        photo.title;


    lightboxCategory.textContent =
        photo.category
        .toUpperCase();


    lightCounter.textContent =
        `${String(currentPhotoIndex + 1).padStart(2,"0")} / ${String(photos.length).padStart(2,"0")}`;

}


/* =========================================
   CLOSE
========================================= */

closeBtn?.addEventListener(
    "click",
    closeLightbox
);


lightbox?.addEventListener(
    "click",
    event => {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


function closeLightbox() {

    lightbox.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "auto";

}


/* =========================================
   LIGHTBOX NEXT
========================================= */

nextPhoto?.addEventListener(
    "click",
    () => {

        currentPhotoIndex++;

        if (
            currentPhotoIndex >=
            photos.length
        ) {

            currentPhotoIndex = 0;

        }

        updateLightbox();

    }
);


/* =========================================
   LIGHTBOX PREVIOUS
========================================= */

prevPhoto?.addEventListener(
    "click",
    () => {

        currentPhotoIndex--;

        if (
            currentPhotoIndex < 0
        ) {

            currentPhotoIndex =
                photos.length - 1;

        }

        updateLightbox();

    }
);


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox ||
            !lightbox.classList
                .contains("show")
        ) {

            return;

        }


        if (
            event.key === "ArrowRight"
        ) {

            currentPhotoIndex++;

            if (
                currentPhotoIndex >=
                photos.length
            ) {

                currentPhotoIndex = 0;

            }

            updateLightbox();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            currentPhotoIndex--;

            if (
                currentPhotoIndex < 0
            ) {

                currentPhotoIndex =
                    photos.length - 1;

            }

            updateLightbox();

        }


        if (
            event.key === "Escape"
        ) {

            closeLightbox();

        }

    }
);


/* =========================================
   DARK / LIGHT MODE
========================================= */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn?.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        const lightMode =
            document.body.classList
            .contains("light");


        themeBtn.textContent =
            lightMode ? "☾" : "☀";


        localStorage.setItem(
            "vista-theme",
            lightMode
                ? "light"
                : "dark"
        );

    }
);


/* LOAD SAVED THEME */

const savedTheme =
    localStorage.getItem(
        "vista-theme"
    );


if (savedTheme === "light") {

    document.body.classList.add(
        "light"
    );


    if (themeBtn) {

        themeBtn.textContent = "☾";

    }

}


/* =========================================
   LOADING ANIMATION
========================================= */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                const loader =
                    document.getElementById(
                        "loader"
                    );


                if (loader) {

                    loader.classList.add(
                        "hide"
                    );

                }

            },
            1000
        );

    }
);


/* =========================================
   INITIAL
========================================= */

if (galleryGrid) {

    renderGallery();

}