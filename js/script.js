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
  