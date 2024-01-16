/* 
 * Blueberry V0.2
 *
 *
 *
 */
/*
 *
 * Variable player
 *
 */
const iconPlay = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M96 448l320-192L96 64v384z"/></svg>`
const iconPause = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M224 432h-80V80h80zM368 432h-80V80h80z"/></svg>`

const iconUnMute = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64M368 368c19.48-33.92 32-64.06 32-112s-12-77.74-32-112M416 416c30-46 48-91.43 48-160s-18-113-48-160" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="32"/><path d="M125.65 176.1H32v159.8h93.65L256 440V72L125.65 176.1z"/></svg>`
const iconMute = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="32" d="M416 432L64 80"/><path d="M352 256c0-24.56-5.81-47.88-17.75-71.27L327 170.47 298.48 185l7.27 14.25C315.34 218.06 320 236.62 320 256a112.91 112.91 0 01-.63 11.74l27.32 27.32A148.8 148.8 0 00352 256zM416 256c0-51.19-13.08-83.89-34.18-120.06l-8.06-13.82-27.64 16.12 8.06 13.82C373.07 184.44 384 211.83 384 256c0 25.93-3.89 46.21-11 65.33l24.5 24.51C409.19 319.68 416 292.42 416 256z"/><path d="M480 256c0-74.26-20.19-121.11-50.51-168.61l-8.61-13.49-27 17.22 8.61 13.49C429.82 147.38 448 189.5 448 256c0 48.76-9.4 84-24.82 115.55l23.7 23.7C470.16 351.39 480 309 480 256zM256 72l-73.6 58.78 73.6 73.59V72zM32 176.1v159.8h93.65L256 440V339.63L92.47 176.1H32z"/></svg>`

const iconFullscreen = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M388 466h-68v-44h68a34 34 0 0034-34v-68h44v68a78.09 78.09 0 01-78 78zM466 192h-44v-68a34 34 0 00-34-34h-68V46h68a78.09 78.09 0 0178 78zM192 466h-68a78.09 78.09 0 01-78-78v-68h44v68a34 34 0 0034 34h68zM90 192H46v-68a78.09 78.09 0 0178-78h68v44h-68a34 34 0 00-34 34z"/></svg>`
const iconExitFullscreen = ''

const iconSetting = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M256 176a80 80 0 1080 80 80.24 80.24 0 00-80-80zm172.72 80a165.53 165.53 0 01-1.64 22.34l48.69 38.12a11.59 11.59 0 012.63 14.78l-46.06 79.52a11.64 11.64 0 01-14.14 4.93l-57.25-23a176.56 176.56 0 01-38.82 22.67l-8.56 60.78a11.93 11.93 0 01-11.51 9.86h-92.12a12 12 0 01-11.51-9.53l-8.56-60.78A169.3 169.3 0 01151.05 393L93.8 416a11.64 11.64 0 01-14.14-4.92L33.6 331.57a11.59 11.59 0 012.63-14.78l48.69-38.12A174.58 174.58 0 0183.28 256a165.53 165.53 0 011.64-22.34l-48.69-38.12a11.59 11.59 0 01-2.63-14.78l46.06-79.52a11.64 11.64 0 0114.14-4.93l57.25 23a176.56 176.56 0 0138.82-22.67l8.56-60.78A11.93 11.93 0 01209.94 26h92.12a12 12 0 0111.51 9.53l8.56 60.78A169.3 169.3 0 01361 119l57.2-23a11.64 11.64 0 0114.14 4.92l46.06 79.52a11.59 11.59 0 01-2.63 14.78l-48.69 38.12a174.58 174.58 0 011.64 22.66z"/></svg>'

const iconLess = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M328 112L184 256l144 144"/></svg>'
const iconPlus = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M184 112l144 144-144 144"/></svg>'

const iconReresh = '<svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M320 146s24.36-12-64-12a160 160 0 10160 160" fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="square" stroke-miterlimit="10" stroke-width="32" d="M256 58l80 80-80 80"/></svg>'

function get_mime(string) {
	let r = '';
	switch(string) {
		case 'mp4':
			r = 'video/mp4'
			break;
		case 'webm':
			r = 'video/webm'
			break;
	}

	return r;
}

function video_resize(playerContenaire, elementPlayer) {
	let videoHeight = elementPlayer.offsetHeight
	let videoWidth = elementPlayer.offsetWidth

	let windowWidth = playerContenaire.offsetWidth
	let windowHeight = playerContenaire.offsetHeight

	if((videoHeight > windowHeight)) {
		elementPlayer.style.height = windowHeight+"px"
		elementPlayer.style.width = "auto"
	}
	if((videoWidth > windowWidth)) {
		elementPlayer.style.width = windowWidth+"px"
		elementPlayer.style.height = "auto"
	}
	if((videoWidth < windowWidth)) {
		elementPlayer.style.width = windowWidth+"px"
		elementPlayer.style.height = "auto"
	}
	if((videoHeight < windowHeight)) {
		elementPlayer.style.height = windowHeight+"px"
		elementPlayer.style.width = "auto"
	}

	console.log('size change')
}

class Blueberry {
	// VARIABLE PRIVATE
	#gContenaire = null

	#vGlobal = {
		'element': null,
		'thumbnail': null,

		'src': '',
		'srcThumbnail': '',
		'autoplay': false,
		'muted': false,

		'is_playing': false,


		'currentTime': null,
		'currentFile': '',


		'allSubtitleList_Track': '',
		'fontSizeSubtitle': 32,
		'currentTrack': null
	}

	#vControls = {
		'volumeBarContenaire': null,
		'volumeBarSlider': null,
		'volumeDrag': false,

		'progressBarContenaire': null,
		'progressBarBuffered': 0,
		'progressBarReaded': 0,

		'infoBull': null,

		'visibilityControler': true
	}

	#vSettings = {
		'allQuality': [],
		'allAudio': [],
		'allSubtitle': [],

		'currentExtention': '',
		'currentQuality': '',
		'currentAudio': '',
		'currentSubtitle': '',

		'height': '720',
		'width': '1280',


		'chargeExtention': ['mp4', 'webm'],


		'htmlQuality': '',
		'htmlQualityButtons': '',

		'htmlAudio': '',
		'htmlAudioButtons': '',

		'htmlSubtitle': '',
		'htmlSubtitleButtons': '',
	}

	#initEvent = []
	initEventNumber = 0