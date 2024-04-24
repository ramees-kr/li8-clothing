function redirectToPage(event) {
  // Get the click position relative to the window
  const clickX = event.clientX;

  // Get the width of the window
  const windowWidth = window.innerWidth;

  // Determine if the click was on the left or right side
  const isLeftSide = clickX <= windowWidth / 2;

  // Redirect based on the side clicked
  if (isLeftSide) {
    // Left side clicked, redirect to girls.html
    window.location.href = "../pages/girls.html";
  } else {
    // Right side clicked, redirect to boys.html
    window.location.href = "../pages/boys.html";
  }
}
