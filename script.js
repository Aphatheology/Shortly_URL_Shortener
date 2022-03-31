const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const inputUrl = document.querySelector('.input-url');
const shortItBtn = document.querySelector('.shortit');
const allLinksDiv = document.querySelector('.about-links');

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});

const localStorageUrl = JSON.parse(localStorage.getItem('storedLinksInput'));

let shortenLinksInput = localStorage.getItem('storedLinksInput') !== null ? localStorageUrl : [];

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
	}
}

shortItBtn.addEventListener('click' , () => {
  if(inputUrl.value == '' || inputUrl.value === 0) {
    console.log('enter valid url')
  } else {
    if (!isValidURL(inputUrl.value)) {
      console.log('false')
    } else {
	  shortUrl(inputUrl.value)

    }
  }
})

function isValidURL(url) {
  let res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

async function shortUrl(url) {
		
	const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
	const data = await response.json();

	if(data.ok === true) {
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
		let saveUrl = {
			'input': inputUrl.value,
			'url': data.result.short_link2
		}
		
		shortenLinksInput.push(saveUrl);

		localStorage.setItem('storedLinksInput' , JSON.stringify(shortenLinksInput));
		inputUrl.value = '';
	} else {
		console.log('invalid link')
	}
  }

  const checkDiv = JSON.parse(localStorage.getItem('storedLinksInput'));

  