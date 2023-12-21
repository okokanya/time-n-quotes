export default class TimeQuote  {
  constructor (params) {
    this.blockItem = params.blockItem;
    this.blockAuthor = params.blockAuthor;
    this.blockSource = params.blockSource;
  }

  getQuote() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const request = `/api?time=${hour}${min < 10 ? `0${min}` : min}`;
    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          this.blockItem.innerHTML = data.data.quote;
          this.blockAuthor.innerHTML = data.data.author;
          this.blockSource.innerHTML = data.data.source;
        } else {
          this.blockItem.innerHTML = this.setWordTime(hour, min);
          this.blockAuthor.innerHTML = '';
          this.blockSource.innerHTML = '';
        }
      })
      .catch((err) => {
        console.error('data request fails: ', err);
      })
  }

  setWordTime(hour, min) {
    const dayTime = ['ночи', 'утра', 'дня', 'вечера']
    const hours = ['час', 'часа', 'часов']
    const minutes = ['минута', 'минуты', 'минут']
    const decadeMinutes = ['двадцать', 'тридцать', 'сорок', 'пятьдесят']
    const unitDigits = [
      'одна',
      'две',
      'три',
      'четыре',
      'пять',
      'шесть',
      'семь',
      'восемь',
      'девять',
      'десять',
      'одиннадцать',
      'двенадцать',
      'тринадцать',
      'четырнадцать',
      'пятнадцать',
      'шестнадцать',
      'семнадцать',
      'восемнадцать',
      'девятнадцать'
    ]
    let timeHour = hour > 12 ? hour - 12 : hour;
    let timeMinutes = min;
    switch (timeHour) {
      case 1:
        timeHour = hours[0].replace(hours[0][0], hours[0][0].toUpperCase())
        break
      case 2:
        timeHour = 'Два'
        break
      default:
        timeHour = unitDigits[timeHour - 1].replace(
          unitDigits[timeHour - 1][0],
          unitDigits[timeHour - 1][0].toUpperCase()
        )
    }

    if (timeMinutes < 20) {
      timeMinutes = ` и ${unitDigits[timeMinutes - 1]}`
      if (timeMinutes == 1) {
        timeMinutes += ` ${minutes[0]}`
      } else if (timeMinutes > 1 && timeMinutes < 5) {
        timeMinutes += ` ${minutes[1]}`
      } else {
        timeMinutes += ` ${minutes[2]}`
      }
    } else if (timeMinutes > 19 && timeMinutes % 10 === 0) {
      timeMinutes = timeMinutes / 10
      timeMinutes = ` и ${decadeMinutes[timeMinutes - 2]} ${minutes[2]}`
    } else {
      timeMinutes = String(timeMinutes).split('')
      let minute
      if (timeMinutes[1] == 1) {
        minute = ` ${minutes[0]}`
      } else if (timeMinutes[1] > 1 && timeMinutes[1] < 5) {
        minute = ` ${minutes[1]}`
      } else {
        minute = ` ${minutes[2]}`
      }
      timeMinutes = `и ${decadeMinutes[timeMinutes[0] - 2]} ${
        unitDigits[timeMinutes[1] - 1]
      } ${minute}`
    }

    let fullHour = hour;
    if (fullHour < 6) {
      if (fullHour > 1 && fullHour < 5) {
        timeHour += ` ${hours[1]}`
      }
      if (fullHour === 0) {
        timeHour += ` ${hours[2]}`
      }
      timeHour += ` ${dayTime[0]}`
    } else if (fullHour > 5 && fullHour < 13) {
      timeHour += ` ${hours[2]} ${dayTime[1]}`
    } else if (fullHour === 13) {
      timeHour += ` ${dayTime[2]}`
    } else if (fullHour > 13 && fullHour < 17) {
      timeHour += ` ${hours[1]} ${dayTime[2]}`
    } else if (fullHour > 16) {
      timeHour += ` ${hours[2]} ${dayTime[3]}`
    }

    return `${timeHour} ${timeMinutes}`
  }

  getTimer() {
    this.getQuote()
    setInterval(() => {
      setTimeout(this.getQuote())
    }, 10000)
  }
}

