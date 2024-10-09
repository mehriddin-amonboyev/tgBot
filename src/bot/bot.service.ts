import { Action, Command, Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as path from 'path';
import { callback } from 'telegraf/typings/button';

@Injectable()
@Update()
export class BotService {
  constructor(
    @InjectBot() private bot: Telegraf<Context>
  ) { }

  async onStart(ctx: Context) {
    try {
      ctx.reply("Foods bot ga xush kelibsiz bu yerda siz taomlarga buyurtma bera olishingiz mumkin ", {
        reply_markup: {
          keyboard: [
            [{ text: "Category" }],
          ],
          resize_keyboard: true
        }

      })
    } catch (error) {
      console.log("Error chiqdi Srartdan >>>>>>>>>>>\n", error.message);
      ctx.reply('Something went wrong');
    }
  }

  async onCategory(ctx: Context) {
    try {
      ctx.reply("Bo'limlarni ko'rib chiqish", {
        reply_markup: {
          keyboard: [
            [{ text: 'Taomlar' }, { text: 'Ichimliklar' }, { text: "Salatlar" },]
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }

      })
    } catch (error) {
      console.log("Error chiqdi>>>>>>>>>>>\n", error.message);
      ctx.reply('Something went wrong');
    }
  }

  async onFoods(ctx: Context) {
    try {
      const service = [
        { id: 1, name: "Burger" },
        { id: 2, name: "Pitsa" },
        { id: 3, name: "Lavash" },
        { id: 4, name: "Xot-Dog" },
      ]
      const inline_keyboard = [];
      service.forEach(service => {
        inline_keyboard.push([
          { text: service.name, callback_data: `service_${service.id}` }]
        )
      });
      ctx.reply("👍",
        {
          reply_markup: {
            inline_keyboard,
            resize_keyboard: true,
            one_time_keyboard: true
          }
        }
      )
    } catch (error) {
      console.log("Error chiqdi>>>>>>>>>>>\n", error.message);
      ctx.reply('Something went wrong');
    }
  }
  async onBurger(ctx: Context) {
    try {
      const imagepath = path.join(
        __dirname,
        '../../',
        'public',
        'images',
        'burger.webp',
      );
      await ctx.replyWithPhoto(
        {
          source: createReadStream(imagepath)
        },
        {
          reply_markup: {
            inline_keyboard: [
              [
                { callback_data: 'start', text: "Start" },
                { callback_data: 'help', text: "Help command" }
              ],
              [{ callback_data: 'categories', text: "barcha bo'limlarni ko'rish" }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true
          }
        }
      );
      ctx.reply("🤣",
      )
    } catch (error) {
      console.log("Error chiqdi>>>>>>>>>>>\n", error.message);
      ctx.reply('Something went wrong');
    }
  }


}
