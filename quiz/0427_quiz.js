// Question Set
const questions = [
  {
    question_260427: "$\\displaystyle a_n = n \\ln\\left(1 + \\frac{3}{n}\\right)$",
    options: {
      A: "$e^3$",
      B: "$3$",
      C: "$0$",
      D: "$\\infty$"
    },
    answer: "B"
  },
  {
    question_260427: "$\\displaystyle a_n = \\left(1 + \\frac{5}{n^2}\\right)^{2n^2}$",
    options: {
      A: "$e^7$",
      B: "$e^5$",
      C: "$e^{10}$",
      D: "$e^{25}$"
    },
    answer: "C"
  },
  {
    question_260427: "$\\displaystyle a_n = \\ln(\\sqrt[n]{n}) + \\frac{4^{n+1}}{2^{2n}}$ ",
    options: {
      A: "$0$",
      B: "$1$",
      C: "$4$",
      D: "$\\infty$"
    },
    answer: "C"
  },
  {
    question_260427: "$\\displaystyle a_n = \\sqrt[n]{7^n \\cdot n^3}$.",
    options: {
      A: "$7$",
      B: "$21$",
      C: "$1$",
      D: "$\\infty$"
    },
    answer: "A"
  },
  {
    question_260427: "$\\displaystyle a_n = \\left(\\frac{2n+1}{2n}\\right)^{4n}$",
    options: {
      A: "$e^2$",
      B: "$e^4$",
      C: "$e$",
      D: "$1$"
    },
    answer: "A"
  },
  {
    question_260427: "$\\displaystyle a_n = \\frac{n! + \\pi^n}{2n! - e^n}$.",
    options: {
      A: "$1/2$",
      B: "$0$",
      C: "$\\infty$",
      D: "$1$"
    },
    answer: "A"
  }
];


// Set up quiz and score
const container = document.getElementById("quiz-container");
const scoreBox = document.getElementById("score-summary");

// Count the answers
let answeredCount = 0;
let correctCount = 0;

// Introduction text (hide it if not needed)
//const intro = document.createElement("div");
//intro.style.marginTop = "20px";
//intro.innerHTML = `<p><b>Note.</b> Select the correct choices.</p>`;
//container.appendChild(intro);

// Loop to generate questions
questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.style.marginBottom = "40px";
  
  // Question Statement (The problem statement in Question list)
  let questionStatement = `<p><b>Q${i + 1}.</b> ${q.question_260427}</p>`;
  
  // Choices (A, B, C, D, E, F, G)
  ['A', 'B', 'C', 'D'].forEach(choice => {
    // A setting to check whether A, B, C, D exists (so some questions can have only 2/3 choices)
    if(q.options[choice]) {
      // Add choices using customized boxes
      questionStatement += `
        <div class="choice-container" id="q${i}-${choice}" onclick="checkAnswer(${i}, '${choice}')">
          <span class="choice-box">${choice}</span>
          <span class="choice-text">${q.options[choice]}</span>
        </div>
      `;
    }
  });

  // Add feedback (kaomoji)
  //questionStatement += `<div id="feedback-${i}" style="margin-top: 10px; font-weight: normal; min-height: 25px; margin-left: 5px;"></div>`;
  
  div.innerHTML = questionStatement;
  container.appendChild(div);

  // Restore answers when reload the page
  const savedAnswer = localStorage.getItem(`question_260427-${i}`);
  if (savedAnswer !== null) {
    checkAnswer(i, savedAnswer, true); 
  }
});

// Set up for the function `checkAnswer`
/**
 * Handles checking the answer.
 * @param {number} index - Question index
 * @param {string} selectedChoice - 'A', 'B', 'C', or 'D'
 * @param {boolean} isRestoring - If true, we skip saving and just paint the UI
 */

function checkAnswer(index, selectedChoice, isRestoring = false) {
  const correctChoice = questions[index].answer;
  //const feedback = document.getElementById(`feedback-${index}`);
  
  // Stop clicking the answered button (unless we are restoring)
  const button = document.getElementById(`q${index}-A`) || document.getElementById(`q${index}-B`);
  if (!button) return; 
  if (!isRestoring && button.classList.contains('disabled')) return;

  // Save the answer (for restoring purpose)
  if (!isRestoring) {
    localStorage.setItem(`question_260427-${index}`, selectedChoice);
  }

  const isCorrect = selectedChoice === correctChoice;

  // Disable clicking
  ['A', 'B', 'C', 'D'].forEach(choice => {
    const btn = document.getElementById(`q${index}-${choice}`);
    if (btn) {
      btn.classList.add('disabled');
      btn.onclick = null; 
    }
  });

  // Highlight the answer and feedback
  const selectedBtn = document.getElementById(`q${index}-${selectedChoice}`);
  if (selectedBtn) {
    if (isCorrect) {
      selectedBtn.classList.add("correct-choice");
      //feedback.innerHTML = `<span>(¦3[▓▓] Correct!</span>`;
      correctCount++;
    } else {
      selectedBtn.classList.add("wrong-choice");
      // Show correct answer border (hide it if you do not want to display the correct answer)
      const correctBtn = document.getElementById(`q${index}-${correctChoice}`);
      if(correctBtn) correctBtn.style.border = "3px solid #388e3c"; 
      
      //feedback.innerHTML = `<span>＼(・｀(エ)・)/ Wrong!</span>`; //  Answer was ${correctChoice}
    }
  }

  // Count for each click
  answeredCount++;

  // Final score
  if (answeredCount === questions.length) {
    let resultComment;
    const percentage = correctCount / questions.length;
    
    if (percentage === 1.0) resultComment = 'Congratulation!';
    else if (percentage >= 0.9) resultComment = 'So close!';
    else if (percentage >= 0.7) resultComment = 'Good Job.';
    else if (percentage >= 0.5) resultComment = 'Masih memuaskan.';
    else resultComment = 'Hello what happen? Habis lah!';

    scoreBox.innerHTML = `<div style="font-size: 1.3em; font-weight: bold; margin-top: 50px; margin-bottom: 50px; padding: 20px; border: 2px solid #333; text-align:center;">
    You got ${correctCount} out of ${questions.length} correct.<br>
    ${resultComment}
    </div>`;
  }
}