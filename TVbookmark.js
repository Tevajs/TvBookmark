// Функция для добавления партии в закладки
function addBookmark(gameId) {
  // Отправляем запрос на добавление партии в закладки
  fetch(`/bookmark/${gameId}`, {
    method: 'POST',
  })
  .then(response => {
    if (response.ok) {
      console.log('Партия успешно добавлена в закладки!');
    } else {
      console.error('Ошибка при добавлении партии в закладки');
    }
  })
  .catch(error => {
    console.error('Произошла ошибка:', error);
  });
}

// Обработчик события для кнопки добавления в закладки
function handleBookmarkButtonClick() {
  // Получаем id партии
  
  let html = document.documentElement.innerHTML;
  console.log("sssssssssssssssssssssssssssssssssssssssssssssssssssss");
  console.log(html);
  let ind = html.indexOf(`lichess.loadEsm('round',{init:{"data":{"game":{"id":`) + 1 + `lichess.loadEsm('round',{init:{"data":{"game":{"id":`.length;
  let endInd = html.indexOf('"', ind);
  
  const gameId = html.substring(ind, endInd);/* получение id партии из HTML кода страницы Lichess TV */;
  console.log(gameId);
  // Проверяем, что партия не находится на Lichess TV
  if (!isOnLichessTV()) {
    // Добавляем партию в закладки
    addBookmark(gameId);
  } else {
    console.warn('Невозможно добавить партию с Lichess TV в закладки');
  }
}
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}
// Функция для проверки, находится ли партия на Lichess TV
function isOnLichessTV() { 
  // Проверяем наличие элемента с классом "tvheader"
  const tvHeader = document.querySelector('.tvheader');
  
  return Boolean(tvHeader);
}

// Добавляем обработчик события для кнопки добавления в закладки
//handleBookmarkButtonClick()
document.getElementsByClassName('setup')[0].insertBefore(createElementFromHTML('<a class="bookmark" href="/bookmark/uLfjj6lu" title="Отметить эту игру"><i data-icon="" class="on is3"></i><i data-icon="" class="off is3"></i><span></span></a>'), document.getElementsByClassName('setup')[0].firstChild);
//const bookmarkButton = document.querySelector('.bookmark-button');
document.getElementsByClassName('bookmark')[0].addEventListener('click', handleBookmarkButtonClick);