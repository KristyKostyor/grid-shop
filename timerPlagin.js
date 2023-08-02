(function () {
  // Функция для склонения слов
  const wordForm = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  // Получаем все элементы с data-timer-deadline
  const elements = document.querySelectorAll("[data-timer-deadline]");

  // Перебираем все найденные элементы
  elements.forEach((el) => {
    // Создаем и вставляем в элемент таймер
    const timer = document.createElement("div");
    const daysText = document.createElement("p");
    const hoursText = document.createElement("p");
    const minutesText = document.createElement("p");

    timer.appendChild(daysText);
    timer.appendChild(hoursText);
    timer.appendChild(minutesText);

    el.appendChild(timer);

    const deadline = new Date(el.getAttribute("data-timer-deadline"));

    // Запускаем интервал для обновления таймера
    const intervalId = setInterval(() => {
      const diff = deadline - new Date();

      if (diff <= 0) {
        clearInterval(intervalId);
        daysText.textContent = "0 дней";
        hoursText.textContent = "0 часов";
        minutesText.textContent = "0 минут";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      daysText.textContent = `${days} ${wordForm(days, [
        "день",
        "дня",
        "дней",
      ])}`;
      hoursText.textContent = `${hours} ${wordForm(hours, [
        "час",
        "часа",
        "часов",
      ])}`;
      minutesText.textContent = `${minutes} ${wordForm(minutes, [
        "минута",
        "минуты",
        "минут",
      ])}`;
    }, 1000);
  });
})();
