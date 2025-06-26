// utils/drive.ts
export function convertGDriveViewToImageUrl(viewUrl: string): string {
	const match = viewUrl.match(/\/d\/(.*?)\//);
	if (!match) return viewUrl; // fallback ke original jika gagal
	return `https://drive.google.com/uc?export=view&id=${match[1]}`;
}
