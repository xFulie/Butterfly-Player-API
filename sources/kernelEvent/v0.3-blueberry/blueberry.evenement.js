class blueberryEvenement extends blueberryFunction {
	#evenement = {
		count: 0
	}

	kernelEvenement_init() {
		this.#evenementVideo()
		this.#evenementVideoAlternative()

		this.addEvent(window, 'load', () => {
			if(this.onLoad) {
				let taskStoped = this.onLoad();
				if(taskStoped == true)
					return;
			}
		})

		this.addEvent(this.ConstructorElement, 'fullscreenchange', () => {
			if (document.exitFullscreen) {
				this.inFullScreen = false;
			}

			if(this.onFullscreenchange) {
				let taskStoped = this.onFullscreenchange();
				if(taskStoped == true)
					return;
			}
		})
	}

	/*
	 * Video Evenement
	 * - Play, Pause, Error, DurationChange, Timeupdate
	 */
	#evenementVideo() {
		this.addEvent(this.videoNode, 'play', () => {
			if(this.onPlay) {
				let taskStoped = this.onPlay();
				if(taskStoped == true)
					return;
			}
		})
		this.addEvent(this.videoNode, 'pause', () => {
			if(this.onPause) {
				let taskStoped = this.onPause();
				if(taskStoped == true)
					return;
			}
		})
		this.addEvent(this.videoNode, 'error', () => {
			if(this.onError) {
				let taskStoped = this.onError();
				if(taskStoped == true)
					return;
			}
		})
		this.addEvent(this.videoNode, 'durationchange', () => {
			if(this.onDurationchange) {
				let taskStoped = this.onDurationchange();
				if(taskStoped == true)
					return;
			}
		})
		this.addEvent(this.videoNode, 'timeupdate', () => {
			if(this.onTimeupdate) {
				let taskStoped = this.onTimeupdate();
				if(taskStoped == true)
					return;
			}
		})
	}
	/*
	 * Video Evenement Alternative
	 * - Progress, Seeked
	 */
	#evenementVideoAlternative() {
		this.addEvent(this.videoNode, 'volumechange', () => {
			if(this.onVolumechange) {
				let taskStoped = this.onVolumechange();
				if(taskStoped == true)
					return;
			}
		})
	}

	addEvent(CssSelector, actionName, functionCallback, isCssSelector) {
		let elementEvent = CssSelector
		if(isCssSelector) {
			elementEvent = this.ConstructorElement.querySelector(CssSelector);
		}

		if(!elementEvent) {
			console.error(`Imposible de charger l'évenement sur un noeud inéxistant. :`, elementEvent)
			return;
		}

		elementEvent.addEventListener(actionName, (event) => {
			if(functionCallback)
				functionCallback(event)
		})

		//console.log(this.videoNode.parentNode, CssSelector)

		this.#evenement.count++
	}

	removeEvent(CssSelector, actionName, functionCallback, isCssSelector) {
		let elementEvent = CssSelector
		if(isCssSelector) {
			elementEvent = this.ConstructorElement.querySelector(CssSelector);
		}

		if(!elementEvent) {
			console.error(`Imposible de charger l'évenement sur un noeud inéxistant. :`, elementEvent)
			return;
		}

		elementEvent.addEventListener(actionName, (event) => {
			if(functionCallback)
				functionCallback(event)
		})

		this.#evenement.count--
	}
}