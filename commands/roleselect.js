const discord = require("discord.js");


module.exports.run = async (client, message, args) => {

    const options = [
        {
            label: "Admin",
            value: "913517452258861116"
        },
        {
            label: "Moderator",
            value: "913517923484721202"
        },
        {
            label: "Gamer",
            value: "913517640209817640"
        }
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("roles")
                .setMinValues(0)
                .setMaxValues(3)
                .setPlaceholder("Selecteer een rol")
                .addOptions(options)
        );

        return message.channel.send({ content: "Selecteer je role", components: [row] });
    
}


module.exports.help = {
    name: "role",
    category: "general",
    description: "Kies je role"
}
