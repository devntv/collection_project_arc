const withPlugins = require('next-compose-plugins');
const withTM = require("next-transpile-modules")(
    [
        "@thuocsi/nextjs-components",
    ]
);

function getFormattedDate(date, format = "DD/MM/YYYY") {
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const year = date.getFullYear();
	const hour = date.getHours();
	const minute = date.getMinutes();
	const second = date.getSeconds();

	return format
		.replace("DD", String(day).padStart(2, "0"))
		.replace("MM", String(month).padStart(2, "0"))
		.replace("YYYY", year)
		.replace("HH", String(hour).padStart(2, "0"))
		.replace("mm", String(minute).padStart(2, "0"))
		.replace("ss", String(second).padStart(2, "0"));
}

const generateBuildId = () => getFormattedDate(new Date(), "YYYYMMDDHHmm");

const global = {
	buildId: generateBuildId(),
	env: process.env.ENV,
	version: process.env.VERSION,
	API_HOST: process.env.API_HOST,
	WEB_HOST: process.env.WEB_HOST,
	INTERNAL_HOST: process.env.INTERNAL_HOST,
	ZOOM_API_URL: process.env.ZOOM_API_URL,
	ZOOM_API_KEY: process.env.ZOOM_API_KEY,
	ZOOM_API_SECRET: process.env.ZOOM_API_SECRET,
	ZOOM_SDK_KEY: process.env.ZOOM_SDK_KEY,
	ZOOM_SDK_SECRET: process.env.ZOOM_SDK_SECRET,
	ZOOM_VIDEO_SDK_KEY: process.env.ZOOM_VIDEO_SDK_KEY,
	ZOOM_VIDEO_SDK_SECRET: process.env.ZOOM_VIDEO_SDK_SECRET,
	TWILIO_API_KEY_SID: process.env.TWILIO_API_KEY_SID,
	TWILIO_API_KEY_SECRET: process.env.TWILIO_API_KEY_SECRET,
	HTTP_WEB_HOST: process.env.HTTP_WEB_HOST,
	HTTP_INTERNAL_HOST: process.env.HTTP_INTERNAL_HOST,
	WS_HOST: process.env.WS_HOST
};

// disable log for built environment
if (process.env.ENV !== "local") {
    console.log = function () { }
}

module.exports = withPlugins([withTM], {
    
    publicRuntimeConfig: {
		...global,
	},

    async rewrites() {
        return [
            {
                source: '/backend/:path*',
                destination: `${process.env.API_HOST}/:path*`
            }
        ]
    }
});