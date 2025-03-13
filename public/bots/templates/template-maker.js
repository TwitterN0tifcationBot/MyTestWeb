const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('template')
        .setDescription('Create a template for a specific command')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('The type of template to create')
                .setRequired(true)
                .addChoices(
                    { name: 'Moderation', value: 'moderation' },
                    { name: 'Giveaways', value: 'giveaways' },
                    { name: 'Leveling', value: 'leveling' },
                )
        )
        .addStringOption(option =>
            option.setName('command')
                .setDescription('The command to create a template for')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('prefix')
                .setDescription('The prefix for the command')
                .setRequired(false)
        ),
    async execute(interaction) {
        const type = interaction.options.getString('type');
        const command = interaction.options.getString('command');
        const prefix = interaction.options.getString('prefix') || '!';

        let template = '';

        switch (type) {
            case 'moderation':
                template = `// Moderation Template\n\n${prefix}${command} <@user> <reason>`;
                break;
            case 'giveaways':
                template = `// Giveaways Template\n\n${prefix}${command} <prize> <duration>`;
                break;
            case 'leveling':
                template = `// Leveling Template\n\n${prefix}${command} <level> <reward>`;
                break;
            default:
                return interaction.reply({ content: 'Invalid template type', ephemeral: true });
        }

        const embed = new MessageEmbed()
            .setTitle(`Template for ${command}`)
            .setDescription(template)
            .setColor('BLUE');

        interaction.reply({ embeds: [embed] });
    },
};