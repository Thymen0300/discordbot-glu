const discord = require('discord.js');

module.exports.run = async (client, message, args) => {

    const categoryID = "913572977822535710";

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet doen");

    if (message.channel.parentId == categoryID) {

        message.channel.delete();

        var embedTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setDescription("Het ticket is gemarkeerd als **compleet**")
            .setFooter("Ticket gesloten");

        var ticketChannel = message.member.guild.channels.cache.find(channel => channel.name === "log");
        if (!ticketChannel) return message.reply("Kanaal bestaat niet");

        ticketChannel.send({ embeds: [embedTicket] });

    } else {
        message.channel.send("Gelieve dit commando in een ticket kanaal uit te voeren.");
    }

}

    module.exports.help = {
        name: "close",
        category: "general",
        description: "zegt Hallo"
    }