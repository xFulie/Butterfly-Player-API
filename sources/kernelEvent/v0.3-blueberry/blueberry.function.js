class blueberryFunction extends blueberryMain {
	constructor(CssSelectorElement) { super(CssSelectorElement); }

	togglePlay() {		
		if(this.videoNode.paused) {
			this.userIsPlaying = true
			this.videoNode.play()
		}
		else {
			this.videoNode.pause()
			this.userIsPlaying = false
		}
	}

	toggleMute() {
		if(this.videoNode.volume > 0.0) {
			this.volume = 0;
		} else {
			this.volume = 1;
		}
	}

	toggleFullScreen() {
		this.video_resize()

		if(!this.inFullScreen) {
			if (this.ConstructorElement.requestFullscreen) {
				this.ConstructorElement.requestFullscreen();
			} else if (this.ConstructorElement.webkitRequestFullscreen) { /* Safari */
				this.ConstructorElement.webkitRequestFullscreen();
			} else if (this.ConstructorElement.msRequestFullscreen) { /* IE11 */
				this.ConstructorElement.msRequestFullscreen();
			}

			this.inFullScreen = true
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
			else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
			  else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			}
			else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}

			this.inFullScreen = false;
		}
	}

	video_resize() {
	    let videoHeight = this.videoNode.offsetHeight;
	    let videoWidth = this.videoNode.offsetWidth;

	    let windowWidth = this.ConstructorElement.offsetWidth;
	    let windowHeight = this.ConstructorElement.offsetHeight;

	    // Vérifiez si la vidéo est plus grande que le conteneur en hauteur
	    if (videoHeight > windowHeight) {
	        this.videoNode.style.height = "100%";
	        this.videoNode.style.width = "auto";
	    } else {
	        // La vidéo est plus petite ou de la même hauteur que le conteneur
	        this.videoNode.style.height = "100%"; // Ajustez cela selon vos besoins
	        this.videoNode.style.width = "auto";
	    }

	    // Vérifiez si la vidéo est plus grande que le conteneur en largeur
	    if (videoWidth > windowWidth) {
	        this.videoNode.style.width = "100%";
	        this.videoNode.style.height = "auto";
	    } else {
	        // La vidéo est plus petite ou de la même largeur que le conteneur
	        this.videoNode.style.width = "100%"; // Ajustez cela selon vos besoins
	        this.videoNode.style.height = "auto";
	    }
	}
}
