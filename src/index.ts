import * as dotenv from 'dotenv'
dotenv.config()

import { Telegraf, Markup, Scenes } from 'telegraf'
import { message } from 'telegraf/filters'
import { session } from 'telegraf'
import { Stage } from 'telegraf/scenes'

import { STICKER } from './sticker.js'
import { isNumber } from './util.js'
import { getUrl } from './url.js'

const SCENE_ID = 'CONTACT_DATA_WIZARD_SCENE_ID'
// TODO: set proper typings
const contactDataWizard = new Scenes.WizardScene<any>(
  SCENE_ID,
  async (ctx) => {
    await ctx.reply(`
      🤗 У меня есть самокаты для ребят с ростом от 100 до 200 см. \n\n✌️ Подскажи свой рост в сантиметрах, и я покажу подходящие варианты
    `)
    ctx.scene.state = {}
    ctx.wizard.next()
  },
  async (ctx) => {
    const input = ctx.message?.text?.trim()
    const inputNumber = parseInt(input, 10)

    if (!isNumber(input)) {
      await ctx.reply(
        '😵 Прости, не разобрал. Понимаю только цифры. \nПопробуй ещё разок',
      )
      return
    }

    await ctx.reply(
      getUrl(inputNumber),
      Markup.inlineKeyboard([
        Markup.button.callback('Подберём ещё разок', 'Go'),
        Markup.button.callback('Назад в меню', 'Home'),
      ]),
    )

    return await ctx.scene.leave()
  },
)

const stage = new Stage<Scenes.SceneContext>(
  [contactDataWizard],
  // {
  // default: 'CONTACT_DATA_WIZARD_SCENE_ID',
  // }
)

const bot = new Telegraf<Scenes.SceneContext>(process.env.BOT_TOKEN || '')

bot.use(session())
bot.use(stage.middleware())
bot.use(Telegraf.log())

bot.start(async (ctx) => {
  await ctx.reply('Welcome to the party')
  await ctx.replyWithSticker(STICKER.partyCat)

  return await ctx.reply(
    'Привет',
    Markup.inlineKeyboard([
      Markup.button.callback('Подобрать трюковой самокат', 'Go'),
    ]),
  )
})

bot.on(message('text'), async (ctx) => {
  return await ctx.reply(
    'Привет',
    Markup.inlineKeyboard([
      Markup.button.callback('Подобрать трюковой самокат', 'Go'),
    ]),
  )
})

bot.action('Go', async (ctx) => {
  await ctx.answerCbQuery()
  return await ctx.scene.enter(SCENE_ID)
})

bot.action('Home', async (ctx) => {
  await ctx.answerCbQuery()
  return await ctx.reply(
    'Привет',
    Markup.inlineKeyboard([
      Markup.button.callback('Подобрать трюковой самокат', 'Go'),
    ]),
  )
})

bot.launch()

console.log('___bot_has_started___')

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
