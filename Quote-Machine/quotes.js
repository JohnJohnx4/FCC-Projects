// {
//     quote: "",
//     author: ""
// },
var quoteList = [
    {
        quote: "But you know, happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
        author: "Albus Dumbledore"
    },
    {
        quote: "There are all kinds of courage. It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
        author: "Albus Dumbledore"
    },
    {
        quote: "The truth. It is a beautiful and terrible thing, and should therefore be treated with great caution.",
        author: "Albus Dumbledore"
    },
    {
        quote: "After all, to the well-organised mind, death is but the next great adventure.",
        author: "Albus Dumbledore"
    },
    {
        quote: "It does not do to dwell on dreams and forget to live.",
        author: "Albus Dumbledore"
    },
    {
        quote: "It is our choices, Harry, that show what we truly are, far more than our abilities.",
        author: "Albus Dumbledore"
    },
    {
        quote: "I solemnly swear that I am up to no good.",
        author: "George Weasley"
    },
    {
        quote: "Numbing the pain for a while will make it worse when you finally feel it.",
        author: "Albus Dumbledore"
    },
    {
        quote: "What\'s comin\' will come, an\' we\'ll meet it when it does.",
        author: "Rubeus Hagrid"
    },
    {
        quote: "If you want to know what a man\'s like, take a good look at how he treats his inferiors, not his equals.",
        author: "Sirius Black"
    },
    {
        quote: "The thing about growing up with Fred and George is that you sort of start thinking anything\'s possible if you\'ve got enough nerve.",
        author: "Ginny Weasley"
    },
    {
        quote: "Indifference and neglect often do much more damage than outright dislike.",
        author: "Albus Dumbledore"
    },
    {
        quote: "Dumbledore says people find it far easier to forgive others for being wrong than being right.",
        author: "Hermione Granger"
    },
    {
        quote: "It is the unknown we fear when we look upon death and darkness, nothing more.",
        author: "Albus Dumbledore"
    },
    {
        quote: "Always",
        author: "Severus Snape"
    },
    {
        quote: "Of course it is happening inside your head, Harry, but why on earth should that mean it is not real?",
        author: "Albus Dumbledore"
    },
    {
        quote: "Just because you've got the emotional range of a teaspoon doesn't mean we all have.",
        author: "Albus Dumbledore"
    },
    {
        quote: "It\'s wingardium leviOsa, not leviosAH.",
        author: "Hermione Granger"
    },
    {
        quote: "Help will always be given at Hogwarts, Harry, to those who ask for it. I\'ve always prized myself on my ability to turn a phrase. Words are, in my not so humble opinion, our most inexhaustible source of magic. Capable of both inflicting injury, and remedying it. But I would, in this case, amend my original statement to this: \"Help would always be given at Hogwarts to those who deserve it.\" Do not pity the dead, Harry. Pity the living. And above all, those who live without love.",
        author: "Albus Dumbledore"
    },
    {
        quote: "Never trust anything that can think for itself if you can\'t see where it keeps its brain.",
        author: "Arthur Weasley"
    },
    {
        quote: "Not my daughter, you bitch!",
        author: "Molly Weasley"
    },
    {
        quote: "I am what I am, an\' I\'m not ashamed. \'Never be ashamed,\' my ol\' dad used ter say, \'there\'s some who\'ll hold it against you, but they\'re not worth botherin\' with.",
        author: "Rubeus Hagrid"
    }
]

class Quote {
    constructor(element, array) {
        let quotes = array;
        this.element = element;
        this.appendQuote(quotes);
        this.attachButtonFunction(quotes);
    }
    
    randomNumGen(arr) {
        const ranRange = arr.length;
        var rando = Math.floor(Math.random() * Math.floor(ranRange));
        return rando;
    }
    
    generateQuote(arr) {
        let rand = this.randomNumGen(arr);
        return arr[rand];
    }
    
    appendQuote(arr) {
        let randQuote = this.generateQuote(arr);
        var target = document.getElementById("quotetext");
        
        let quoteOut = "\"" + randQuote.quote + "\"";
        let authorOut = "-" + randQuote.author;
        
        var quoteContainer = document.createElement("div");
        quoteContainer.className = "quote__container";
        quoteContainer.id = "quote__container__id"
        
        var quoteDiv = document.createElement("div");
        quoteDiv.className = "quote__text";
        
        var authorDiv = document.createElement("div");
        authorDiv.className = "quote__author";
        
        quoteDiv.appendChild(document.createTextNode(quoteOut));
        authorDiv.appendChild(document.createTextNode(authorOut));
        
        quoteContainer.appendChild(quoteDiv);
        quoteContainer.appendChild(authorDiv);
        target.appendChild(quoteContainer);
        
    }
    
    newQuote(arr) {
        var target = document.getElementById("quote__container__id");
        target.remove(target);
        this.appendQuote(arr);
    }

    attachButtonFunction(arr) {
        let x = this;
        document.getElementById("quoteButton").addEventListener("click", function() {
            x.newQuote(arr)});
    }
}

let quoteTarget = document.getElementById("quotetext");
let quoteNode = new Quote(quoteTarget, quoteList);
