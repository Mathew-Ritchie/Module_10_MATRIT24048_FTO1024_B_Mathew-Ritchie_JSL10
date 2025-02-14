document.addEventListener("DOMContentLoaded", () => {
  // 🪲 Bug fixed: Incorrect ID changed to solveRoom1///////////////////////////////////////////////////////
  document.getElementById("solveRoom1").addEventListener("click", () => {
    fetch("books.json")
      .then((response) => response.json())
      .then((books) => {
        const mostRecentBook = findMostRecentBook(books);
        // 🪲 Bug fixed : Incorrect element ID should be room1Result///////////////////////////////////////////////////////////////////////////////
        document.getElementById(
          "room1Result"
        ).textContent = `The key to the next room is: ${mostRecentBook.title}`;
      });
  });
});

document.getElementById("solveRoom2").addEventListener("click", () => {
  const jsConcepts = new Set(["closure", "scope", "hoisting"]);
  jsConcepts.add("async");
  //console.log(jsConcepts);
  // 🪲 Bug fixed: async was missing////////////////////////////////////////////////////////////////////////////
  const reactConcepts = new Set(["components", "jsx", "hooks", "async"]);
  // 🪲 Bug fixed : Incorrect second parameter in findIntersection. it should be jeConcepts and reactConcepts//////////////////////////////////////////////////////////////////////////////
  const commonConcepts = findIntersection(jsConcepts, reactConcepts);
  document.getElementById(
    "room2Result"
  ).textContent = `The code to unlock the door is: ${Array.from(commonConcepts).join(", ")}`;
});

// 🪲 Bug fixed:added async, try and catch statements and await///////////////////////////////////////////////////////////////////////////////////////////
document.getElementById("solveRoom3").addEventListener("click", async () => {
  try {
    const room3 = await fetch("directions.json");
    if (!room3.ok) {
      throw Error("something went wrong");
    }
    const dataRoom3 = await room3.json();
    const message = await navigateLabyrinth(dataRoom3);
    document.getElementById("room3Result").innerHTML = message;
  } catch (error) {
    console.error("something went wrong");
  }
});

function findMostRecentBook(books) {
  // 🪲 Bug fixed : should be > rather than < Logic error////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return books.reduce((mostRecent, book) =>
    new Date(book.published) > new Date(mostRecent.published) ? book : mostRecent
  );
}

function findIntersection(setA, setB) {
  // 🪲 Bug fixed: create a new intersection set. use for of loop to iterate through setA's concepts and see if any of them maches (has) the concepts in setB.
  //Any matching concept is added to new intersection set.///////////////////////////////////////////////////////////////////////////////////
  const intersection = new Set();
  for (const concept of setA) {
    if (setB.has(concept)) {
      intersection.add(concept);
    }
  }
  return intersection;
}

async function navigateLabyrinth(directions) {
  for (let direction of directions) {
    // 🪲 Bug fixed: add awaut before new Promise./////////////////////////////////////////////////////////////////////////////////////
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Navigating: ${direction.step}`);
  }
  return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
