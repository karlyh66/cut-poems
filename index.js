let sourceText = '';
let usedWords = new Set();
const WORD_COUNT = 40;
const MODIFIER_COUNT = 4;
// const SMALL_WORD_COUNT = 1;
const MODIFIERS = ['s', 's', 's', 'ing', 'en', 'ed', 'ly', 'er', 'est', 'un', 're', 'ness', 'ful']
// const SMALL_WORDS = ['a', 'an', 'is', 'or', 'and', 'and', 'the', 'I', 'you', 'me', 'us', 'we', 'he', 'she', 'which', 'what', 'for']
const X_DISPLAY_OFFSET = 0;
const Y_DISPLAY_OFFSET = 0;

const sampleTexts = [
    // hello, you've found my bookshelf
    // a tale of two cities, charles dickens 
    "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way--in short, the period was so far like the present period that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.",
    // iron, the periodic table, primo levi
    "His body was abandoned in the road for a long time, because the Fascists had forbidden the population to bury him. Today I know that it is a hopeless task to try to dress a man in words, make him live again on the printed page, especially a man like Sandro. He was not the sort of person you can tell stories about, nor to whom one erects monuments — he who laughed at all monuments: he lived completely in his deeds, and when they were over nothing of him remains — nothing but words, precisely.",
    // beyond god the father, mary daly
    "The biblical and popular image of God as a great patriarch in heaven, rewarding and punishing according to his mysterious and seemingly arbitrary will, has dominated the imagination of millions over thousands of years. The symbol of the Father God, spawned in the human imagination and sustained as plausible by patriarchy, has in turn rendered service to this type of society by making its mechanisms for the oppression of women appear right and fitting. If God in 'his' heaven is a father ruling 'his' people, then it is in the 'nature' of things and according to divine plan and the order of the universe that society be male-dominated.",
    // i and thou, martin buber
    "I contemplate a tree. I can accept it as a picture: a rigid pillar in a flood of light, or splashes of green traversed by the gentleness of the blue silver ground. I can feel it as movement: the flowing veins around the sturdy, striving core, the sucking of the roots, the breathing of the leaves, the infinite commerce with earth and air — and the growing itself in its darkness. I can assign it to a species and observe it as an instance, with an eye to its construction and its way of life. I can overcome its uniqueness and form so rigorously that I recognize it only as an expression of the law — those laws according to which a constant opposition of forces is continually adjusted, or those laws according to which the elements mix and separate. I can dissolve it into a number, into a pure relation between numbers, and eternalize it.",
    // the fire next time, james baldwin
    "Hence the question: Do I really want to be integrated into a burning house? White Americans find it as difficult as white people elsewhere do to divest themselves of the notion that they are in possession of some intrinsic value that black people need, or want. ... There is absolutely no reason to suppose that white people are better equipped to frame the laws by whcih I am to be governed than I am. It is entirely unacceptable that I should have no voice in the political affairs of my own country, for I am not a ward of America; I am one of the first Americans to arrive on these shores.",
    // a room of one's own, virginia woolf
    "If one shuts one's eyes and thinks of the novel as a whole, it would seem to be a creation owning a certain looking-glass likeness to life, though of course with simplifications and distortions innumerable. At any rate, it is a structure leaving a shape on the mind's eye, built now in squares, now pagoda shaped, now throwing out wings and arcades, now solidly compact and domed like the Cathedral of Saint Sofia at Constantinople. She lies buried where the omnibuses now stop, opposite the Elephant and Castle. Now my belief is this poet who never wrote a word and was buried at the crossroads still lives. She lives in you and in me, and in many other women who are not here tonight, for they are washing up the dishes and putting the children to bed. But she lives; for great poets do not die; they are continuing presences; they need only the opportunity to walk among us in the flesh.",
    // tell me how it ends, valeria luiselli
    "But nothing is ever that simple. I hear words, spoken in the mouths of children, threaded in complex narratives. They are delivered with hesitance, sometimes distrust, always with fear. I have to transform them into written words, succinct sentences, and barren terms. The children's stories are always shuffled, stuttered, always shattered beyond the repair of a narrative order. The problem with trying to tell their story is that it has no beginning, no middle, and no end. ... Once an attorney has agreed to take on a case, the real legal battle begins. If that battle is won, the child will obtain some form of immigration relief. If it is lost, they will receive a deportation order from a judge. I watch our own children sleep in the back seat of the car as we cross the George Washington Bridge into New Jersey. I glance back now and then from the copiilot's seat at my ten-year-old stepson, visiting us from Mexico, and my five-year-old daughter. Behind the wheel, my husband concentrates on the road ahead.",
    // either or, kierkegaard
    "What the philosophers say about reality is often as deceptive as when you see a sign in a second-hand store that reads: Pressing Done Here. If you went in with your clothes to have them pressed you would be fooled; the sign is for sale. For me nothing is more dangerous than recollection. Once I have recalled some life-situation it ceases to exist. People say that separation helps to revive love. That is quite true, but it revives it in a purely poetic way. A life in recollection is the most perfect imaginable; memory gives you your fill more abundantly than all of reality and has a security which no reality possesses. A life-situation recalled has already passed into eternity and has no more temporal interest. If anyone should keep a diary it's me, to aid my memory a little. ... I have only one friend, Echo. And why is Echo my friend? Because I love my sorrow, and Echo does not take it away from me. I have only one confidant, the silence of the night. And why is it my confidant? Because it is silent.",
    // unpacking my library, walter benjamin
    "I am unpacking my library. yes, I am. The books are not yet on the shelves, not yet touched by the mild boredom of order. I cannot march up and down their ranks to pass them in review before a friendly audience. You need not fear any of that. Instaed, I must ask you to join me in the disorder of crates that have been wrenched open, the air saturated with the dust of wood, the floor covered with torn paper, to join me among piles of volumes that are seeing daylight again after two years of darkness, so that you may be ready to share with me a bit of the mood -- it is certainly not an elegaic mood but, rather, one of anticipation -- which these books arouse in a genuine collector.  ... Among children, collecting is only one process of renewal; other processes are the painting of objects, the cutting out of figures, the application of decals -- the whole range of childlike modes of acquisition, from touching things to giving them names.",
    // in the nyt
    "Senator JD Vance of Ohio said on Thursday that school shootings were an unfortunate 'fact of life,' and he called for strengthened security measures in public schools while he spoke at a campaign event in Phoenix. ... Mr. Vance, former President Donald J. Trump's running mate, first condemned the shooting in Georgia as 'an awful tragedy' that should never have happened, and he said his thoughts and prayers were with the families. ... At a speech in Portsmouth, N.H. on Wednesday, Ms. Harris addressed the Georgia school shooting. She has previously called for universal background checks and an assault weapon ban but did not call for any policy changes in her remarks. 'We've got to stop it, and we have to end this epidemic of gun violence in our country once and for all,' she said. 'You know it doesn't have to be this way.'"
];

