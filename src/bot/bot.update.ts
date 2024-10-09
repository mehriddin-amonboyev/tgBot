import { Ctx, Hears, Start, Update } from "nestjs-telegraf";
import { BotService } from "./bot.service";
import { Context } from "telegraf";

@Update()
export class BotUpdate{
    constructor(private readonly botService: BotService) {}
    @Start()
    async onStart(@Ctx() ctx: Context){
        return  this.botService.onStart(ctx);
    }
    @Hears("Category")
    async onCategory(@Ctx() ctx: Context){
        return  this.botService.onCategory(ctx);
    }
    @Hears("Taomlar")
    async onFoods(@Ctx() ctx: Context){
        return  this.botService.onFoods(ctx);
    }
    @Hears("Burger")
    async onBurger(@Ctx() ctx: Context){
        return  this.botService.onBurger(ctx);
    }
}