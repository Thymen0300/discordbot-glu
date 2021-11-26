const fs = require("fs");
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("KICK_MEMBERS")) return message.reply("U bent niet bevoegd om dit te doen");

    if (!args[0]) return message.reply("Geef een gebruiker op");

    if (!args[1]) return message.reply("Geef een reden op");

    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("Kan de gebruiker niet vinden");

    if (warnUser.permissions.has("MANAGE_MESSAGES")) return message.reply("Sorry je kan dez persoon geeen waarschuwing geven");

    const warns = JSON.parse(fs.readFileSync("./warning.json", "UTF8"));

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }

    warns[warnUser.id].warns++;

    var embed = new discord.MessageEmbed()
        .setColor("#ff0000")
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Gewarnd:** ${warnUser.user.username} (${warnUser.id})
        **Warning door:** ${message.author}
        **Redenen: ** ${reason}`)
        .addField("Aantal warns", warns[warnUser.id].warns.toString());

    const channel = message.member.guild.channels.cache.get("911069154092675122");

    if (!channel) return;

    channel.send({ embeds: [embed] });

    if (warns[warnUser.id].warns == 3) {

        var mes = new discord.MessageEmbed()
            .setDescription("PAS OP " + warnUser.user.username)
            .setColor("#ee0000")
            .addField("Bericht", "Nog één warn en je hebt een ban!!");

        message.channel.send({ embeds: [mes] });

    } else if (warns[warnUser.id].warns == 4) {

        message.guild.members.ban(warnUser, { reason: reason });
        message.channel.send(`${warnUser} is verbannen door de bot wegens te veel warns`);

    }

    fs.writeFile("./warning.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });

}

module.exports.help = {
    name: "warn",
    category: "general",
    description: "Warn een member"
}