
// ---------------  Navbar search option logic --------------------

const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");
searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});
navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});




// ----------------- Caraousel logic -----------------------------

  document.querySelectorAll(".slider-item").forEach(slide => {
    const bg = slide.getAttribute("data-bg");
    slide.style.setProperty('--bg-image', `url('${bg}')`);
  });

  // Initialize Swiper
  const swiper = new Swiper(".slider-container", {
    effect: "fade",
    speed: 600,
    loop: true,
    loopAdditionalSlides: 1,
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    navigation: {
      prevEl: "#slide-prev",
      nextEl: "#slide-next"
    }
  });



// ------------------ Navigating to A-Z List, Latest Animes and Anime Page Logic ---------------------

document.addEventListener('DOMContentLoaded', function() {
    // Cache all DOM elements once
    const elements = {
        // Main content sections
        imageSlider: document.getElementById('section-1'),
        about: document.getElementById('about'),
        form: document.getElementById('contact'),
        recently: document.getElementById('recently-added'),
        animeCards: document.getElementById('anime-cards'),
        section2: document.getElementById('section-2'),
        
        // Page sections
        azList: document.getElementById('az-list'),
        allLatest: document.getElementById('all-latest'),
        animePage: document.getElementById('anime-page'),
        playAnime: document.getElementById('play-anime'),
        
        // Separater elements
        separaters: document.querySelectorAll('.separater'),

        // Navigation elements
        navElements: {
            popular: document.getElementById('popular-nav-a'),
            latest: document.getElementById('latest-nav-a'),
            azlist: document.getElementById('azlist-nav-a'),
            about: document.getElementById('about-nav-a'),
            contact: document.getElementById('contact-nav-a')
        },

        // Backward navigation
        backButtons: {
          latest_back_button: document.getElementById('latest-back-button'),
          azList_back_button: document.getElementById('az-list-back-button'),
          animePage_back_button: document.getElementById('anime-page-back-button'),
          playAnime_back_button: document.getElementById('play-anime-back-button')
        }
    };

    // Reusable function to hide common elements and disable navigation
    function hideCommonElements() {
        elements.imageSlider.style.display = 'none';
        elements.about.style.display = 'none';
        elements.form.style.display = 'none';
        elements.recently.style.display = 'none';
        elements.animeCards.style.display = 'none';
        elements.section2.style.marginTop = "8%";

        // Hide all separaters
        elements.separaters.forEach(function(separater) {
            separater.style.display = 'none';
        });

        // Disable and dim navigation
        Object.values(elements.navElements).forEach(function(nav) {
            if (nav) {
                nav.style.pointerEvents = 'none';
                nav.style.opacity = '0.5';
            }
        });

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Reusable function to show common elements and disable navigation
    function showCommonElements() {
        // Show main sections (with null checks)
        if (elements.imageSlider) elements.imageSlider.style.display = 'block';
        if (elements.about) elements.about.style.display = 'block';
        if (elements.form) elements.form.style.display = 'block';
        if (elements.recently) elements.recently.style.display = 'block';
        if (elements.animeCards) elements.animeCards.style.display = 'block';
        if (elements.section2) elements.section2.style.marginTop = "0";

        // Show all separators
        elements.separaters.forEach(function(separater) {
            separater.style.display = 'block';
        });

        Object.values(elements.navElements).forEach(function(nav) {
            if (nav) {
                nav.style.pointerEvents = 'auto'; 
                nav.style.opacity = '1';
            }
        });

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Function to show a specific page
    function showPage(pageElement, additionalHideElements = []) {
        hideCommonElements();
        
        // Hide additional elements if specified
        additionalHideElements.forEach(function(element) {
            if (element) element.style.display = 'none';
        });
        
        // Show the target page
        if (pageElement) {
            pageElement.style.display = 'block';
        }
    }

    // Navigation handlers
    function setupNavigation() {
        // A-Z List navigation
        const azListLink = document.getElementById('azlist-nav-a');
        if (azListLink) {
            azListLink.addEventListener('click', function(e) {
                showPage(elements.azList);
            });
        }

        // Latest button navigation
        const latestButton = document.getElementById('latest-button-top');
        if (latestButton) {
            latestButton.addEventListener('click', function(e) {
                showPage(elements.allLatest);
            });
        }
    }

    // Function to setup anime page navigation for various elements
    function setupAnimePageNavigation() {
        const selectors = [
            '.card-container',    // Card containers
            '.slide-button',      // Watch now buttons
            '.anime-card',        // Top anime cards
            '.top-upcoming-card'  // top upcoming anime card
        ];

        selectors.forEach(function(selector) {
            const elements_list = document.querySelectorAll(selector);
            elements_list.forEach(function(element) {
                element.addEventListener('click', function(e) {
                    showPage(elements.animePage, [elements.azList, elements.allLatest]);
                      const further = [
                        '.ep-tile',
                        '.episode-box'
                      ];

                      further.forEach(function(hook){
                        const episode_list = document.querySelectorAll(hook);
                        episode_list.forEach(function(element){
                          element.addEventListener('click', function(e){
                          showPage(elements.playAnime,[elements.azList, elements.allLatest, elements.animePage]);
                        });
                        });

                      });
                });
            });
        });
    }

    // Function to setup play anime page navigation (recently added)
    function playAnimePage() {
        const selectors = [
            '.names',             // Recently added names
        ];

        selectors.forEach(function(selector) {
            const elements_list = document.querySelectorAll(selector);
            elements_list.forEach(function(element) {
                element.addEventListener('click', function(e) {
                    showPage(elements.playAnime, [elements.azList, elements.allLatest]);
                });
            });
        });
    }

    // latest-all-back-button
    function latestBackLogic() {
      if (elements.backButtons.latest_back_button) {
          elements.backButtons.latest_back_button.addEventListener('click', function(e) {
              showCommonElements();
              if (elements.animePage) {
                  elements.allLatest.style.display = 'none';  
              }
          });
      } else {
          console.warn('anime-page-back-button element not found!');  
      }
    }

    // az-list-back-button
    function azListBackLogic() {
      if (elements.backButtons.azList_back_button) {
          elements.backButtons.azList_back_button.addEventListener('click', function(e) {
              showCommonElements();
              if (elements.animePage) {
                  elements.azList.style.display = 'none';  
              }
          });
      } else {
          console.warn('anime-page-back-button element not found!');  
      }
    }

    // anime-page-back-button
    function animePageBackLogic() {
      if (elements.backButtons.animePage_back_button) {
          elements.backButtons.animePage_back_button.addEventListener('click', function(e) {
              showCommonElements();
              if (elements.animePage) {
                  elements.animePage.style.display = 'none';  
              }
          });
      } else {
          console.warn('anime-page-back-button element not found!');  
      }      
    }

    // play-anime-back-button
    function playAnimeBackLogic() {
      if (elements.backButtons.playAnime_back_button) {
          elements.backButtons.playAnime_back_button.addEventListener('click', function(e) {
              hideCommonElements();
              if (elements.animePage) {
                  elements.playAnime.style.display = 'none'; 
                  elements.animePage.style.display = 'block';
              }
          });
      } else {
          console.warn('anime-page-back-button element not found!');  
      }      
    }

    // Initialize all navigation
    setupNavigation();
    setupAnimePageNavigation();
    playAnimePage();
    latestBackLogic();
    azListBackLogic();
    animePageBackLogic();
    playAnimeBackLogic();
});





// -------------------- Form Validation ------------------------

function validateForm() {
    // Get values from input fields
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Check if name is empty
    if (name.trim() == '') {
        alert('Please enter your name');
        return false;
    }

    // Check if phone number is empty
    if (phone.trim() == '') {
        alert('Please enter your phone number');
        return false;
    }

    // Check if email is empty
    if (email.trim() == '') {
        alert('Please enter your email');
        return false;
    }

    // Check if message is empty
    if (message.trim() == '') {
        alert('Please enter your message');
        return false;
    }

    // All fields are filled, return true for form submission
    return true;
}



// ------------------------- Filtering Logic --------------------------------------


// Filter data configuration
const filterData = {
    genre: [
        'Action', 'Adult Cast', 'Adventure', 'Animation', 'Anthropomorphic', 'Avant Garde',
        'Award Winning', 'Boys Love', 'CGDCT', 'Childcare', 'Combat Sports', 'Comedy',
        'Crossdressing', 'Delinquents', 'Detective', 'Drama', 'Ecchi', 'Educational',
        'Erotica', 'Fantasy', 'Gag Humor', 'Girls Love', 'Gore', 'Gourmet', 'Harem',
        'High Stakes Game', 'Historical', 'Horror', 'Idols (Female)', 'Idols (Male)',
        'Isekai', 'Iyashikei'
    ],
    season: [
        'Fall 1969', 'Fall 1979', 'Fall 1995', 'Fall 1999', 'Fall 2002', 'Fall 2004',
        'Fall 2006', 'Fall 2008', 'Fall 2011', 'Fall 2012', 'Fall 2014', 'Fall 2015',
        'Fall 2016', 'Fall 2017', 'Fall 2018', 'Fall 2020', 'Fall 2021', 'Fall 2022',
        'Fall 2023', 'Fall 2024', 'Fall 2025', 'Spring 1966', 'Spring 1967', 'Spring 1968',
        'Spring 1974', 'Spring 1980', 'Spring 1981', 'Spring 1982', 'Spring 1983',
        'Spring 1985', 'Spring 1989'
    ],
    studio: [
        '100studio', '8bit', 'A-1 Pictures', 'A-Real', 'A.C.G.T.', 'Actas',
        'AHA Entertainment', 'AIC PLUS+', 'Ajia-do', 'Akatsuki', 'Anime Tokyo', 'AQUA ARIS',
        'Artland', 'Arvo Animation', 'Asahi Production', 'Ashi Productions', 'asread.',
        'Atelier Pontdarc', 'AtelierPontdarc', 'AXsiZ', 'B.CMAY PICTURES', 'Bakken Record',
        'Bandai Namco', 'Bibury Animation', 'Big Firebird Culture', 'Blade', 'Bloomz',
        'Bones', 'Bones Film', 'Borutong', 'Brain\'s Base', 'Bridge'
    ],
    status: ['All', 'Ongoing', 'Completed', 'Upcoming', 'Hiatus'],
    type: ['All', 'TV Series', 'OVA', 'Movie', 'Live Action', 'Special', 'BD', 'ONA', 'Music'],
    order: ['Default', 'A-Z', 'Z-A', 'Latest Update', 'Latest Added', 'Popular', 'Rating']
};

const container = document.getElementById('dropdown-options-container');
const buttons = document.querySelectorAll('.dropdown-button');

// Function to create option elements dynamically
function createOptions(filterKey) {
  container.innerHTML = ''; // Clear previous options
  const options = filterData[filterKey];

  options.forEach(option => {
    const label = document.createElement('label');
    const input = document.createElement('input');

    if (['genre', 'season', 'studio'].includes(filterKey)) {
      input.type = 'checkbox';
      input.name = filterKey;
    } else {
      input.type = 'radio';
      input.name = filterKey;
    }

    input.value = option;
    label.appendChild(input);
    label.appendChild(document.createTextNode(' ' + option));
    container.appendChild(label);
  });

  container.style.display = 'block';
}

// Event listeners for buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const filterKey = button.getAttribute('data-dropdown'); // fixed from data-filter to data-dropdown
    createOptions(filterKey);

    const rect = button.getBoundingClientRect();
    container.style.top = rect.bottom + window.scrollY + 'px';
    container.style.left = rect.left + window.scrollX + 'px';
    container.style.width = rect.width + 'px';
  });
});

// Close dropdown on clicking outside
document.addEventListener('click', (e) => {
  if (!container.contains(e.target) && ![...buttons].some(btn => btn.contains(e.target))) {
    container.style.display = 'none';
  }
});




// --------- Switch between mothly/weekly/all ----------------

const options = document.querySelectorAll('.slider-option');
options.forEach(option => {
  option.addEventListener('click', () => {
    options.forEach(opt => opt.classList.remove('active'));
    option.classList.add('active');
  });
});

