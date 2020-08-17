const form = document.getElementById('form');
const lyrics = document.getElementById('getLyrics');
const results = document.getElementById('results');
const submit = document.getElementById('submit');
const singleLyric = document.getElementById('single-lyric');

//api url
const apiUrl = 'https://api.lyrics.ovh';

//add addEventListener
submit.addEventListener('click', () => {
    searchValue = lyrics.value;
    if(!searchValue){
        alert('There is nothing to search');
    }else{
        searchLyrics(searchValue);
    }
});

function searchLyrics(searchValue){
    fetch(`${apiUrl}/suggest/${searchValue}`)
    .then(response => response.json())
    .then(data => {
        showData(data);
    })
}

function showData(data){
        results.innerHTML = `${data.data.slice(0, 10).map(song => `<div class="single-result row align-items-center my-3 p-3">
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.artist.name}</h3>
        <p class="author lead">Album by <span>${song.album.title}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button class="btn btn-success" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </div>
</div>`).join('')}`;
    
}

//addEventListener in results
results.addEventListener('click', e=>{
    const clickElement = e.target;
    //check clickElement if button or not
    if(clickElement.tagName === 'BUTTON'){
        const artist = clickElement.getAttribute('data-artist');
        const songTitle = clickElement.getAttribute('data-songtitle');
        //console.log(artist);
        getLyrics(artist, songTitle);
    }
})

async function getLyrics(artist, songTitle){
    const res = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
    const data = await res.json();
    
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    singleLyric.innerHTML =`<h2 class="text-success mb-4">${songTitle}</h2>
    <pre class="lyric text-white">${lyrics}</pre>`;
}
