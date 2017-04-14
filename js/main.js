function openMobileMenu() {
  // Need this in < IE10 replace classList with className and mutate the class string
  document.getElementById('mobile-nav').classList.toggle('slide-down');
}

function closeMobileMenu() {
  var mobile = document.getElementById('mobile-nav');
  if (mobile.classList.contains('slide-down')) {
    mobile.classList.toggle('slide-down');
  }
}

function turnLightOn() {
  document.getElementById('Over_het_JCC').style.backgroundColor = "#87A62A";
  /*if ( this.windowWidth > 1023 ) {
   document.getElementById('ontwikkeling').style.backgroundColor = "#87A62A";
   document.getElementById('ambitie').style.backgroundColor = "#87A62A";
   }*/
}


function turnLightOff() {
  document.getElementById('Over_het_JCC').style.backgroundColor = "#809F28";
  /*if ( this.windowWidth > 1023 ) {
   document.getElementById('ontwikkeling').style.backgroundColor = "#809F28";
   document.getElementById('ambitie').style.backgroundColor = "#809F28";
   }*/
}

function setWhenToTurnLampOn(offset) {
  if (window.pageYOffset > document.getElementById('mainImg').clientHeight + offset) {
    document.getElementById("lampOn").click();
  } else {
    document.getElementById("lampOff").click();
  }
}
var mainImg = document.getElementById('mainImg');
var goTop = document.getElementById("goTop");
var windowWidth;
var efficientScrolling = debounce(function () {

  // Need this in < IE10 replace MatchMedia
  if ( mainImg ) {
    if (window.pageYOffset > mainImg.clientHeight) {
      goTop.style.display = 'block';
    } else {
      goTop.style.display = 'none';
    }

    this.windowWidth = window.innerWidth;
    if (window.matchMedia("(orientation: portrait)").matches) {
      if (windowWidth > 599) {
        setWhenToTurnLampOn(350);
      } else if (windowWidth > 400) {
        setWhenToTurnLampOn(706);
      } else if (windowWidth > 350) {
        setWhenToTurnLampOn(745);
      } else {
        setWhenToTurnLampOn(800);
      }
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
      if (windowWidth > 799) {
        setWhenToTurnLampOn(-75);
      } else if (windowWidth > 599) {
        setWhenToTurnLampOn(615);
      } else if (windowWidth > 400) {
        setWhenToTurnLampOn(700);
      }
    }
  } else {
    goTop.style.display = 'block';
  }
}, 20);

window.onscroll = function () {
  efficientScrolling();
};

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

var myEfficientFn = debounce(function () {
  document.getElementById('mainImg').style.height = (window.innerHeight - document.getElementsByTagName("header")[0].offsetHeight) + 'px';
}, 50);

window.onload = function () {
  var isIE = /*@cc_on!@*/false || !!document.documentMode;
  if (isIE) {
    var lamp = document.getElementById('lampadario')
    if (lamp) {
      lamp.style.position = 'absolute';
    }
  }

  var hamburger = document.getElementById('hamburgerContainer');
  hamburger.addEventListener('click', function () {
    openMobileMenu();
  });

  var switchOn = document.getElementById('lampOn');
  if (switchOn) {
    switchOn.addEventListener('click', function () {
      turnLightOn();
    });
  }

  var switchOff = document.getElementById('lampOff');
  if (switchOff) {
    switchOff.addEventListener('click', function () {
      turnLightOff();
    });
  }

  document.getElementById('mobile-nav').addEventListener('click', function () {
    closeMobileMenu();
  });

  if ( document.getElementById('mainImg') ) {
    myEfficientFn();
    window.addEventListener('resize', myEfficientFn);
  }

  addClickEventToImgIndicators();
};

function showImg(id) {
  var lightbox = document.getElementById('lightBox');
  var img = document.getElementById(id).getElementsByTagName('img')[0];
  var alt = img.alt;
  lightbox.getElementsByTagName('img')[0].src = img.src;
  lightbox.getElementsByTagName('img')[0].alt = alt;
  lightbox.getElementsByClassName('details')[0].textContent = alt;
  lightbox.style.display = 'block';

  document.getElementById('filter').style.display = 'block';
}

document.body.onclick = function (e) {
  if (e.target.id == 'filter') {
    document.getElementById('filter').style.display = 'none';
    document.getElementById('lightBox').style.display = 'none';
  }
};

var activeImg = 'img1Indicator';
function nextImg() {
  // Need this in < IE10 replace classList with className and mutate the class string
  var carousel = document.getElementById('carousel');
  if (carousel.style.left == 0 + '%') {
    carousel.style.left = -100 + '%';
    document.getElementById('img1Indicator').classList.remove('activeImg');
    document.getElementById('img2Indicator').classList.add('activeImg');
    activeImg = 'img2Indicator';
  }
  else if (carousel.style.left == -100 + '%') {
    carousel.style.left = -200 + '%';
    document.getElementById('img2Indicator').classList.remove('activeImg');
    document.getElementById('img3Indicator').classList.add('activeImg');
    activeImg = 'img3Indicator';
  }
  /*else if (carousel.style.left == -200 + '%') {
   carousel.style.left = 0 + '%';
   }*/
}

function previousImg() {
  if (carousel.style.left == -100 + '%') {
    carousel.style.left = 0 + '%';
    document.getElementById('img2Indicator').classList.remove('activeImg');
    document.getElementById('img1Indicator').classList.add('activeImg');
    activeImg = 'img1Indicator';
  }
  else if (carousel.style.left == -200 + '%') {
    carousel.style.left = -100 + '%';
    document.getElementById('img3Indicator').classList.remove('activeImg');
    document.getElementById('img2Indicator').classList.add('activeImg');
    activeImg = 'img2Indicator';
  }
  /*else if (carousel.style.left == 0 + '%') {
   carousel.style.left = -200 + '%';
   }*/
}

function addClickEventToImgIndicators() {
  if ( document.getElementById('imgIndicator') ) {
    document.getElementById('img1Indicator').addEventListener('click', function () {
      goToSelectedImg('img1Indicator');
    });
    document.getElementById('img2Indicator').addEventListener('click', function () {
      goToSelectedImg('img2Indicator');
    });
    document.getElementById('img3Indicator').addEventListener('click', function () {
      goToSelectedImg('img3Indicator');
    });
  }
}

function goToSelectedImg(id) {
  var carousel = document.getElementById('carousel');
  // Need this in < IE10 replace classList with className and mutate the class string
  switch (id) {
    case 'img1Indicator':
      carousel.style.left = 0 + '%';
      removeActiveClass();
      document.getElementById('img1Indicator').classList.add('activeImg');
      activeImg = 'img1Indicator';
      break;
    case 'img2Indicator':
      carousel.style.left = -100 + '%';
      removeActiveClass();
      document.getElementById('img2Indicator').classList.add('activeImg');
      activeImg = 'img2Indicator';
      break;
    case 'img3Indicator':
      carousel.style.left = -200 + '%';
      removeActiveClass();
      document.getElementById('img3Indicator').classList.add('activeImg');
      activeImg = 'img3Indicator';
      break;
  }

  function removeActiveClass() {
    document.getElementById(activeImg).classList.remove('activeImg');
  }
}
