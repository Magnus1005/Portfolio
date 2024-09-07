document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.getElementById('typed-text');
    const subtitleElement = document.getElementById('subtitle');
    const cursorElementHeadder = document.querySelector('.cursor-headder');
    const cursorElementTitle = document.querySelector('.cursor-title');
    const headderText = ["Hi", ", I'm Magnus"];
    const titles = ["Software developer", "Developer", "UI Designer"];
    const prefixText = "I'm a ";

    let titleIndex = 0;

    function typeText(element, text, speed, index = 0) {
        return new Promise((resolve) => {
            function typeNext() {
                element.textContent += text.charAt(index);
                index++;
                if (index < text.length) {
                    setTimeout(typeNext, speed);
                } else {
                    resolve();
                }
            }
            typeNext();
        });
    }


    function typeRemoveText(element, text, speed, index = 0) {
        return new Promise((resolve) => {
            const length = text.length;
            function removeNext() {
                element.textContent = element.textContent.slice(0, -1);
                if (element.textContent.length > index) {
                    setTimeout(removeNext, speed);
                } else {
                    resolve();
                }
            }
            removeNext();
        });
    }

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function cycleTitles(){
        const length = subtitleElement.textContent.length;
        await typeText(subtitleElement, titles[titleIndex], 50);
        await delay(1000);
        // Remove here
        await typeRemoveText(subtitleElement, titles[titleIndex], 50, length);
        await delay(1000);


        titleIndex = (titleIndex + 1) % titles.length;
        cycleTitles();
    }
    function hideCursor(cursor) {
        cursor.style.visibility = 'hidden';
    }
    function showCursor(cursor){
        cursor.style.visibility = 'visible';
    }

    async function Init() {
        await delay(1000);
        await typeText(typedTextElement, headderText[0], 300);
        await delay(1500);
        await typeText(typedTextElement, headderText[1], 100);

        hideCursor(cursorElementHeadder);
        
        showCursor(cursorElementTitle);
        await delay(2000);
        await typeText(subtitleElement, prefixText, 100);
        
        await delay(1000);
        cycleTitles();
    }

    Init();
});

document.getElementById('see-my-work-button').addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  });

  



document.addEventListener('DOMContentLoaded', function () {
    const percentage = 0;

    let direction;
    let lastScrollTop = 0; // Track the last scroll position

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  
    const isElementInView = (element) => {
      const rect = element.getBoundingClientRect();

      const tester = (window.innerHeight - ((window.innerHeight/100) * percentage))


      return (
        rect.top < tester &&
        rect.bottom >= 0
      );
    };

    const isElementBelowScreen = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top > window.innerHeight;
    };
  
    const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Determine the scroll direction
        direction = scrollTop > lastScrollTop ? "DOWN" : "UP";
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        
        elementsToAnimate.forEach(element => {
            if (isElementInView(element) && direction === "DOWN") {
                element.classList.add('active');
            } else if (isElementBelowScreen(element) && direction === "UP") {
                element.classList.remove('active');
            }

        });
    };
  
    window.addEventListener('scroll', handleScroll);
    handleScroll();
  });
  
  

  
  
  
  












  fetch('assets/projects/projects.json') // Update this URL to your actual JSON file
  .then(response => response.json())
  .then(data => {
    const projectsContainer = document.getElementById('projects-container');

    data.forEach(project => {
      // Create article element
      const article = document.createElement('article');
      article.classList.add('project-article');

      // Create text div
      const textDiv = document.createElement('div');
      textDiv.classList.add('project-article-text');

      // Create title
      const title = document.createElement('h4');
      title.textContent = project.title;

      // Create description
      const description = document.createElement('p');
      description.textContent = project.description;

      // Append title and description to text div
      textDiv.appendChild(title);
      textDiv.appendChild(description);

      // Create image container
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container');

      // Create image buttons container
      const buttonsContainer = document.createElement('span');
      buttonsContainer.classList.add('project-article-image-buttons');

      // Create arrows
      const leftArrow = document.createElement('button');
      leftArrow.classList.add('arrow', 'arrow-left');
      leftArrow.textContent = '◀︎';

      const rightArrow = document.createElement('button');
      rightArrow.classList.add('arrow', 'arrow-right');
      rightArrow.textContent = '▶︎';

      // Create initial image
      const images = project.imageSrc;
      const imgElement = document.createElement('img');
      imgElement.classList.add('project-article-image');
      imgElement.src = images[0];
      imgElement.alt = project.title;

      let currentIndex = 0;

      function updateImage(index) {
        imgElement.src = images[index];
      }

      leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(currentIndex);
      });

      rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage(currentIndex);
      });

      if (images.length > 1){
        buttonsContainer.appendChild(leftArrow);
        buttonsContainer.appendChild(rightArrow);
      }


      imageContainer.appendChild(buttonsContainer);
      imageContainer.appendChild(imgElement);

      // Append text div and image container to article
      article.appendChild(textDiv);
      article.appendChild(imageContainer);

      // Append article to the container
      projectsContainer.appendChild(article);
    });
  })
  .catch(error => console.error('Error fetching data:', error));

