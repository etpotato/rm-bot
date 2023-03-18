const MIN_HEIGHT = 100
const MAX_HEIGHT = 200

export function getUrl(height: number) {
  if (height < MIN_HEIGHT) {
    return `
      🙄 Нигде не ошибся? Для твоего роста могу предложить самые маленькие самокаты. \n\n😎 Модели подготовил, можешь посмотреть: \nhttps://rollershop.ru/catalog/samokaty/samokaty-dlya-tryukov/filter/vysota_rulya_vsia-to-70/available-yes/
    `
  }

  if (height > MAX_HEIGHT) {
    return `
      🙄 Нигде не ошибся? Для твоего роста могу предложить самые высокие самокаты. \n\n😎 Модели подготовил, можешь посмотреть: \nhttps://rollershop.ru/catalog/samokaty/samokaty-dlya-tryukov/filter/vysota_rulya_vsia-from-95/available-yes/
    `
  }

  const heightFrom = Math.round(height * 0.5)
  const heightTo = Math.round(height * 0.6)

  return `
    😎 Модели подготовил, можешь посмотреть: \nhttps://rollershop.ru/catalog/samokaty/samokaty-dlya-tryukov/filter/vysota_rulya_vsia-from-${heightFrom}-to-${heightTo}/available-yes/
  `
}
