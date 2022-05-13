flipped_cards = [];
to_flip_back_cards = [];

start_time = 0;

count = 0;

function start_game() {
    document.querySelector(".start-screen").classList.add("fade-out");
    setTimeout(function() {
        document.querySelector(".start-screen").style.display = "none";
    }, 800);

    setTimeout(init, 800);
}

function init() {
    cards = document.querySelectorAll(".card");
    card_backs = document.querySelectorAll(".card-content > .card-back");
    card_labels = document.querySelectorAll(".card-back > .card-label");
    start_time = new Date().getTime();
    count = cards.length;
    ids = [];
    colours = [];

    flipped_cards = [];
    to_flip_back_cards = [];

    for(let card of cards) {
        if(card.getAttribute("data-isflipped") == "true") {
            card.setAttribute("data-isflipped", "false");
            card.classList.add("unflipped-card");
            card.classList.remove("flipped-card");
        }
    }

    for(let i = 0; i < cards.length; i++) {
        ids.push(Math.floor(i / 2));
        colours.push(Math.floor(i / 2) * (720/cards.length));
    }

    for(let i = 0; i < cards.length; i++) {
        cards[i].onclick = function() { flip(cards[i]); };
        random_index = Math.floor(Math.random() * ids.length);
        curr_id = ids.splice(random_index, 1);
        curr_colour = colours.splice(random_index, 1);

        cards[i].setAttribute("data-cardid", curr_id);
        card_backs[i].style.backgroundColor = "hsl(" + curr_colour + ", 20%, 50%)";
        card_labels[i].innerHTML = (parseInt(curr_id) + 1);
    }
    
    document.querySelector(".time-output").classList.add("fade-out");
    document.querySelector(".time-output").classList.remove("fade-slide-from-bottom");
}

function flip(element) {
    if(element.getAttribute("data-isflipped") != "true") {
        element.setAttribute("data-isflipped", "true");
        element.classList.add("flipped-card");
        element.classList.remove("unflipped-card");
        flipped_cards.push(element);
        if(flipped_cards.length >= 2) {
            if(flipped_cards[0].getAttribute("data-cardid") != flipped_cards[1].getAttribute("data-cardid")) {
                to_flip_back_cards.push(flipped_cards[0]);
                to_flip_back_cards.push(flipped_cards[1]);

                setTimeout(flip_back, 600);
            }
            else {
                count -= 2;
                if(count <= 0) {
                    end_time = new Date().getTime();
                    game_duration = end_time - start_time;
                    duration_str = Math.floor(game_duration / 60000) + ":" + Math.floor(((game_duration / 1000) % 60) / 10) + "" + Math.floor(((game_duration / 1000) % 60) % 10) + "." + Math.round((game_duration / 100) % 10);
                    document.querySelector(".time-output").innerHTML = duration_str;
                    document.querySelector(".time-output").classList.add("fade-slide-from-bottom");
                    document.querySelector(".time-output").classList.remove("fade-out");
                }
            }
            flipped_cards = [];
        }
    }
}

function flip_back() {
    flip_back_1 = to_flip_back_cards.shift();
    flip_back_1.setAttribute("data-isflipped", "false");
    flip_back_1.classList.add("unflipped-card");
    flip_back_1.classList.remove("flipped-card");

    flip_back_2 = to_flip_back_cards.shift();
    flip_back_2.setAttribute("data-isflipped", "false");
    flip_back_2.classList.add("unflipped-card");
    flip_back_2.classList.remove("flipped-card");
}