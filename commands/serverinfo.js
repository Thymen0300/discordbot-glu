const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Glu-GameBot")
        .setDescription("De stats van de server")
        .setColor("#0099ff")
        .addFields(
            {name:"Je bent de server gejoined", value: message.member.joinedAt.toString()},
            {name:"Totaal members", value: message.guild.memberCount.toString()}
        );


    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "serverinfo",
    category: "info",
    description: "geeft server info"
}