/*==========================================================
ELEMENTS
==========================================================*/

const screens = {

    welcome: document.getElementById("welcomeScreen"),
    envelope: document.getElementById("envelopeScreen"),
    story: document.getElementById("storyScreen")

};
const invitationTitle = document.getElementById("invitationTitle");
const backgroundOverlay = document.getElementById("backgroundOverlay");

const beginButton = document.getElementById("beginButton");
const envelopeImage = document.getElementById("envelopeImage");
const flyingCard = document.getElementById("flyingCard");

const cardWrapper = document.getElementById("cardWrapper");
const cardContent = document.getElementById("cardContent");

const storyGif = document.getElementById("storyGif");
const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");
const storyTextContainer = document.getElementById("storyTextContainer");

const invitationLayout = document.getElementById("invitationLayout");
const invitationImage = document.getElementById("invitationImage");
const cornerGif = document.getElementById("cornerGif");

const nextButton = document.getElementById("nextButton");
const yesButton = document.getElementById("yesButton");
const sponsorYesButton = document.getElementById("sponsorYesButton");

const sponsorNoButton = document.getElementById("sponsorNoButton");
const maybeButton = document.getElementById("maybeButton");
const noButton = document.getElementById("noButton");
const continueButton = document.getElementById("continueButton");
const closeButton = document.getElementById("closeButton");

const backgroundMusic = document.getElementById("backgroundMusic");
const popSound = document.getElementById("popSound");
const glitterSound = document.getElementById("glitterSound");
const anyaVoice = document.getElementById("anyaVoice");

/*==========================================================
GLOBAL
==========================================================*/

const RSVP_API =
"https://script.google.com/macros/s/AKfycbxdxFIhBVj555bs18fCuCnCTy2EApy4VsThXlZDXcDQF02jVjLKDnru755woPms5j6t9w/exec";

let currentPage = 0;
let typingTimer = null;
let typingFinished = false;
let musicStarted = false;
let guestWillAttend = true;
let attendanceChoice = "";

const urlParams = new URLSearchParams(window.location.search);

const guestName =
    urlParams.get("name") || "Friend";

const guestType =
    (urlParams.get("type") || "guest").toLowerCase();

const isGuest =
    guestType === "guest";

const isNinong =
    guestType === "ninong";

const isNinang =
    guestType === "ninang";

const sponsorTitle =
    isNinang ? "Ninang" : "Ninong";

/*==========================================================
PAGES
==========================================================*/

const pages = [

{
    gif:"Assets/gifs/hello.gif",
    title:"",
    text:`Hi!

I'm Anya.

I'm turning ONE year old 
very soon!

Mama and Dada made this little magical invitation just for you.`,
    button:"next"
},

{
    gif:"Assets/gifs/loving.gif",
    title:"",
    text:`Can you believe it?

It's already been one whole year since I came into this world.
Even though I'm still little, 
Mama and Dada tell me that this first birthday is a very special milestone for our family.
So... I hope you'll celebrate 
it with us.`,
    button:"next"
},

{
    gif:"Assets/gifs/cheeky.gif",
    title:"",
    text:`My real birthday is
September 10...

But my Dedication and Birthday 
Celebration will be held on

Saturday,
September 12, 2026
at 10:00 AM`,
    button:"next"
},

{
    gif:"Assets/gifs/please.gif",
    title:"",
    text:`
    
    
    
    Will you come to my
birthday party?`,
    button:"choices",
    centerText:true
},

{
    invitation:true,

    gif:"Assets/gifs/surprise.gif",

    text:`Now, it is my greatest joy
to officially invite you
to my Birthday celebration!`,

    button:"continue"
},

{
    gif:"Assets/gifs/silly.gif",
    title:"",
    text:`For more details about my
Birthday & Dedication,

don't hesitate to contact
my Mama and Dada.

They would be delighted
to hear from you!`,
    button:"next"
},

{
    gif:"Assets/gifs/laughing.gif",
    title:"",
    text:`I can't wait to celebrate with everyone I love.
There will be smiles...
Lots of food...
And of course...
lots of pictures together!
I'll be waiting for you!
See you soon!

💕
Love,
Anya`,
    button:"close"
}

,
{
    gif:"Assets/gifs/shy.gif",
    title:"",
    text:`Thank you for reading
my little invitation.
Your love, prayers,
and kind wishes
are already a wonderful gift to me.
I hope to see you again someday.
Until then,
take good care!

💕
Love,
Anya
`,
    button:"close",
    notAttendingEnding:true
}

];

console.log("Pages:");
pages.forEach((page, index) => {
    console.log(index, page.button, page.sponsorResult || "");
});

/* ===========================================
   Ninong / Ninang Pages
=========================================== */

