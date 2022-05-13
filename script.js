function callback(entries, observer)
{
    entries.forEach(entry => {
        if(entry.isIntersecting)
        {
            entry.target.classList.add("expanded");
        }
    });
};

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
};

let observer = new IntersectionObserver(callback, options);
document.querySelectorAll(".expand-on-view").forEach(entry => {
    observer.observe(entry);
});

document.querySelectorAll(".secret").forEach(entry => {
    if(localStorage.getItem(entry.getAttribute("data-id")) == "found") {
        document.querySelector(".secret").style.display = "none";
    }
});

function find_secret(e)
{
    localStorage.setItem(e.getAttribute("data-id"), "found");
    e.style.display = "none";
    alert("Congratulations! You've found a secret!");
}