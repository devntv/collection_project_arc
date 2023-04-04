export const handleMessageMedia = (message) => {
	if (message.URLMedia) {
		const n = message.URLMedia.length;
		message.media = [];
		for (let i = 0; i < n; i++) {
			message.media.push({
				url: message.URLMedia[i],
				type: message.type.toLowerCase(),
				name: message.fileName[i] || "",
				size: message.size ? (message.size[i] || "") : "",
			})
		}
	}
	if (message.replyForMessage) {
		handleMessageMedia(message.replyForMessage)
	}
}