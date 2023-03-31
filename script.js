gsap.registerPlugin(ScrollToPlugin,ScrollTrigger);

async function getData(url = "") {
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      }
    });
    return response.json();
  };
function countTo(viewCount) {
    let from = 0
    let to = viewCount;
    let step = to > from ? 412960 : -412960;
    let interval = 3;

    if(from >= to){
        document.querySelector("#views").textContent = from.toLocaleString("en-US");
        return;
    }

    let counter = setInterval(function(){
        from += step;
        document.querySelector("#views").textContent = from.toLocaleString("en-US");

        if(from >= to){
            clearInterval(counter);
        }
    }, interval);
};
        


$( document ).ready(function() {
    $("#statsLink").click(function(){
        gsap.to(window, {duration: 1, scrollTo: "#aboutSection"});
    });
        getData("https://app.ytjobs.co/api/talents/1040").then((data) => {
            var totalViewCount = data.youtubeVideos.statistics.views;
            var totalVideoCount = data.youtubeVideos.statistics.counts;
            document.querySelector("#videoCount").textContent = totalVideoCount;
            countTo(totalViewCount);
        });
});