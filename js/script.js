const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.getAttribute('href').replace('#','');
         const curentPopup = document.getElementById(popupName);
         popupOpen(curentPopup);
         e.preventDefault();
      } );
   }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}
function popupOpen(corentPopup) {
   if (corentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      corentPopup.classList.add('open');
      corentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__container')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
         bodyUnLock(); // ставится для бокировки скролла при открытии второго попапа из первого попапа
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.budgets').offsetWidth + 'px';

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.style.paddingRight = lockPaddingValue;  // высчитывается какой padding нужен при открытии потапа, чтобы не сдвигался контент
      }
   }
   body.style.paddingRight = lockPaddingValue;  //добавляем к боди правый паддинг при удалении скролла, чтобы не дергался контент
   body.classList.add('lock');// добавляем к боди класс lock (класс по которому убирается скролл)

   unlock = false; // лочится кнопка открытия потапа, чтобы не было ошибки с фиксом двойного скролла
   setTimeout(function () {
      unlock = true;
   }, timeout);
}

function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px'; // убираем у боди правый паддинг для восстановления скролла
      body.classList.remove('lock'); // убираем у боди класс lock
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);  //добавляется таймаут для восстановления скролла при закрытии потапа, чтобы недергался потап при закрытии
}

document.addEventListener('keydown', function (e) {  // закрытие попапа кнопкой ESC
   if (e.code==='Escape'  ) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
   }
});

(function () {
   // проверяем поддержку
   if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      };
   }
})();
(function () {
   // проверяем поддержку
   if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();

//<Swiper>=================================================================================
//<Инициализируем Swiper>==================================================================
new Swiper('.swiper__container', {
   speed: 400,
   spaceBetween: 100,
   //Стрелка
   navigation:{
      nextEL: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
   },
   //Навигация
   //Буллеты, текущее положение, прогрессбар
   pagination: {
      el: '.swiper-pagination',
      //Буллеты
      clickable: true,
      //Динамические буллеты
      dynamicBullets: false,
   },
   scrollbar: {
      el: '.swiper-scrollbar',
    },
});
//</Инициализируем Swiper>==================================================================

