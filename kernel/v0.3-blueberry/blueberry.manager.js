class blueberryManager extends blueberryConfig {

	constructor(CssSelectorElement) {
		super(CssSelectorElement);
	}

	create_element() {
		let videoCreateElement = document.createElement('video');
		videoCreateElement.id = 'video-player';
		videoCreateElement.src = this.videoElement.src;
		videoCreateElement.autoplay = this.videoElement.autoplay;
		videoCreateElement.muted = this.videoElement.muted;
		videoCreateElement.style.width = "100%"

		this.ConstructorElement.appendChild(videoCreateElement);
		this.videoElement.node = this.ConstructorElement.querySelector('video#video-player')

		this.arraySubtitle.forEach((e) => {
			videoCreateElement.insertAdjacentHTML('beforeend', `<track src="${e.url}" data-name="${e.name}" />`)
		})

		this.videoElement.node.volume = this.videoElement.volume

		this.ConstructorElement.querySelector('video#video-player')

		let thumbnailCreateElement = document.createElement('img');
		thumbnailCreateElement.id = 'video-thumbnail';
		thumbnailCreateElement.src = this.videoElement.src_thumbnail;
		this.ConstructorElement.appendChild(thumbnailCreateElement);

		this.videoElement.nodeThumbnail = this.ConstructorElement.querySelector('img#video-thumbnail')
	}

	load_manager() {
		this.create_element()
		this.kernelEvenement_init()
	}

	videoReload() {
		this.videoNode.src = this.currentSrc
		this.videoNode.currentTime = this.currentTime
	}
}