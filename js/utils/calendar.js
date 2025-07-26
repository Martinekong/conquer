let currentDate = new Date();
let startDate = null;
let endDate = null;
let calendarRefs = {};

export function initCalendar({ calendarGrid, monthYear, onDateSelect }) {
  calendarRefs = { calendarGrid, monthYear, onDateSelect };

  renderCalendar();
}

export function goToPrevMonth() {
  const now = new Date();
  const prevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  if (prevMonth >= new Date(now.getFullYear(), now.getMonth(), 1)) {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  }
}

export function goToNextMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
}

export function getSelectedDates() {
  return { startDate, endDate };
}

function renderCalendar() {
  const { calendarGrid, monthYear, onDateSelect } = calendarRefs;

  calendarGrid.innerHTML = '';
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = startDay === 0 ? 6 : startDay - 1;

  monthYear.textContent = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  for (let i = 0; i < prevMonthDays; i++) {
    const filler = document.createElement('div');
    filler.classList.add('calendar-day', 'inactive');
    calendarGrid.appendChild(filler);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.classList.add('calendar-day');
    day.textContent = i;

    const fullDate = new Date(year, month, i);
    fullDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fullDate < today) {
      day.classList.add('past-date');
    } else {
      day.addEventListener('click', () => handleDateClick(fullDate));
    }

    if (isSameDate(fullDate, startDate) || isSameDate(fullDate, endDate)) {
      day.classList.add('selected');
    } else if (
      startDate &&
      endDate &&
      fullDate > startDate &&
      fullDate < endDate
    ) {
      day.classList.add('range');
    }

    calendarGrid.appendChild(day);
  }
}

function handleDateClick(date) {
  if (!startDate || endDate) {
    startDate = date;
    endDate = null;
  } else if (date < startDate) {
    startDate = date;
  } else {
    endDate = date;
  }

  renderCalendar();
  calendarRefs.onDateSelect(startDate, endDate);
}

function isSameDate(d1, d2) {
  return (
    d1?.getDate() === d2?.getDate() &&
    d1?.getMonth() === d2?.getMonth() &&
    d1?.getFullYear() === d2?.getFullYear()
  );
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(2);
  return `${day}/${month}/${year}`;
}
