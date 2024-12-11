//array containing all the question content

const questions = {
  1: {
    questionText: "Is this label greenwashing? Q1",
    indepthQuestionText:
      "On their k-cups, Keurig includes the label of recyclable. Is the inclusion of this term an example of greenwashing?",
    imageFile: "qOneKeurig.jpg",
    correctAnswer: "yes",
    altText: "keurig cup label",
  },
  3: {
    questionText: "Is this label greenwashing? Q2",
    indepthQuestionText:
      "The B Corp label is often display on products as a demonstration of their sustainable efforts, however is this label misleading about its climate consciousness?",
    imageFile: "qTwoBCorp.png",
    correctAnswer: "no",
    altText: "B Corporation Label with example B Corp Companies",
  },
  5: {
    questionText: "Is this a form of greenwashing? Q3",
    indepthQuestionText:
      "In 2012, Polar Springs released a eco-shape bottle (left) with features  such as a smaller cap that was promoted as reducing plastic waste. Is this a form of greenwashing? ",
    imageFile: "qThreesmallerLid.jpg",
    correctAnswer: "no",
    altText:
      "a side by side comparison of two water bottles: one was a big lid and one with a small lid",
  },
  7: {
    questionText: "Is the Polar Springs eco-bottle greenwashing? Q4",
    indepthQuestionText:
      "Huggies released a pure and natural line of diapers for eco-conscious parents. Was this greenwashing?",
    imageFile: "qFourHuggies.png",
    correctAnswer: "yes",
    altText: "package of huggies diapers labeled pure and natural ",
  },
};

const responses = {
  2: {
    explainerText:
      "This was a form of greenwashing. Keurig purposely mislead their customers into thinking their k-cups could easily be recyled when the opposite is true. Very few recycling plants have the capacity to recycle keurig cups",
    addtResourcesLink:
      "https://www.npr.org/2024/09/12/nx-s1-5109902/keurig-kcup-pods-recycle-sec-fine",
    imageFile: "qOneKeurig.jpg",
  },
  4: {
    explainerText:
      "This is not a form of greenwashing. Receiving a B Corp label requires an intensive presentation of sustainability measuresl. Though recent controversy has led to a questioning of the validity of this certification, as questionable companies such as Nepresso are now labelled as B Corps.",
    addtResourcesLink:
      "https://sustainabilitymag.com/esg/b-corp-are-they-really-the-gold-standard-of-sustainability",
    imageFile: "qOneKeurig.jpg",
  },
  6: {
    explainerText:
      "This is not a form of greenwashing. Reducing the lid size does decreasing reduces the carbon footprint of the water bottles production by 18%, however with the tradeoff of reducing its accessibility. Climate-conscious solutions need to balance reducing impact while still maintaining ease of use.",
    addtResourcesLink:
      "https://www.usatoday.com/story/news/nation/2024/12/04/shrinking-plastic-caps-bottles-harder-to-open/75719362007/",
    imageFile: "qOneKeurig.jpg",
  },
  8: {
    explainerText:
      "This was a form of greenwashing. Pure and natural are not regulated labels. Companies can use this descriptors even if their product does not fit into these categories. Despite claiming to be pure and naturel, this Huggies provided eventually had to be recalled due to its toxic nature.  ",
    addtResourcesLink:
      "https://www.courthousenews.com/pure-huggies-diapers-are-toxic-class-claims/",
  },
};

let pageTracker = 1;
let questionTracker = 1;
let score = 0;

////////TEXT CONTENT CREATION///////

function renderQuestion() {
  //accessing content from the dom
  const questionImg = document.querySelector(".questionImage");
  const indepthQuestionText = document.getElementById("indepthQuestionText");
  const questionNum = document.getElementById("questionNum");

  //adding relevant content to relevant variables
  questionNum.innerText = "Q" + questionTracker;
  questionImg.src =
    "assets/questionPage/" + questions[pageTracker]["imageFile"];
  questionImg.alt = "assets/questionPage/" + questions[pageTracker]["altText"];
  indepthQuestionText.innerText = questions[pageTracker]["indepthQuestionText"];
}

