const titleSong = document.getElementById("stitle");
const personSong = document.getElementById("sname");
const btn = document.getElementById("submit1");

btn.addEventListener("click", () => {
    const songName = document.getElementById("stitle").value;
    const songArtist = document.getElementById("sname").value;
    const apiKey = document.getElementById("apiKey").value;
    
    if (songArtist.trim() !== '' || songName.trim() !== '') {
        fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${songName}%20${songArtist}&type=video&key=${apiKey}`, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then(data => {
            console.log(data)
            var vidId = data.items[0].id.videoId;

            getVid(vidId, apiKey);   
        })
        .catch((error) => {
            alert('Invalid API key');
        });
    }
    else {
        alert('Fill in all the fields.')
    }
    function getVid(vidId, apiKey) {
        fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${vidId}&key=${apiKey}`, {
            method: 'GET'
        })
        .then((res) => res.json())
        .then(data => {
            
            var licensed_content = data.items[0].contentDetails.licensedContent;

            var str = licensed_content ? 'This song is copyright' : 'This song is NOT copyrighted';
            console.log(str);
            document.getElementById('output').innerHTML = str;
            document.getElementById("youtubePlace").src=`https://www.youtube.com/embed/${vidId}`;
        })
        .catch((error) => {
            alert('Invalid API key');
        });
    }
})

titleSong.addEventListener('keydown', (e) => {
    var regex = new RegExp('[a-zA-Z ]');

    if (e.ctrlKey || e.altKey || typeof e.key !== 'string' || e.key.length !== 1) return;

    if (!regex.test(e.key)) {
        e.preventDefault();
    }
});

personSong.addEventListener('keydown', (e) => {
    var regex = new RegExp('[a-zA-Z ]');

    if (e.ctrlKey || e.altKey || typeof e.key !== 'string' || e.key.length !== 1) return;

    if (!regex.test(e.key)) {
        e.preventDefault();
    }
});