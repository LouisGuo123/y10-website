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