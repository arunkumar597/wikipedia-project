let searchInputElement = document.getElementById('searchInput');
let searchResultsElement = document.getElementById('searchResults');
let spinnerElement = document.getElementById('spinner');
function createAndAppendSearchResult(result) {
    // creating result item
    let resultsItem = document.createElement('div');
    resultsItem.classList.add('result-item');
    searchResultsElement.appendChild(resultsItem);
    
    // creating title
    let {link,title,description} = result;
    let resultTitleElement = document.createElement('a');
    resultTitleElement.href = link;
    resultTitleElement.target = '_blank';
    resultTitleElement.textContent = title;
    resultTitleElement.classList.add('result-title');
    resultsItem.appendChild(resultTitleElement);

    // creating break Element
    let titleBreakElement = document.createElement('br');
    resultsItem.appendChild(titleBreakElement);
    
    // creating url 
    let urlElement = document.createElement('a');
    urlElement.href = link;
    urlElement.target = '_blank';
    urlElement.textContent = link;
    urlElement.classList.add('result-url');
    resultsItem.appendChild(urlElement);
    
    // creating break Element
    let linkBreakElement = document.createElement('br');
    resultsItem.appendChild(linkBreakElement);

    // adding description
    let descriptionElement = document.createElement('p');
    descriptionElement.classList.add('link-description');
    descriptionElement.textContent = description;
    resultsItem.appendChild(descriptionElement);
}

function displayResults(searchResults) {
    // let result = searchResults[0];
    spinnerElement.classList.toggle('d-none');
    for(let item of searchResults){
        createAndAppendSearchResult(item);
    }
    
}

function searchWiki(event) {
    if (event.key === "Enter") {
        spinnerElement.classList.toggle('d-none');
        searchResultsElement.textContent = '';
        let searchInputValue = searchInputElement.value;
        // console.log(searchInputValue);
        let url = 'https://apis.ccbp.in/wiki-search?search=' + searchInputValue;
        console.log(url);
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                console.log(jsonData);
                displayResults(search_results);
                
            });
    }
}

searchInputElement.addEventListener('keydown', searchWiki);