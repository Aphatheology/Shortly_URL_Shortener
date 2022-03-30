const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const inputUrl = document.querySelector('.input-url');
const shortItBtn = document.querySelector('.shortit');
const allLinksDiv = document.querySelector('.about-links')

navToggle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});

shortItBtn.addEventListener('click' , () => {
  if(inputUrl.value == '' || inputUrl.value === 0) {
    console.log('enter valid url')
  } else {
    if (!isValidURL(inputUrl.value)) {
      console.log('false')
    } else {
      //console.log('true')
    //   async function shortUrl() {
		
    //     const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${inputUrl.value}`);
    //     const data = await response.json();
	// 	// {
	// 	// 	"ok": true,
	// 	// 	"result": {
	// 	// 		"code": "iVGTxD",
	// 	// 		"short_link": "shrtco.de/iVGTxD",
	// 	// 		"full_short_link": "https://shrtco.de/iVGTxD",
	// 	// 		"short_link2": "9qr.de/iVGTxD",
	// 	// 		"full_short_link2": "https://9qr.de/iVGTxD",
	// 	// 		"short_link3": "shiny.link/iVGTxD",
	// 	// 		"full_short_link3": "https://shiny.link/iVGTxD",
	// 	// 		"share_link": "shrtco.de/share/iVGTxD",
	// 	// 		"full_share_link": "https://shrtco.de/share/iVGTxD",
	// 	// 		"original_link": "https://aphatheology.github.io/Shortly_URL_Shortener/"
	// 	// 	}
	// 	// }

	// 	// <a class="shorten-link-a" href="https://${data.result.short_link2}" target="_blank">${data.result.short_link2}
	// 	// 		</a>

	// 	if(data.ok === true) {
	// 		let newLinkDiv = document.createElement('div');
	// 		newLinkDiv.classList.add('shortened');
	// 		newLinkDiv.innerHTML = `
	// 		<h4 class="input-link">${inputUrl.value}</h4>
	// 		<hr>
	// 		<h4 class="shorten-link">
	// 			${data.result.short_link2}
	// 		</h4>
	// 		<button>Copy</button>
	// 		`;
	// 		allLinksDiv.appendChild(newLinkDiv);
	// 		inputUrl.value = '';
	// 	} else {
	// 		console.log('invalid link')
	// 	}
    //   }

	  shortUrl(inputUrl.value)

    }
    
    // inputUrl.value = ''
  }
  
  // console.log(inputUrl.value, allLinksDiv)
})

function isValidURL(url) {
  let res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

async function shortUrl(url) {
		
	const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
	const data = await response.json();
	// {
	// 	"ok": true,
	// 	"result": {
	// 		"code": "iVGTxD",
	// 		"short_link": "shrtco.de/iVGTxD",
	// 		"full_short_link": "https://shrtco.de/iVGTxD",
	// 		"short_link2": "9qr.de/iVGTxD",
	// 		"full_short_link2": "https://9qr.de/iVGTxD",
	// 		"short_link3": "shiny.link/iVGTxD",
	// 		"full_short_link3": "https://shiny.link/iVGTxD",
	// 		"share_link": "shrtco.de/share/iVGTxD",
	// 		"full_share_link": "https://shrtco.de/share/iVGTxD",
	// 		"original_link": "https://aphatheology.github.io/Shortly_URL_Shortener/"
	// 	}
	// }

	// <a class="shorten-link-a" href="https://${data.result.short_link2}" target="_blank">${data.result.short_link2}
	// 		</a>

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
		inputUrl.value = '';
	} else {
		console.log('invalid link')
	}
  }