if (isNinong || isNinang) {

    pages.splice(4, 0,

        {
            gif: "Assets/gifs/shy.gif",
            title: "",
            text: `Can I tell you a little secret?

Mama and Dada always tell me how blessed they are because of wonderful people like you.

They say you've been part of so many happy memories in their lives.

Even before I was born...`,
            button: "next"
        },

        {
            gif: "Assets/gifs/nagmamakaawa.gif",
            title: "",
            text: `That's why...
I'm a little shy to ask...

But...

Would you do me the honor of becoming my
"${sponsorTitle}"

and help guide me as I grow up?`,
            button: "sponsorChoices",
            centerText: true
        },

        {
            gif: "Assets/gifs/overjoy.gif",
            title: "",
            text: `Really!?? Wow! 
Thank you so much!

Knowing you'll be one of my ${sponsorTitle} makes my heart so happy.
I promise I'll keep making you proud as I grow up.

Let's make lots of wonderful memories together!`,
            button: "continue",
            sponsorResult: "yes"
        },

        {
            gif: "Assets/gifs/thankful.gif",
            title: "",
            text: `That's perfectly okay.
Thank you for being honest.
No matter what, you'll always be someone special to me and my family.

Thank you for taking the time to read my invitation.`,
            button: "continue",
            sponsorResult: "no"
        }

    );

}


console.log("Pages:");
pages.forEach((page, index) => {
    console.log(index, page.button, page.sponsorResult || "");
});

/*==========================================================
HELPERS
==========================================================*/

async function saveRSVP(attendance, sponsorship = "-") {

    const invitationId = urlParams.get("id") || "";
    const name = urlParams.get("name") || "";

    try {

        await fetch(RSVP_API, {

            method: "POST",

            body: JSON.stringify({

                invitationId,
                name,
                attendance,
                sponsorship

            })

        });

        console.log("RSVP Saved");

    } catch (error) {

        console.error(error);

    }

}

function playPop(){

    popSound.currentTime = 0;
    popSound.play();

}

function playGlitter(){

    glitterSound.pause();

    glitterSound.currentTime = 0;

    glitterSound.play().catch(()=>{});

}

function playMusic(){

    if(musicStarted) return;

    musicStarted = true;

    backgroundMusic.volume = .35;
    backgroundMusic.play();

}

/* ==============================
   BABY ANYA VOICE
============================== */

function playAnya(){

    anyaVoice.pause();

    anyaVoice.currentTime = 0;

    anyaVoice.play().catch(()=>{});

}

function stopAnya(){

    anyaVoice.pause();

    anyaVoice.currentTime = 0;

}

function hideAllScreens(){

    Object.values(screens).forEach(screen=>{

        screen.classList.remove("active");

    });

}

function hideAllScreens(){

    Object.values(screens).forEach(screen=>{

        screen.classList.remove("active");

    });

}

function showScreen(screen){

    hideAllScreens();

    screen.classList.add("active");

}

function hideButtons(){

    nextButton.classList.remove("showButton");
    yesButton.classList.remove("showButton");
    sponsorYesButton.classList.remove("showButton");
    sponsorNoButton.classList.remove("showButton");
    maybeButton.classList.remove("showButton");
    noButton.classList.remove("showButton");
    continueButton.classList.remove("showButton");
    closeButton.classList.remove("showButton");
    

}

/*==========================================================
START
==========================================================*/

const welcomeTitle = document.getElementById("welcomeTitle");

welcomeTitle.innerHTML =
`Hi ${guestName}!<br><br>
Someone has a<br>
message for you...`;

showScreen(screens.welcome);

hideButtons();

/*==========================================================
EVENTS
==========================================================*/

beginButton.addEventListener("click", () => {

    playPop();
    playMusic();

    showScreen(screens.envelope);

});

envelopeImage.addEventListener("click", () => {

    const envelopeText = document.getElementById("envelopeText");
    envelopeText.style.display = "none";

    playGlitter();

    
    /* Play the opening GIF */
    envelopeImage.src =
        "Assets/images/envelope_opening.gif";

    const whiteFlash = document.getElementById("whiteFlash");

    setTimeout(() => {

        envelopeImage.classList.add("envelopeZoom");
        whiteFlash.classList.add("active");

    },4000);



    /* Wait for the opening GIF to finish */
    setTimeout(() => {

        backgroundOverlay.style.background =
            "rgba(0,0,0,.62)";

        document.body.classList.add("cardVisible");

        showScreen(screens.story);

        currentPage = 0;

        loadPage();

        /* Reset for next replay */
        envelopeImage.src =
            "Assets/images/envelope_closed.png";

        envelopeText.style.display = "";

        envelopeImage.classList.remove("envelopeZoom");
        whiteFlash.classList.remove("active");

    },5290);

});

/*==========================================================
LOAD PAGE
==========================================================*/

