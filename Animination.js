document.addEventListener("DOMContentLoaded", function () {
  const choices = ["rock", "paper", "scissors"];
  const emojiMap = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
  };



  const userButtons = {
    rock: document.getElementById("rock"),
    paper: document.getElementById("paper"),
    scissors: document.getElementById("scissors")
  };

  const animationDiv = document.getElementById("animation");
  const resultDiv = document.getElementById("result");
  const fireworksContainer = document.getElementById("fireworks-container");

  let animationInterval;



  // Event listeners for the user buttons
  userButtons.rock.addEventListener("click", function () {
    playGame("rock");
  });

  userButtons.paper.addEventListener("click", function () {
    playGame("paper");
  });

  userButtons.scissors.addEventListener("click", function () {
    playGame("scissors");
  });



  // Main game logic
  function playGame(userChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    startAnimation();

    // After 1.5 seconds, show computer's choice and display result
    setTimeout(() => {
      stopAnimation(computerChoice);
      displayResult(userChoice, computerChoice);
    }, 1500);
  }



  // Start emoji animation for computer choice
  function startAnimation() {
    let currentIndex = 0;
    animationInterval = setInterval(() => {
      animationDiv.textContent = emojiMap[choices[currentIndex]];
      currentIndex = (currentIndex + 1) % choices.length;
    }, 100);
  }



  // Stop emoji animation and show the computer's choice
  function stopAnimation(computerChoice) {
    clearInterval(animationInterval);
    animationDiv.textContent = emojiMap[computerChoice];
  }



  // Display the result of the game
  function displayResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
      resultDiv.textContent = "It's a draw!";
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      resultDiv.textContent = `You win! ${emojiMap[userChoice]} beats ${emojiMap[computerChoice]}.`;
      triggerFireworks();
    } else {
      resultDiv.textContent = `You lose! ${emojiMap[computerChoice]} beats ${emojiMap[userChoice]}.`;
      triggerLossEffect();
    }
  }



  // Trigger fireworks animation on win
  function triggerFireworks() {
    fireworksContainer.innerHTML = ""; // Clear previous fireworks

    for (let i = 0; i < 10; i++) {
      const firework = document.createElement("div");
      firework.className = "firework";
      firework.style.left = `${Math.random() * 100}%`;
      firework.style.top = `${Math.random() * 100}%`;
      firework.style.animationDelay = `${Math.random() * 0.5}s`;

      fireworksContainer.appendChild(firework);

      // Remove the firework after animation ends
      setTimeout(() => {
        firework.remove();
      }, 1000);
    }
  }


  
  // Change background color briefly on loss
  function triggerLossEffect() {
    animationDiv.style.backgroundColor = "red";

    setTimeout(() => {
      animationDiv.style.backgroundColor = "";
    }, 1000);
  }
});
