const wordForm = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

const updateTimer = () => {
  const timer = document.querySelector(".timer");
  const deadline = new Date(timer.dataset.deadline);

  const currentTime = new Date();
  const remainingTime = deadline - currentTime;

  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));

  const daysElement = document.querySelector("#days");
  const hoursElement = document.querySelector("#hours");
  const minutesElement = document.querySelector("#minutes");

  daysElement.innerHTML = `${days} ${wordForm(days, ["день", "дня", "дней"])}`;
  hoursElement.innerHTML = `${hours} ${wordForm(hours, [
    "час",
    "часа",
    "часов",
  ])}`;
  minutesElement.innerHTML = `${minutes} ${wordForm(minutes, [
    "минута",
    "минуты",
    "минут",
  ])}`;

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    daysElement.innerHTML = "0 дней";
    hoursElement.innerHTML = "0 часов";
    minutesElement.innerHTML = "0 минут";
    timer.style.display = "none";
  } else if (remainingTime <= 24 * 60 * 60 * 1000) {
    daysElement.classList.add("red-text");
    hoursElement.classList.add("red-text");
    minutesElement.classList.add("red-text");
  }
};

const timerInterval = setInterval(updateTimer, 1000 * 60);
updateTimer();
