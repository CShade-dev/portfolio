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
    $("#projectsLink").click(function(){
        gsap.to(window, {duration: 1, scrollTo: ".projectsSection"});
    });
        var tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#frontPage",
                start: "bottom 85%",
                endTrigger: "#aboutSection",
                end: "top center",
                toggleActions: "play none none reverse"
            }
        });

        tl.to(".backgroundChange", {
            backgroundColor: "black",
            duration: 0.65,
            ease: "ease.out", // Add easing effect
            onStart: function () {
                getData("https://app.ytjobs.co/api/talents/1040").then((data) => {
                    var totalViewCount = data.youtubeVideos.statistics.views;
                    var totalVideoCount = data.youtubeVideos.statistics.counts;
                    document.querySelector("#videoCount").textContent = totalVideoCount;
                    countTo(totalViewCount);
                });
            },
            onComplete: function() {
                $("#statsBackground").css("visibility", "visible");
                $("#statsBackground")[0].play();
            }
        });
    });