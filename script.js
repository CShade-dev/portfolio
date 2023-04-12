gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

async function getData(url = "") {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

function countTo(viewCount) {
  let from = 0;
  let to = viewCount;
  let step = to > from ? 412960 : -412960;
  let interval = 3;

  if (from >= to) {
    document.querySelector("#views").textContent = from.toLocaleString("en-US");
    return;
  }

  let counter = setInterval(function () {
    from += step;
    document.querySelector("#views").textContent = from.toLocaleString("en-US");

    if (from >= to) {
      clearInterval(counter);
    }
  }, interval);
}

$(document).ready(function () {
    let filterToggled = false;

  $("#statsLink").click(function () {
    gsap.to(window, { duration: 1, scrollTo: "#aboutSection" });
  });

  $("#projectsLink").click(function () {
    gsap.to(window, { duration: 1, scrollTo: ".projectsSection" });
  });

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#frontPage",
      start: "bottom 85%",
      endTrigger: "#aboutSection",
      end: "top center",
      toggleActions: "play none none reverse",
    },
  });

  gsap.utils.toArray(".projectText").forEach((child, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const elementWidth = child.offsetWidth;

    gsap.fromTo(
      child,
      { x: (-1 * elementWidth) / 2 },
      {
        x: "+=" + direction * 500,
        duration: 1,
        scrollTrigger: {
          trigger: "#aboutSection",
          start: "center center",
          endTrigger: ".projectsSection",
          end: "bottom bottom",
          scrub: true,
          markers: false,
        },
      }
    );
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
    onComplete: function () {
      $("#statsBackground").css("visibility", "visible");
      $("#statsBackground")[0].play();
    },
  });

  tl.to(
    "#header",
    {
      filter: "invert(100%)",
      duration: 0.65,
      ease: "ease.out", // Add easing effect
    },
    0.2
  );
    $(".filtertoggle").click(function() {
        var classList = $( this ).attr("class");
        var classArr = classList.split(/\s+/);
        console.log(classArr);
        if (filterToggled == false) {
            $(".filtertoggle").not( this ).fadeOut(0);
            $(".project").each(function() {
                if (!$(this).hasClass(classArr[1])) {
                    $(this).fadeOut(0);
                }
            })
            filterToggled = true;
        } else {
            $(".filtertoggle").not( this ).fadeIn(0);
            $(".project").each(function() {
                if (!$(this).hasClass(classArr[1])) {
                    $(this).fadeIn(0);
                }
            })
            filterToggled = false;
        }
        })

});
