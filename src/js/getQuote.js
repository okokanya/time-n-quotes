class TimeQuote {
  constructor() {
    this.blockItem = document.querySelector('.quote-block--item')
    this.blockAuthor = document.querySelector('.quote-block--author')
    this.blockSource = document.querySelector('.quote-block--source')
  }

  getQuote() {
    let date = new Date()
    const dayTime = ['ночи', 'утра', 'дня', 'вечера']
    const hour = ['час', 'часа', 'часов']
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

    function setWordTime() {
      let timeHour =
        date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
      let timeMinutes = date.getMinutes()

      switch (timeHour) {
        case 1:
          timeHour = hour[0].replace(hour[0][0], hour[0][0].toUpperCase())
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

      let fullHour = date.getHours()
      if (fullHour < 6) {
        if (fullHour > 1 && fullHour < 5) {
          timeHour += ` ${hour[1]}`
        }
        if (fullHour > 5) {
          timeHour += ` ${hour[2]}`
        }
        timeHour += ` ${dayTime[0]}`
      } else if (fullHour > 5 && fullHour < 13) {
        timeHour += ` ${hour[2]} ${dayTime[1]}`
      } else if (fullHour === 13) {
        timeHour += ` ${dayTime[2]}`
      } else if (fullHour > 13 && fullHour < 17) {
        timeHour += ` ${hour[1]} ${dayTime[2]}`
      } else if (fullHour > 16) {
        timeHour += ` ${hour[2]} ${dayTime[3]}`
      }

      return `${timeHour} ${timeMinutes}`
    }

    fetch(
      `/api?time=${
        String(date.getHours()) +
        String(
          date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
        )
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        this.blockItem.innerHTML = data.data.quote
        this.blockAuthor.innerHTML = data.data.author
        this.blockSource.innerHTML = data.data.source
      })
      .catch(() => {
        this.blockItem.innerHTML = setWordTime()
        this.blockAuthor.innerHTML = ''
        this.blockSource.innerHTML = ''
      })
  }

  getTimer() {
    this.getQuote()
    setInterval(() => {
      setTimeout(this.getQuote())
    }, 10000)
  }
}

let time = new TimeQuote()
time.getTimer()