function loadPage() {

    clearTimeout(typingTimer);

    typingFinished = false;

    hideButtons();

    const page = pages[currentPage];

    /* Story Mode */

    if (!page.invitation) {

        cardContent.classList.remove("invitationMode");
        cardContent.classList.add("storyMode");

        invitationTitle.classList.remove("plainInvitationTitle");

        storyGif.src = page.gif + "?t=" + Date.now();

        // Make Anya bigger only on sponsor pages
        if (page.button === "sponsorChoices") {
            storyGif.style.width = "180px";
        }
        else if (page.sponsorResult === "yes") {
    storyGif.style.width = "180px";
        }
        else if (page.sponsorResult === "no") {
            storyGif.style.width = "135px";   // Adjust this number to your liking
        }
        else {
            storyGif.style.width = "120px";
        }

        setTimeout(()=>{

            typeWriter(page.text);

        },250);

    }

    /* Invitation Mode */

    else {

    cardContent.classList.remove("storyMode");
    cardContent.classList.add("invitationMode");

    invitationTitle.classList.add("plainInvitationTitle");
    storyTitle.classList.remove("plainInvitationTitle");

    invitationTitle.textContent = page.text;

    invitationImage.src =
        "Assets/images/invitation.png";

    cornerGif.src =
        page.gif + "?t=" + Date.now();

    showButtons(page.button);

    }

}

function fadeToNextPage(callback){

    const whiteFlash = document.getElementById("whiteFlash");

    whiteFlash.classList.add("active");

    cardWrapper.classList.remove("cardFadeIn");
    cardWrapper.classList.add("cardFadeOut");

    setTimeout(()=>{

        callback();

        cardWrapper.classList.remove("cardFadeOut");
        cardWrapper.classList.add("cardFadeIn");

        whiteFlash.classList.remove("active");

    },2000);

}


/*==========================================================
TYPEWRITER
==========================================================*/

function typeWriter(text) {

    storyText.textContent = "";

    let index = 0;

    storyText.classList.add("typingCursor");

    playAnya();

    function type() {

        if (index < text.length) {

            storyText.textContent += text.charAt(index);

            index++;

            fitText();

            typingTimer = setTimeout(type,45);

        }

        else {

            stopAnya();

            storyText.classList.remove("typingCursor");

            typingFinished = true;

            showButtons(pages[currentPage].button);

        }

    }

    type();

}

/*==========================================================
AUTO TEXT SIZE
==========================================================*/

function fitText() {

    storyText.classList.remove(
        "font24",
        "font22",
        "font20",
        "font18",
        "font16"
    );

    const sizes = [

    "font24",

    "font22",

    "font20",

    "font18",

    "font16",

    "font14",

    "font12"

];

    for (const size of sizes) {

        storyText.classList.add(size);

        if (
            storyText.scrollHeight <=
            storyTextContainer.clientHeight
        ) {
            break;
        }

        storyText.classList.remove(size);
    }

}

/*==========================================================
BUTTONS
==========================================================*/

function showButtons(type){

    switch(type){

        case "next":

            nextButton.classList.add("showButton");

        break;

        case "choices":

            yesButton.classList.add("showButton");
            maybeButton.classList.add("showButton");
            noButton.classList.add("showButton");

        break;

        case "sponsorChoices":

            sponsorYesButton.classList.add("showButton");
            sponsorNoButton.classList.add("showButton");

        break;

        case "continue":

            continueButton.classList.add("showButton");

        break;

        case "close":

            closeButton.classList.add("showButton");

        break;

    }

}

/*==========================================================
NEXT
==========================================================*/

nextButton.addEventListener("click", () => {

    playPop();

    if (!typingFinished) {

        clearTimeout(typingTimer);

        storyText.textContent = pages[currentPage].text;

        storyText.classList.remove("typingCursor");

        fitText();

        typingFinished = true;

        showButtons(pages[currentPage].button);

        return;

    }

    fadeToNextPage(()=>{

    currentPage++;

    // If the guest answered NO,
    // show the special farewell page instead.
    if (
        !guestWillAttend &&
        pages[currentPage] &&
        pages[currentPage].button === "close" &&
        !pages[currentPage].notAttendingEnding
    ) {
        currentPage++;
    }

    loadPage();

});

});

/*==========================================================
CONTINUE
==========================================================*/

continueButton.addEventListener("click", () => {

    playPop();

    fadeToNextPage(()=>{

    const page = pages[currentPage];

    if (page.sponsorResult) {

        currentPage += 2;

    } else {

        currentPage++;

    

    }

    loadPage();

});

});

/*==========================================================
RSVP
==========================================================*/

