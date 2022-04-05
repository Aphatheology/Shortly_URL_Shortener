const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const inputUrl = document.querySelector('.input-url');
const shortItBtn = document.querySelector('.shortit');
const allLinksDiv = document.querySelector('.about-links');
const errorSpan = document.querySelector('.error');
const clearItBtn = document.querySelector('.clearit');
let copyItBtn;
let shortenLink;

// Working - from stackoverflow, but execCommand is deprecated
function copyURL() {
	copyItBtn = document.querySelectorAll('.shortener .shortened button');
	shortenLink = document.querySelectorAll('.shortened .shorten-link');
	copyItBtn.forEach((button, index) => {
        button.addEventListener('click', function(event) {
            let inp = document.createElement('input');
            document.body.appendChild(inp)
            inp.value = shortenLink[index].innerText;
            inp.select();
            document.execCommand('copy', false);
            inp.remove();
        })
    })
}


navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});

let duplicateUrl = [];

const localStorageUrl = JSON.parse(localStorage.getItem('storedLinksInput'));

if (localStorage.getItem('storedLinksInput') !== null) {
    for (let i = 0; i < localStorageUrl.length; i++) {
        duplicateUrl.push(localStorageUrl[i].input);
    }
} 

let shortenLinksInput = localStorage.getItem('storedLinksInput') !== null ? localStorageUrl : [];

if (localStorage.getItem('storedLinksInput') !== null && shortenLinksInput.length >= 3) {
    clearItBtn.style.visibility = 'visible';
} else {
    clearItBtn.style.visibility = 'hidden';
}

if (localStorage.getItem('storedLinksInput') !== null) {
	for(let i = 0; i < localStorageUrl.length; i++) {
		let newLinkDiv = document.createElement('div');
		newLinkDiv.classList.add('shortened');
		newLinkDiv.innerHTML = `
		<h4 class="input-link">${localStorageUrl[i].input}</h4>
		<hr>
		<h4 class="shorten-link">
			${localStorageUrl[i].url}
		</h4>
		<button>Copy</button>
		`;
		allLinksDiv.appendChild(newLinkDiv);
		copyURL()
	}
}

inputUrl.addEventListener("keyup", function(event) {
	if (event.keyCode === 13) {
	   	shortItBtn.click();
	}
});

shortItBtn.addEventListener('click' , () => {
  if(inputUrl.value == '' || inputUrl.value === 0) {
		errorSpan.innerHTML = 'Please add a link!'
		errorSpan.style.visibility = 'visible'
		inputUrl.classList.add('input-error')
} 	else {
		if (!isValidURL(inputUrl.value)) {
			errorSpan.innerHTML = 'This is an invalid link or a Shortened Link itself!';
			errorSpan.style.visibility = 'visible';
			inputUrl.classList.add('input-error')
		} 	else {
				let saveUrl = {
					'input': inputUrl.value
				}
				if (duplicateUrl.includes(saveUrl.input)) {
					errorSpan.innerHTML = "You've shorten this link before";
					errorSpan.style.visibility = 'visible';
				} else {
					shortUrl(inputUrl.value);
					errorSpan.style.visibility = 'hidden';
					inputUrl.classList.remove('input-error')
					
				}
		}
  }

})

// From Stackoverflow 
function isValidURL(url) {
  let res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};


async function shortUrl(url) {
	shortItBtn.disabled = true;
	shortItBtn.innerHTML = "Running...";
	const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
	const data = await response.json();
	if(data.ok === true) {
		let saveUrl = {
			'input': inputUrl.value,
			'url': data.result.short_link2
		}
        duplicateUrl.push(saveUrl.input)
		let newLinkDiv = document.createElement('div');
		newLinkDiv.classList.add('shortened');
		newLinkDiv.innerHTML = `
        <h4 class="input-link">${inputUrl.value}</h4>
        <hr>
        <h4 class="shorten-link">
            ${data.result.short_link2}
        </h4>
        <button>Copy</button>
        `;
		
		
        allLinksDiv.appendChild(newLinkDiv);
		shortItBtn.disabled = false;
		shortItBtn.innerHTML = "Short It!";
        shortenLinksInput.push(saveUrl);
		if (localStorage.getItem('storedLinksInput') !== null && shortenLinksInput.length >= 3) {
			clearItBtn.style.visibility = 'visible';
		} else {
			clearItBtn.style.visibility = 'hidden';
		}
		
        localStorage.setItem('storedLinksInput' , JSON.stringify(shortenLinksInput));
        inputUrl.value = '';		
		copyURL();
	} else {
		errorSpan.innerHTML = 'This is an invalid link or a Shortened Link itself!';
    	errorSpan.style.visibility = 'visible';
		inputUrl.classList.add('input-error');
		shortItBtn.disabled = false;
		shortItBtn.innerHTML = "Short It!";
	}
  }  


clearItBtn.addEventListener('click' , () => {
    localStorage.clear();
    allLinksDiv.innerHTML = '';
    duplicateUrl = [];
	localStorage = [];
	shortenLinksInput = [];
	hideClearBtn()
})

function hideClearBtn() {
	clearItBtn.style.visibility = 'hidden';
}