//------ for the explainer page ------//
function renderExplanation(accuracy) {
  //accessing content from the dom
  const questionImg = document.querySelector(".questionImage");
  const responseAccuracy = document.getElementById("accuracy");
  const explainerText = document.getElementById("explainerText");
  const addtResources = document.getElementById("addtResources");
  const addtResourcesLink = document.getElementById("addtResourcesLink");

  //adding relevant content to relevant variables
  questionImg.src =
    "assets/questionPage/" + responses[pageTracker]["imageFile"];
  responseAccuracy.innerText = "You are " + accuracy;
  explainerText.innerText = responses[pageTracker]["explainerText"];
  addtResources.innerText = "Click here to read more!";
  addtResourcesLink.href = responses[pageTracker]["addtResourcesLink"];
}

function renderResults(score) {
  const quizResults = document.getElementById("quizResults");

  quizResults.innerText = "You answered  " + score + " out of 4 correctly";
}

///////USER INTERACTION WITH THE SCREEN///////

//declaring relevant variables for functions
let yesButton = document.getElementById("yesButton");
let noButton = document.getElementById("noButton");

let nextButton = document.getElementById("nextQuestion");
let answer = "";
let accuracy = "";

//checking this answer by checking stored answer in the object
//recording the accuracy of the response
function checkAnswer() {
  if (answer === questions[pageTracker]["correctAnswer"]) {
    console.log("you are correct"); //just using these as a metric to motor correctness
    score++;
    accuracy = "correct";
    return accuracy;
  } else {
    console.log("you are incorrect");
    accuracy = "incorrect";
    return accuracy;
  }
}

//registering what answer (yes or no) a user selected and checking to see if this answer was correct
function buttonSelection() {
  document.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      if (event.target.value === "yes" || event.target.value === "no") {
        answer = event.target.value; //returning the value assigned to html button
        console.log(answer);
        accuracy = checkAnswer();
        console.log(accuracy);
        changeDisplay(accuracy);
        animateFlower(accuracy);
      } else {
        //changing content back to the question format and repopulating this div
        changeDisplay(accuracy);
      }
    }
  });
}

//flips through the display to make sure that they right section is showing
function changeDisplay(accuracy) {
  // Increment tracker
  pageTracker++;
  const questionContainer = document.getElementById("questionContent");
  const responseContainer = document.getElementById("responseContent");
  const resultsPage = document.getElementById("resultsPage");

  //making sure that the quiz is not over and then using the page tracker to determine which content to display
  if (pageTracker < Object.entries(questions).length * 2) {
    if (pageTracker % 2 === 0) {
      questionTracker++;
      responseContainer.style.display = "flex";
      questionContainer.style.display = "none";
      console.log(questionContainer.style.display);
      nextButton.innerText = "Q" + questionTracker;
      renderExplanation(accuracy);
    } else {
      responseContainer.style.display = "none";
      questionContainer.style.display = "flex";
      renderQuestion();
    }
  } else {
    responseContainer.style.display = "none";
    questionContainer.style.display = "none";
    resultsPage.style.display = "flex";
    renderResults(score);
  }
}

//FLOWER ANIMATION//
let currentScale = 1; // Start at normal size
let scaleChange = 0.15;

// taking accuracy as a parameter to determine whether or not the flower should grow or shrink
function animateFlower(accuracy) {
  // depending on the accuracy of the answer, determine the scale to change the flower

  if (accuracy === "correct") {
    currentScale = currentScale + scaleChange;
    console.log(accuracy);
  } else {
    currentScale = currentScale - scaleChange;
  }
  // Animate the flower with GSAP
  gsap.to("#flowerImage", {
    scale: currentScale,
    duration: 0.8,
  });
}

/*


// Initialize the quiz

*/

//inital render of the question
renderQuestion();
buttonSelection();
