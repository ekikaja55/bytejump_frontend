export function convertGDriveToEmbedUrl(url: string): string {
	const match = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
	if (match && match[1]) {
		return `https://drive.google.com/file/d/${match[1]}/preview`;
	}
	return '';
}
