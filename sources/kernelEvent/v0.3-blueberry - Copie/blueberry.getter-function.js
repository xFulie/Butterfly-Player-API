// GETTER VIDEO
get vSrc() { return this.#vGlobal.src }
get vCurrentQuality() { return this.#vSettings.currentQuality }
get vCurrentAudio() { return this.#vSettings.currentAudio }
get vCurrentSubtitle() { return this.#vSettings.currentSubtitle }
get vCurrentPlaybackRate() { return this.#vSettings.currentPlaybackRate }

get vCurrentExtension() { return this.#vSettings.currentExtension }
get vCurrentTime() { return this.#vGlobal.element.currentTime }

get duration() { return this.#vGlobal.element.duration }

get contenaire() { return this.#gContenaire }

get vVolume() { return this.#vGlobal.volume }

get visibilityControler() { return this.#vSettings.visibilityControler }
get fontSizeSubtitle() { return this.#vGlobal.fontSizeSubtitle }

get volumeDrag() { return this.#vGlobal.volumeDrag }