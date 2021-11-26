const botConfig = require("../botConfig.json");

module.exports.run = async (client, message, args) => {

    try {

        var prefix = botConfig.prefix;

        var respone = "**Bot commands**\r\n\n";
        var general = "* _Algemeen_ **\r\n";
        var info = "\n**_Informatie_**\r\n";

        client.commands.forEach(command => {

            switch (command.help.category) {

                case "general":
                    general += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                    break;
                case "info":
                    info += `${prefix}${command.help.name} - ${command.help.description}\r\n`;
                    break;
            }
        });

        respone += general + info;

        message.author.send(respone).then(() => {
            return message.reply("Alle hulpcommands kan je vinden in je PM");
        }).catch(() => {
            return message.reply("Je PM is uitgeschakeld, Je kunt dus geen commands ontvangen");
        })

    } catch (error) {
        message.reply("Er is een probleem opgedoken");
    }
}

module.exports.help = {
    name: "help",
    category: "info",
    descriiption: "Hulp menu"
}