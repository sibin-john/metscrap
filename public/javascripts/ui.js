function scrap() {
    var url = document.getElementById('url').value;
    if(url) {
        window.location = "/parse?url="+url;
    } else {
        alert("Please enter a valid url and try again.")
    }
}