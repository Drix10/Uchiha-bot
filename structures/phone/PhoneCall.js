const { shorten, stripInvites, verify } = require('../../functions');
const db = require('quick.db');
const { PREFIX } = require('../../config');
const { stripIndents } = require('common-tags');

module.exports = class PhoneCall {
	constructor(bot, origin, recipient) {
		Object.defineProperty(this, 'client', { value: bot });

		this.id = `${origin.id}:${recipient.id}`;
		this.origin = origin;
		this.recipient = recipient;
		this.active = false;
		this.timeout = null;
		this.cooldown = new Set();
	}

	async start() {
		await this.origin.send(`**<a:phonework:870885494744035330> Calling ${this.recipient.guild.name}!**`);
		await this.recipient.send(`**<a:phonework:870885494744035330> Incoming Call From ${this.origin.guild.name}! Pick up?**`);
		const validation = await verify(this.recipient, null);
		if (!validation) {
			await this.hangup('declined', validation);
			return this;
		}
		await this.accept();
		return this;
	}

	async accept() {
		let prefix;
		let prefix2;
		let fetched = await db.fetch(`prefix_${this.recipient.guild.id}`);
		let fetched2 = await db.fetch(`prefix_${this.origin.guild.id}`);

		if (fetched2 === null) {
			prefix2 = PREFIX
		} else {
			prefix2 = fetched2
		}

		if (fetched === null) {
			prefix = PREFIX
		} else {
			prefix = fetched
		}
		this.active = true;
		this.setTimeout();
		await this.origin.send(`**<a:phonework:870885494744035330> ${this.recipient.guild.name} Picked Up! Type \`${prefix2}hangup\` To Hang Up!**`);
		await this.recipient.send(`**<a:phonework:870885494744035330> Accepted Call From ${this.origin.guild.name}! Type \`${prefix}hangup\` To Hang Up!**`);
		return this;
	}

	async hangup(nonQuitter, validation) {
		this.active = false;
		clearTimeout(this.timeout);
		this.client.phone.delete(this.id);
		if (nonQuitter === 'time') {
			await this.origin.send('**<a:phonework:870885494744035330> Call Ended - 3 minutes Over!**');
			await this.recipient.send('**<a:phonework:870885494744035330> Call Ended - 3 minutes Over!**');
		} else if (nonQuitter === 'declined') {
			const recipientMsg = validation === 0 ? '**Sent To Voicemail!**' : '**Declined The Call!**';
			await this.recipient.send(`<a:phonework:870885494744035330> ${recipientMsg}`);
			if (validation === 0) {
				await this.origin.send(`**<a:phonework:870885494744035330> ${this.recipient.guild.name} Didn't Answer! Leave A Voicemail?**`);
				const voicemailValidation = await verify(this.origin, null);
				if (!voicemailValidation) {
					await this.origin.send('**<a:phonework:870885494744035330> No Voicemail Will Be Left!**');
				} else {
					await this.origin.send('**<a:phonework:870885494744035330> Please Leave Your Message!(max 280 characters)\nYou Have 30 Seconds!**')

					const voicemail = await this.origin.awaitMessages(res => res.content && res.content.length <= 280, {
						max: 1,
						time: 30000
					});
					if (!voicemail.size) {
						await this.origin.send('**<a:phonework:870885494744035330> Timeout! No Voicemail Will Be Left!**');
					} else {
						const voicemailMsg = voicemail.first();
						await this.sendVoicemail(this.recipient, voicemailMsg.author, voicemailMsg.content);
						await this.origin.send('**<a:phonework:870885494744035330> Your Voicemail Has Been Sent!**');
					}
				}
			} else {
				let originMsg = validation === 0 ? '**Didn\'t Answer!**' : '**Declined The Call!**';
				await this.origin.send(`**<a:phonework:870885494744035330> ${this.recipient.guild.name} ${originMsg}**`);
			}
		} else {
			const quitter = nonQuitter.id === this.origin.id ? this.recipient : this.origin;
			await nonQuitter.send(`**<a:phonework:870885494744035330> ${quitter.guild.name} Disconnected!**`);
			await quitter.send('**<a:phonework:870885494744035330> Disconnected!**');
		}
		return this;
	}

	send(channel, msg, hasText, hasImage, hasEmbed) {
		if (this.cooldown.has(msg.author.id)) {
			const badChannel = channel.id === this.origin.id ? this.recipient : this.origin;
			return badChannel.send(`**<a:phonework:870885494744035330> ${msg.author}, Please Wait \`5\` Seconds Between Messages!**`);
		}
		this.setTimeout();
		this.cooldown.add(msg.author.id);
		setTimeout(() => this.cooldown.delete(msg.author.id),);

		const attachments = hasImage ? msg.attachments.map(a => a.url).join('\n') : null;
		if (!hasText && hasImage) return channel.send(`**<a:phonework:870885494744035330> ${msg.author.tag} - **\n${attachments}`);
		if (!hasText && hasEmbed) return channel.send(`**<a:phonework:870885494744035330> ${msg.author.tag} Sent An Embed!**`);
		let content = stripInvites(msg.content);
		content = content.length > 1000 ? `${shorten(content, 500)} (Message too long)` : content;
		return channel.send(`<a:phonework:870885494744035330> **${msg.author.tag} -** ${content}\n${attachments || ''}`.trim());
	}

	sendVoicemail(channel, author, message) {
		return channel.send(stripIndents`
			**<a:phonework:870885494744035330> New Voicemail from \`${this.origin.guild.name}\` -
			${author.tag} -** ${message}
		`);
	}

	setTimeout() {
		this.origin
	}

	setTimeout() {
		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(() => this.hangup('time'), 180000);
		return this.timeout;
	}
};