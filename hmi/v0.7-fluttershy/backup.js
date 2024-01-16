

/*
const Kernel = new Blueberry()

class Fluttershy {

	colorPlayer = "#fff"
	colorPlayerText = "#000"

	link_css_player = '//floagg.info/package/beta-stylesheet@v0.3-fluttershy'

	videoSrc = ''

	playerTitle = ''
	playerSubTitle = ''

	intro_skipping = null

	playerHTML = ''

	set(tags_contenaire_for_player, setting_obj) {
		Kernel.gContenaire = tags_contenaire_for_player
		this.userSet = setting_obj
		

		if(this.userSet.src !== undefined) {
			Kernel.vSrc = this.userSet.src
			this.videoSrc = this.userSet.src
		}

		/// INIT LISTE
		if(this.userSet.quality !== undefined) {
			Kernel.vAllQuality = this.userSet.quality
		}
		if(this.userSet.subtitle !== undefined) {
			Kernel.vAllSubtitle = this.userSet.subtitle
		}
		if(this.userSet.audio !== undefined) {
			Kernel.vAllAudio = this.userSet.audio

			if(!this.videoSrc) {
				this.videoSrc = this.userSet.audio[0].src
				let reg = this.userSet.audio[0].src
					.replace(/\$\(\{audio\}\)/g, this.userSet.audio[0].src)
					.replace(/\$\(\{quality\}\)/g, Kernel.vCurrentQuality)
					.replace(/\$\(\{extension\}\)/g, Kernel.vCurrentExtension)
				Kernel.vSrc = reg
			}
		}


		// tmp
		if(this.userSet.extension && this.userSet.extension[0]) {
			Kernel.vAllExtension = this.userSet.extension
		}
		// tmp


		/// INIT
		if(this.userSet.defaultQuality !== undefined) {
			Kernel.vCurrentQuality = this.userSet.defaultQuality
		}

		if(this.userSet.thumbnail !== undefined) {
			Kernel.vThumbnail = this.userSet.thumbnail
		}
		if(this.userSet.height && this.userSet.width) {
			Kernel.gSize = [this.userSet.height, this.userSet.width]
		}


		if(this.userSet.volume !== undefined) {
			Kernel.vVolume = this.userSet.volume
		}

		if(this.userSet.controls !== undefined) {
			Kernel.vControls = this.userSet.controls
		} else {
			this.userSet.controls = true;
		}


		Kernel.onChangeQuality = () => {
			let reg = this.videoSrc
				.replace(/\$\(\{audio\}\)/g, this.videoSrc)
				.replace(/\$\(\{quality\}\)/g, Kernel.vCurrentQuality)
				.replace(/\$\(\{extension\}\)/g, Kernel.vCurrentExtension)
				
			Kernel.vSrc = reg
		}

		Kernel.onChangeAudio = (e) => {
			this.videoSrc = e

			let reg = this.videoSrc
				.replace(/\$\(\{audio\}\)/g, this.videoSrc)
				.replace(/\$\(\{quality\}\)/g, Kernel.vCurrentQuality)
				.replace(/\$\(\{extension\}\)/g, Kernel.vCurrentExtension)
				
			Kernel.vSrc = reg
		}

		this.init_controlers()

		Kernel.onDurationChange = () => {
			Kernel.contenaire.querySelector('#videoDuration').textContent = intToTime(Kernel.duration)
		}
		Kernel.onLoad = () => {		
			this.event_controls()

			this.contentVolumeBar = Kernel.contenaire.querySelector('.volumechange-bar')
			this.volumeSize = Kernel.contenaire.querySelector('.volumechange-bar')
		}



		// Player Others
		if(this.userSet.title) {
			this.playerTitle = this.userSet.title
		}

		if(this.userSet.sub_title) {
			this.playerSubTitle = this.userSet.sub_title
		}

		if(this.userSet.intro_skipping) {
			this.intro_skipping = this.userSet.intro_skipping

			Kernel.onTimeUpdate = () => {
				if(
					(Kernel.vCurrentTime > this.intro_skipping[0])
					&&
					(Kernel.vCurrentTime < this.intro_skipping[1])
				) {
					Kernel.gClassRemove('player-button-is-skipped')
				} else {
					Kernel.gClassAdd('player-button-is-skipped')
				}
			}
		}
		
	}

	load() {
		document.querySelector('head').insertAdjacentHTML(
			'beforeend',
			`<style type="text/css">:root { --color-primary-player-butterfly: ${this.colorPlayer}; --color-text-player-butterfly: ${this.colorPlayerText}; }</style>`
		)
		document.querySelector('head').insertAdjacentHTML(
			'beforeend',
			`<link rel="stylesheet" type="text/css" href="${this.link_css_player}">`
		)

		Kernel.init()

		let html = `<div class="info_file">`
			html += `<h2>${this.playerSubTitle}</h2>`
			html += `<h1 id="filename">${this.playerTitle}</h1>`
		html += `</div>`
		Kernel.gAdding('beforeend', html, '.butterfly-player-controleurs .top')

		if(this.intro_skipping) {
			Kernel.addingContenaire = `<div class="player-button"><a id="skip_intro_video">Passer l'introduction</a></div>`;

			Kernel.addEvent('#skip_intro_video', 'click', () => {
				Kernel.vCurrentTime = this.intro_skipping[1]
			}, true)
		}
	}

	event_controls() {

		console.log('Loading')

		Kernel.onPlay = () => {
			Kernel.gClassAdd('video-is-play')
			Kernel.gClassRemove('video-is-pause')
			Kernel.gClassRemove('video-ended')
			Kernel.gClassRemove('video-is-error')

			if(!Kernel.gClassContains('video-playing'))
				Kernel.gClassAdd('video-playing')

			Kernel.contenaire.querySelector('#player_button_pause').innerHTML = iconPause

			this.updateBar(null, Kernel.vVolume);
		}
		Kernel.onPause = () => {
			Kernel.gClassRemove('video-is-play')
			Kernel.gClassAdd('video-is-pause')

			Kernel.contenaire.querySelector('#player_button_pause').innerHTML = iconPlay
		}

		Kernel.onVolumeChange = () => {
			if(Kernel.vVolume > 0.0) {
				Kernel.contenaire.querySelector('#player_button_muted').innerHTML = iconUnMute
			} else {
				Kernel.contenaire.querySelector('#player_button_muted').innerHTML = iconMute
			}
		}

		Kernel.onEnded = () => {
			Kernel.gClassAdd('video-ended')

			if(Kernel.gClassContains('video-playing'))
				Kernel.gClassRemove('video-playing')

			Kernel.contenaire.querySelector('#player_button_pause').innerHTML = iconReresh
		}
		Kernel.onError = () => {
			Kernel.gClassRemove('video-is-play')
			Kernel.gClassAdd('video-is-pause')
			Kernel.gClassAdd('video-is-error')
			//Kernel.#loadError()
			Kernel.contenaire.querySelector('#player_button_pause').innerHTML = iconPlay
		}


		let infoBull = Kernel.contenaire.querySelector('.infobull-progressbar')
		let progressBarContenaire = Kernel.contenaire.querySelector('.progress-bar')
		let progressBarReaded = progressBarContenaire.querySelector('.readed')

		Kernel.onTimeupdate = () => {
			let videoCurrentTime = (Kernel.vCurrentTime / Kernel.duration) * 100;
			progressBarReaded.style.width = videoCurrentTime+"%"

			Kernel.contenaire.querySelector('#videoCurrentTime').textContent =  intToTime(Kernel.vCurrentTime)
		}

		
		Kernel.addEvent('#player_button_pause', 'click', () => {
			Kernel.TogglePlay()
		}, true)
				
		Kernel.addEvent('#player_button_muted', 'click', () => {
			Kernel.ToggleMute()
		}, true)

		Kernel.addEvent(Kernel.contenaire.querySelector('#player_button_fullscreen'), 'click', () => {
			Kernel.toggleFullScreen()
		})

		Kernel.onProgress = () => {
			Kernel.gClassRemove('video-is-error')
		}

		Kernel.addEvent(Kernel.contenaire.querySelector('#setting-video-icon'), 'click', () => {
			if(Kernel.onDisplaySettings)
		    	Kernel.onDisplaySettings(Kernel.contenaire.classList.contains('settings'))

			if(Kernel.contenaire.classList.contains('settings')) {
				Kernel.contenaire.classList.remove('settings')
					
				kicked_settings()
			}
			else
				Kernel.contenaire.classList.add('settings')
		})

		function kicked_settings() {
			Kernel.contenaire.querySelector('.option-player-video-content.right #menu-title').innerHTML = ``
			if(Kernel.contenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
				Kernel.contenaire.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'
				Kernel.contenaire.querySelector('.option-player-video-translate').classList.remove('focus')

				let allB = Kernel.contenaire.querySelectorAll('.option-player-video-content.right .setting-info')
				allB.forEach((e) => {
					e.style.display = "none"
				})
			}
		}


		let intervalHide = null;

		function setIntervalMouseInPlayer(e) {
			clearInterval(intervalHide);
			intervalHide = setInterval(() => {
				if(e.visibilityControler) {
					e.contenaire.classList.remove('mouse-in-player')
					e.visibilityControler = false
				}
				e.visibilityControler = false

				clearInterval(intervalHide);
			}, 5000)
		}

		Kernel.addEvent(Kernel.contenaire, 'mouseleave', () => {
			if(Kernel.contenaire.classList.contains('player-error'))
				return;

			Kernel.contenaire.classList.remove('mouse-in-player')
			Kernel.visibilityControler = false

			clearInterval(intervalHide);
		})
		Kernel.addEvent(Kernel.contenaire, 'mousemove', () => {
			if(Kernel.contenaire.classList.contains('error'))
				return;

			Kernel.contenaire.classList.add('mouse-in-player')
			Kernel.visibilityControler = true

			setIntervalMouseInPlayer(this)
		})
		Kernel.addEvent(Kernel.contenaire.querySelector('.butterfly-player-controleurs .bottom'), 'mouseenter', () => {
			clearInterval(intervalHide);
		})
		Kernel.addEvent(Kernel.contenaire.querySelector('.butterfly-player-controleurs .bottom'), 'mouseleave', () => {
			setIntervalMouseInPlayer(this)
		})





		Kernel.addEvent(Kernel.contenaire, 'click', (e) => {
			switch(e.target.nodeName) {
				case 'h1':
				case 'A':
				case 'BUTTON':
				case 'SPAN':
					return
					break;
			}

			if(Kernel.contenaire.classList.contains('settings')) {				
				if(Kernel.contenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
					kicked_settings()
					return
				}
				Kernel.contenaire.classList.remove('settings')
			}

			Kernel.TogglePlay()
		})

		Kernel.addEvent(Kernel.contenaire.querySelector('.volumechange-bar'), 'mousedown', (ev) => {
			this.volumeDrag = true;
			this.updateBar(ev.clientX);
		});
		document.addEventListener('mousemove', (ev) => {
			if(this.volumeDrag){
				this.updateBar(ev.clientX);
			}
		});
		document.addEventListener('mouseup', (ev) => {
			this.volumeDrag = false;
		});





		Kernel.addEvent(progressBarContenaire, 'mouseenter', () => {
			progressBarContenaire.addEventListener('mousemove', (e) => {
				let progressWidth = progressBarContenaire.offsetWidth


				var rect = progressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
				let x = e.clientX - rect.left;
				var time = (x/progressWidth) * Kernel.duration;

				infoBull.querySelector('.timecode').textContent = intToTime(time)

				if(Kernel.seek_file)
					infoBull.querySelector('video').currentTime = time

				infoBull.style.left = (x)+"px"
				infoBull.style.display = 'block'
			})
		})

		Kernel.addEvent(progressBarContenaire, 'mousedown', (e) => {
			let progressWidth = progressBarContenaire.offsetWidth


			var rect = progressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
			let x = e.clientX - rect.left;
			var time = (x/progressWidth) * Kernel.duration;

			Kernel.vCurrentTime = time
		})

		Kernel.addEvent(progressBarContenaire, 'mouseleave', () => {
			infoBull.style.display = 'none'
		})


		return;

		/* */

		/* //// TMP
		

		

		*

		// Mouvement
		

		Kernel.addEvent(Kernel.contenaire.querySelector('.icon-button#less-font-st'), 'click', () => {
			Kernel.fontSizeSubtitle--

			Kernel.contenaire.querySelector('#font-st').textContent = Kernel.fontSizeSubtitle

			Kernel.contenaire.querySelector('.trackText').style.fontSize = Kernel.fontSizeSubtitle+'px'
			Kernel.contenaire.querySelector('.trackText').style.lineHeight = (Kernel.fontSizeSubtitle+5)+'px'
		})

		Kernel.addEvent(Kernel.contenaire.querySelector('.icon-button#plus-font-st'), 'click', () => {
			Kernel.fontSizeSubtitle++

			Kernel.contenaire.querySelector('#font-st').textContent = Kernel.fontSizeSubtitle

			Kernel.contenaire.querySelector('.trackText').style.fontSize = Kernel.fontSizeSubtitle+'px'
			Kernel.contenaire.querySelector('.trackText').style.lineHeight = (Kernel.fontSizeSubtitle+5)+'px'
		})



		Kernel.onPressKey = (event, keyName, ctrlKey, altKey) => {

		}
	}

	init_controlers() {

		this.playerHTML = `<div class="butterfly-player-controleurs">`

			this.playerHTML += `<div class="top">`
			this.playerHTML += `</div>`
			this.playerHTML += `<div class="bottom">`

				this.playerHTML += `<div class="left">`
					this.playerHTML += `<ul>`
						this.playerHTML += `<li><button class="icon" id="player_button_pause">${iconPlay}</button></li>`
						this.playerHTML += `<li>`
							this.playerHTML += `<button class="icon" id="player_button_muted">${iconMute}</button>`
							this.playerHTML += `<span class="volumechange-bar"><span class="volumechange-bar-content"></span></span>`
						this.playerHTML += `</li>`
					this.playerHTML += `</ul>`
				this.playerHTML += `</div>`

				this.playerHTML += `<div class="center">`
					this.playerHTML += `<div class="progress-bar-contenaire-relative">`
						this.playerHTML += `<span class="infobull-progressbar">`
							if(this.seek_file) {
								this.playerHTML += `<video src="${this.seek_file}" muted width="200px"></video>`
							}
							this.playerHTML += `<span class="timecode">00:00</span>`
						this.playerHTML += `</span>`

						this.playerHTML += `<span class="wf-display progress-bar">`
							this.playerHTML += `<span class="buffered"></span>`
							this.playerHTML += `<span class="readed"></span>`
						this.playerHTML += `</span>`
					this.playerHTML += `</div>`
				this.playerHTML += `</div>`

				this.playerHTML += `<div class="right">`
					this.playerHTML += `<ul>`
						this.playerHTML += `<li>`
							this.playerHTML += `<div class="info-video">`
								this.playerHTML += `<span id="videoCurrentTime">00:00</span>`
								this.playerHTML += `<span>/</span>`
								this.playerHTML += `<span id="videoDuration">00:00</span>`
							this.playerHTML += `</div>`
						this.playerHTML += `</li>`
						this.playerHTML += `<li><button class="icon setting-button-icon" id="setting-video-icon">${iconSetting}</button></li>`
						this.playerHTML += `<li><button class="icon" id="player_button_fullscreen">${iconFullscreen}</button></li>`
					this.playerHTML += `</ul>`
				this.playerHTML += `</div>`

			this.playerHTML += `</div>`

		this.playerHTML += `</div>`



		this.playerHTML += `<div class="option-video">`
			this.playerHTML += `<section class="option-player-video">`
				
				this.playerHTML += `<section class="option-player-video-translate">`

				this.playerHTML += `<section class="option-player-video-content left">`
					//this.playerHTML += this.#vSettings.htmlQuality
					//this.playerHTML += this.#vSettings.htmlAudio
					//this.playerHTML += this.#vSettings.htmlSubtitle
					//this.playerHTML += this.#vSettings.htmlPlaybackRate
					this.playerHTML += `<div class="option-button quality-changer">`
									+`<span class="current qulity-current" onClick="Kernel.setting_get('V${systeme_version} ${systeme_name} ${systeme_environement}', this.parentNode, 'focus', 'legal-notice', '')">`
										+`<span class="title">Information sur le player</span>`
									+`</span>`
							+`</div>`
				this.playerHTML += `</section>`
				this.playerHTML += `<section class="option-player-video-content right">`
					this.playerHTML += `<section class="setting-head">`
						this.playerHTML += `<div class="button-icon">${iconLess}</div>`
						this.playerHTML += `<div id="menu-title">Menu</div>`
					this.playerHTML += `</section>`
					//this.playerHTML += this.#vSettings.htmlQualityButtons
					//this.playerHTML += this.#vSettings.htmlAudioButtons
					//this.playerHTML += this.#vSettings.htmlSubtitleButtons
					//this.playerHTML += this.#vSettings.htmlPlaybackRateButtons
					this.playerHTML += `<div class="setting-info" id="legal-notice">`
						this.playerHTML += `<p>Butterfly Player API</p>`
						this.playerHTML += `<p>Kernel V${kernel_version} ${kernel_name} ${kernel_environement}</p>`
						this.playerHTML += `<p>Player V${systeme_version} ${systeme_name} ${systeme_environement}</p>`
						this.playerHTML += `<p>By 'heart_butterfly' - Floagg Entreprise EI</p>`
					this.playerHTML += `</div>`
				this.playerHTML += `</section>`

				this.playerHTML += `</section>`

			this.playerHTML += `</section>`
		this.playerHTML += `</div>`

		Kernel.contenaire.innerHTML += this.playerHTML
	}

	updateBar(x, vol) {
		var percentage;
		//if only volume have specificed
		//then direct update volume
		if (vol !== undefined) {
			percentage = vol * 100;
		} else {
			var rect = this.contentVolumeBar.getBoundingClientRect();

			var position = x - rect.left;
			percentage = 100 * position / this.contentVolumeBar.clientWidth;
		}

		if (percentage > 100) {
		    percentage = 100;
		}
		if (percentage < 0) {
			percentage = 0;
		}

		if(!this.contentVolumeBar)
			return;

		//update volume bar and video volume
		Kernel.vVolume = percentage / 100;
		this.contentVolumeBar.querySelector('span').style.width = percentage+"%"
	}
} */