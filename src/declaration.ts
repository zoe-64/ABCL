declare module '*.css'
declare module '*.png'
declare module '*.html'
declare module '*.json'

type abclData = {
	"DiaperSizeScale": {
		[key:string]: number
	}
	"Diapers": {
		[key:string]: {
			"primaryColor"?: number,
			"secondaryColor"?: number,
			"size": number
		}
	}
}