yesButton.addEventListener("click", () => {

    playPop();

    attendanceChoice = "Yes";

    saveRSVP(attendanceChoice);

    storyGif.src =
        "Assets/gifs/excited.gif?t=" + Date.now();

    storyText.textContent =
`Yaaay!!
You just made my 
tiny heart so happy!
I can't wait to laugh, play,
take lots of pictures,
and make beautiful 
memories with you.`;

    fitText();

    hideButtons();

    continueButton.classList.add("showButton");

});

maybeButton.addEventListener("click", () => {

    playPop();

    attendanceChoice = "Maybe";

    saveRSVP(attendanceChoice);

    storyGif.src =
        "Assets/gifs/cheeky.gif?t=" + Date.now();

    storyText.textContent =
`That's okay!

I know sometimes
grown-ups get busy.

I'd still love to give you
my formal invitation,

just in case
you decide to come!`;

    fitText();

    hideButtons();

    continueButton.classList.add("showButton");

});

noButton.addEventListener("click", () => {

    playPop();

    attendanceChoice = "No";

    saveRSVP(attendanceChoice);

    guestWillAttend = false;

    storyGif.src =
        "Assets/gifs/yehey.gif?t=" + Date.now();

    storyText.textContent =
`Aww...
It's okay...

But thank you for 
taking the time
to read my invitation.

Whether you can come or not, 
I still wanted to give you this invitation.`;

    fitText();

    hideButtons();

    continueButton.classList.add("showButton");

});


/*==========================================================
SPONSOR CHOICE
==========================================================*/

sponsorYesButton.addEventListener("click", () => {

    playPop();

    saveRSVP(attendanceChoice, "Yes");

    currentPage++;   // Go to the "Thank you!" page

    loadPage();

});

sponsorNoButton.addEventListener("click", () => {

    playPop();

    saveRSVP(attendanceChoice, "No");



    currentPage += 2;   // Skip to the "That's perfectly okay." page

    loadPage();

});

/*==========================================================
CLOSE
==========================================================*/

closeButton.addEventListener("click", () => {

    playPop();

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    stopAnya();

    const phone = document.getElementById("phoneStage");

    phone.style.transition = "opacity 1.5s ease";
    phone.style.opacity = "0";

    setTimeout(() => {

        window.close();

    }, 1500);

});

/*==========================================================
RESTART GIF
==========================================================*/

function refreshGif(img,path){

    img.src="";

    requestAnimationFrame(()=>{

        img.src=path+"?t="+Date.now();

    });

}

/*==========================================================
FLYING LEAVES
==========================================================*/

const leafLayer = document.getElementById("leafLayer");

const leafImages = [

    "Assets/images/leaf1.png",
    "Assets/images/leaf2.png",
    "Assets/images/leaf3.png"

];

function createLeaf(){

    const leaf = document.createElement("div");

    leaf.className = "leaf";

    const img = document.createElement("img");

    img.src = leafImages[
        Math.floor(Math.random()*leafImages.length)
    ];

    leaf.appendChild(img);

    leaf.style.left =
        (Math.random()*110 - 5) + "%";

    const size =
        18 + Math.random()*26;

    leaf.style.width = size + "px";

    leaf.style.height = size + "px";

    leaf.style.animationDuration =
        10 + Math.random()*8 + "s";

    leaf.style.animationDelay =
        Math.random()*4 + "s";

    leafLayer.appendChild(leaf);

    setTimeout(()=>{

        leaf.remove();

    },18000);

}

for(let i=0;i<18;i++){

    createLeaf();

}

setInterval(createLeaf,900);

/*==========================================================
GIF CACHE REFRESH
==========================================================*/

function reloadGif(image,path){

    image.src="";

    requestAnimationFrame(()=>{

        image.src=path+"?"+Date.now();

    });

}

/*==========================================================
UNLOCK AUDIO
==========================================================*/

document.addEventListener("pointerdown",()=>{

    backgroundMusic.play().then(()=>{

        backgroundMusic.pause();

        backgroundMusic.currentTime=0;

    }).catch(()=>{});

},{once:true});

/*==========================================================
PRELOAD
==========================================================*/

const preload=[

"Assets/gifs/hello.gif",
"Assets/gifs/loving.gif",
"Assets/gifs/cheeky.gif",
"Assets/gifs/please.gif",
"Assets/gifs/surprise.gif",
"Assets/gifs/excited.gif",
"Assets/gifs/yehey.gif",
"Assets/images/card.png",
"Assets/images/invitation.png",
"Assets/images/background.png",
"Assets/images/envelope.png"

];

preload.forEach(src=>{

    const img=new Image();

    img.src=src;

});

/*==========================================================
PREVENT IMAGE DRAG
==========================================================*/

document.querySelectorAll("img").forEach(img=>{

    img.draggable=false;

});

/*==========================================================
STARTUP
==========================================================*/

showScreen(screens.welcome);

hideButtons();

backgroundOverlay.style.background="rgba(0,0,0,0)";

console.log("Anya Invitation Loaded");