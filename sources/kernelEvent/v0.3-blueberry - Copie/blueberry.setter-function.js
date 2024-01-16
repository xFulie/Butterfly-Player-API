// SETTER VIDEO
set vElement(value) { this.vGlobal.element = value; }
set vTitle(value) {  }
set vThumbnail(value) { this.#vGlobal.srcThumbnail = value }
set vSrc(value) { this.#vGlobal.src = value }
set vAllQuality(value) { this.#vSettings.allQuality = value }
set vAllAudio(value) { this.#vSettings.allAudio = value }
set vAllSubtitle(value) { this.#vSettings.allSubtitle = value }
set vCurrentTime(value) { this.#vGlobal.element.currentTime=value }

set vVolume(value) {
	this.#vGlobal.volume = value
	if(this.#vGlobal.element)
		this.#vGlobal.element.volume = value
	//this.#updateBar(null, value)
}

set vAutoplay(value) {
	this.#vGlobal.autoplay = value
}
set vControls(value) {
	this.#vGlobal.controls = value
}

set vCurrentQuality(value) { this.#vSettings.currentQuality = value }

set vCurrentExtension(value) { this.#vSettings.currentExtension = value }

set vAllExtension(value) {
	this.#vSettings.chargeExtention = value
	this.#vSettings.currentExtension = this.is_extension()
}


set gSize(size) {

	this.#vSettings.height = size[0]
	this.#vSettings.width = size[1]

	if(!this.#gContenaire) {
		console.error("Error d'initilisation du lecteur.")
		return;
	}


		/* if(this.#vSettings.height === 0 || this.#vSettings.width === 0) {
			this.#gContenaire.style.height = 720+"px"
			this.#gContenaire.style.width = 1280+"px"
			this.gClassAdd('video-is-error')
			this.#vGlobal.error = true;

			this.#loadError(102)
			return;
		} */
		//let heightConfig =

	if(this.#vSettings.height !== '100%' && this.#vSettings.height !== 'auto') {
		this.#vSettings.height += "px"
	}
	if(this.#vSettings.width !== '100%' && this.#vSettings.width !== 'auto') {
		this.#vSettings.width += "px"
	}

	this.#gContenaire.style.height = this.#vSettings.height
	this.#gContenaire.style.width = this.#vSettings.width

	return true;
}

set inFullscreen(value) {
	this.inFullscreen = value;

	if(!this.#gContenaire)
		return;

	if(value == 'true')
		this.#gContenaire.classList.add('fullscreen');
	else
		this.#gContenaire.classList.remove('fullscreen');
}

set gContenaire(value) { this.#gContenaire = document.querySelector(value) }

set addingContenaire(value) {
	this.#gContenaire.innerHTML += value
}

set visibilityControler(value) { this.#vSettings.visibilityControler = value }

set fontSizeSubtitle(value) { this.#vGlobal.fontSizeSubtitle = value }

set volumeDrag(value) { this.#vGlobal.volumeDrag = value }