(function () {
  var el = document.getElementById('hero-typewriter');
  if (!el) return;

  var words = [
    'Geomatics Student.',
    'GIS Developer.',
    'Spatial Analyst.',
    'Remote Sensing Enthusiast.'
  ];

  var wordIndex  = 0;
  var charIndex  = 0;
  var deleting   = false;
  var pauseAfterWord  = 1800;
  var pauseAfterDelete = 380;
  var typeSpeed   = 75;
  var deleteSpeed = 42;

  function type() {
    var word = words[wordIndex];

    if (deleting) {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting   = false;
        wordIndex  = (wordIndex + 1) % words.length;
        setTimeout(type, pauseAfterDelete);
        return;
      }
      setTimeout(type, deleteSpeed);
    } else {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(type, pauseAfterWord);
        return;
      }
      setTimeout(type, typeSpeed);
    }
  }

  // Small initial delay so page loads before typing starts
  setTimeout(type, 900);
})();