function processWord(word) {
    return word === "I" ? "I" : word.toLowerCase();
}

function processInput() {
    const input = document.getElementById('text-input').value.trim();
    if (input.startsWith('http')) {
        sourceText = sampleTexts[0];
    } else {
        sourceText = input;
    }
    generateWordBank();
}

function useRandomText() {
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    sourceText = sampleTexts[randomIndex];
    generateWordBank();
}

function generateWordBank() {
    const words = sourceText.match(/\b(\w+)\b/g);
    const wordBank = document.getElementById('word-bank');
    wordBank.innerHTML = '';
    usedWords.clear();

    for (let i = 0; i < WORD_COUNT && words.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words.splice(randomIndex, 1)[0];
        const processedWord = processWord(word);
        if (!usedWords.has(processedWord)) {
            createWordElement(processedWord, wordBank);
            usedWords.add(word);
        } else {
            i--;
        }
    }
    addModifiers(wordBank);
}

function addModifiers(wordBank) {
    const shuffledModifiers = MODIFIERS.sort(() => 0.5 - Math.random());
    for (let i = 0; i < MODIFIER_COUNT; i++) {
        createWordElement(shuffledModifiers[i], wordBank, true);
    }
}

function createWordElement(word, container, x=0, y=0) {
    const wordElement = document.createElement('div');
    wordElement.className = 'word';
    wordElement.textContent = word;
    wordElement.draggable = true;
    wordElement.addEventListener('dragstart', drag);
    applyRandomRotation(wordElement);
    if (container.id === 'workspace') {
        wordElement.classList.add('word-workspace');
        wordElement.style.left = (x-X_DISPLAY_OFFSET) + 'px';
        wordElement.style.top = (y-Y_DISPLAY_OFFSET) + 'px';
    }
    container.appendChild(wordElement);
}

