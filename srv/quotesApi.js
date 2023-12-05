import quotes from './data/quotes.json' assert { type: "json" };
/**
 * Функция получения цитат
 * @param {number} time - четырехзначное число в котором первые 2 цифры время, 
 *                        вторые минуты в 24 часовом фформате
 * @returns - объект или false 
 */
 export const sendQuote = (time) => {
    if (time && getQuote(time)) {
        return {
            status: true,
            data: getQuote(time)
        };
    }
    return {
        status: false
    };
 };
/**
 * Запрос цитаты из файла
 * @param {number} time 
 * @returns 
 */
 const getQuote = time => quotes[time];