chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'igorofflinespotify') {
            const myUrl = request.url;
            const myAlbumsURL = chrome.runtime.getURL('albums.json');
            fetch(myAlbumsURL)
                .then(response => response.json())
                .then(data => {
                    console.log(`Loaded ${data.length} album data!`);
                    data.forEach(album => {
                        if (myUrl.includes(album.url)) {
                            console.log(`Album name: ${album.name}`);
                        }
                    });
                })
                .catch(error => {
                    console.error('Error loading JSON:', error);
                });
        }
    });