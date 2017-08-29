import discord

from discord.ext import commands

description = 'PixaBot'
bot_prefix = 'px;'

client = commands.Bot(description=description, command_prefix=bot_prefix)

@client.event
async def on_ready():
    print('The bot is now online!')
    print('Name: ()'.format(client.user.name))
    print('ID: ()'.format(client.user.id))
    print(discord.__version__)
    
@client.command(pass_context=True)
async def ping(ctx):
    await client.say('Pong!')
    
client.run('')