function applyRandomRotation(element) {
    const rotation = Math.random() * 6 - 3;
    element.style.transform = `rotate(${rotation}deg)`;
}

function getMoreWords() {
    const words = sourceText.match(/\b(\w+)\b/g);
    const wordBank = document.getElementById('word-bank');
    wordBank.innerHTML = '';
    
    const newWords = new Set();
    while (newWords.size < WORD_COUNT && words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words.splice(randomIndex, 1)[0];
        const processedWord = processWord(word);
        if (!newWords.has(processedWord)) {
            createWordElement(processedWord, wordBank);
            newWords.add(processedWord);
        }
    }
    addModifiers(wordBank);
}

function startOver() {
    const footerLinks = document.getElementById('footer-links');
    document.getElementById('word-bank').innerHTML = '';
    document.getElementById('workspace').innerHTML = '';
    workspace.appendChild(footerLinks);
    usedWords.clear();
    generateWordBank();
}

function drag(event) {
    const rect = event.target.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;

    event.dataTransfer.setData('text/plain', event.target.textContent);
    event.dataTransfer.setData('application/json', JSON.stringify({
        sourceId: event.target.parentElement.id,
        elementId: event.target.id,
        rotation: event.target.style.transform,
        offsetX: offsetX,
        offsetY: offsetY
    }));
}

function removeWordFromBank(word) {
    const wordBank = document.getElementById('word-bank');
    const wordElements = wordBank.getElementsByClassName('word');
    for (let element of wordElements) {
        if (element.textContent === word) {
            wordBank.removeChild(element);
            break;
        }
    }
}

document.getElementById('workspace').addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.getElementById('workspace').addEventListener('drop', function(event) {
    event.preventDefault();
    const word = event.dataTransfer.getData('text/plain');
    const data = JSON.parse(event.dataTransfer.getData('application/json'));
    const workspaceRect = this.getBoundingClientRect();
    const x = event.clientX - workspaceRect.left - data.offsetX;
    const y = event.clientY - workspaceRect.top - data.offsetY;

    if (data.sourceId === 'word-bank') {
        addWordToWorkspace(word, x, y, data.rotation);
        removeWordFromBank(word);
    } else if (data.sourceId === 'workspace') {
        const draggedElement = document.getElementById(data.elementId);
        if (draggedElement) {
            draggedElement.style.left = (x-X_DISPLAY_OFFSET) + 'px';
            draggedElement.style.top = (y-Y_DISPLAY_OFFSET) + 'px';
        }
    }
});

let wordCounter = 0;
function addWordToWorkspace(word, x, y, rotation) {
    const workspaceElement = document.getElementById('workspace');
    const wordElement = document.createElement('div');
    wordElement.className = 'word word-workspace';
    wordElement.textContent = word;
    wordElement.draggable = true;
    wordElement.addEventListener('dragstart', drag);
    wordElement.style.left = (x-X_DISPLAY_OFFSET) + 'px';
    wordElement.style.top = (y-Y_DISPLAY_OFFSET) + 'px';
    wordElement.style.transform = rotation;
    wordElement.id = 'workspace-word-' + wordCounter++;
    workspaceElement.appendChild(wordElement);
}

document.addEventListener('DOMContentLoaded', function() {
    const scissors = document.getElementById('scissors');
    scissors.addEventListener('dragover', allowDrop);
    scissors.addEventListener('drop', deleteWord);
});

function allowDrop(event) {
    event.preventDefault();
}

function deleteWord(event) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData('application/json'));
    const word = event.dataTransfer.getData('text/plain');
    
    if (data.sourceId === 'word-bank') {
        removeWordFromBank(word);
    } else if (data.sourceId === 'workspace') {
        const elementToRemove = document.getElementById(data.elementId);
        if (elementToRemove) {
            elementToRemove.remove();
        }
    }
}

// removing this functionality for now, restriction enhances creativity! work with what the text gives you
// or if you *really* want, just add those extra words you want to the source text box
// function addCustomWord() {
//     const customWordInput = document.getElementById('custom-word');
//     const inputText = customWordInput.value.trim();
  
//     if (inputText) {
//         const words = inputText.split(/\s+/); 
//         const wordBank = document.getElementById('word-bank');
//         words.forEach(word => {
//             if (word) { 
//                 createWordElement(processWord(word), wordBank);
//             }
//         });
//         customWordInput.value = ''; 
//     }
// }

// init w random text
useRandomText();
