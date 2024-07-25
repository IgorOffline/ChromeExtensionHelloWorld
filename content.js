chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === 'igorofflinespotify') {
            const myUrl = request.url;

            const spotifyToYoutubeMusic = document.getElementById('spotify-to-youtube-music');
            if (spotifyToYoutubeMusic == null) {
                const sidebarChild = document.getElementById('Desktop_LeftSidebar_Id').getElementsByTagName('div')[0];
                const newLi = document.createElement("li");
                newLi.innerHTML = '<a id="spotify-to-youtube-music" href="#" target="_blank" rel="noopener noreferrer">?</a>';
                sidebarChild.appendChild(newLi);
            }

            const myAlbumsURL = chrome.runtime.getURL('albums.json');
            fetch(myAlbumsURL)
                .then(response => response.json())
                .then(data => {
                    console.log(`Loaded ${data.length} album data!`);
                    let albumFound = false;
                    data.forEach(album => {
                        if (myUrl.includes(album.url)) {
                            console.log(`Album name: ${album.name}`);
                            const newLi = document.getElementById("spotify-to-youtube-music");
                            newLi.innerHTML = `<a id="spotify-to-youtube-music" href=https://music.youtube.com/playlist?list=${album.ytb} target="_blank" rel="noopener noreferrer">${album.name}</a>`;
                            albumFound = true;
                        }
                    });
                    if (!albumFound) {
                        const newLi = document.getElementById("spotify-to-youtube-music");
                        newLi.innerHTML = '<a id="spotify-to-youtube-music" href="#" target="_blank" rel="noopener noreferrer">?</a>';
                    }
                })
                .catch(error => {
                    console.error('Error loading JSON:', error);
                });
        }
    });