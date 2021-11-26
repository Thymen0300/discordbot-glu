const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Glu-GameBot")
        .setDescription("Ja")
        .setColor("AQUA")
        .addField("Bot naam", client.user.username)
        .setThumbnail("Dit is de Thumbnail")
        // .setImage('')
        .setTimestamp()
        .setFooter("Footer tekst", '')

    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "info",
}