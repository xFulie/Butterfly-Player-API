class FluttershyHMI extends FluttershyMain {
	create(CssSelectorElement, SettingsObject) { this.init(CssSelectorElement, SettingsObject); }
	set(CssSelectorElement, SettingsObject) { this.init(CssSelectorElement, SettingsObject); }

	global_controls() {
		document.querySelector('head').insertAdjacentHTML(
			'beforeend',
			`<link rel="stylesheet" type="text/css" href="${this.link_css_player}">`
		)
		document.querySelector('head').insertAdjacentHTML(
			'beforeend',
			`<style type="text/css">:root { --color-primary-player-butterfly: ${this.colorPlayer}; --color-text-player-butterfly: ${this.colorPlayerText}; }</style>`
		)

		this.Kernel.ConstructorElement.classList.add('butterfly-player-api', 'blueberry-player-kernel')

		this.playerHTML = `<div class="butterfly-player-controleurs">`

			this.playerHTML += `<div class="top">`
			if(this.playerSubTitle || this.playerTitle) {
				this.playerHTML += `<div class="info_file">`
					this.playerHTML += `<h2>${this.playerSubTitle}</h2>`
					this.playerHTML += `<h1 id="filename">${this.playerTitle}</h1>`
				this.playerHTML += `</div>`
			}
			this.playerHTML += `</div>`
			this.bar_controls()

		this.playerHTML += `</div>`
		this.playerHTML += `<div class="trackText" style="font-size: ${this.fontSizeSubtitle}px; line-height: ${this.fontSizeSubtitle+5}px;"></div>`

		this.option_video_content()


		this.Kernel.ConstructorElement.insertAdjacentHTML('afterbegin', this.playerHTML)
	}

	bar_controls() {
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
	}

	option_video_content() {
		this.playerHTML += `<div class="option-video">`
			this.playerHTML += `<section class="option-player-video">`
				
				this.playerHTML += `<section class="option-player-video-translate">`

				this.playerHTML += `<section class="option-player-video-content left">`
					this.playerHTML += this.htmlQuality
					this.playerHTML += this.htmlAudio
					this.playerHTML += this.htmlSubtitle
					this.playerHTML += this.htmlPlaybackRate
					this.playerHTML += `<div class="button-get-settings option-button quality-changer" data-get="legal-notice" data-name="V${systeme_version} ${systeme_name} ${systeme_environement}">`
									+`<span class="current qulity-current">`
										+`<span class="title">Information sur le player</span>`
									+`</span>`
							+`</div>`
				this.playerHTML += `</section>`
				this.playerHTML += `<section class="option-player-video-content right">`
					this.playerHTML += `<section class="setting-head">`
						this.playerHTML += `<div class="button-icon">${iconLess}</div>`
						this.playerHTML += `<div id="menu-title">Menu</div>`
					this.playerHTML += `</section>`
					this.playerHTML += this.htmlQualityButtons
					this.playerHTML += this.htmlAudioButtons
					this.playerHTML += this.htmlSubtitleButtons
					this.playerHTML += this.htmlPlaybackRateButtons
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
	}

	evement_controls() {
		let infoBull = this.Kernel.ConstructorElement.querySelector('.infobull-progressbar')
		let progressBarContenaire = this.Kernel.ConstructorElement.querySelector('.progress-bar')
		let progressBarReaded = progressBarContenaire.querySelector('.readed')


		this.Kernel.addEvent(window, 'keydown', (e) => {
			switch(e.key) {
				case 'z':
				case 'ArrowRight':
					e.preventDefault()
					this.Kernel.currentTime = this.Kernel.currentTime + 5
					break;
				case 'a':
				case 'ArrowLeft':
					e.preventDefault()
					this.Kernel.currentTime = this.Kernel.currentTime + 5
					break;

				case 'k':
				case ' ':
					e.preventDefault()
					this.Kernel.togglePlay()
					break;

				case 'f':
					e.preventDefault()
					this.Kernel.toggleFullScreen()
					break;

				case 'm':
					e.preventDefault()
					this.Kernel.toggleMute()
					break;
			}
		})

		this.Kernel.onLoad = () => {
			if(this.userSet.volume !== undefined) {
				//this.Kernel.volume = this.userSet.volume;
				this.updateBar(null, this.userSet.volume)
			}
			this.updateBar(null, this.Kernel.volume, false)

			if(this.Kernel.volume > 0.0) {
				this.Kernel.ConstructorElement.querySelector('#player_button_muted').innerHTML = iconUnMute
			} else {
				this.Kernel.ConstructorElement.querySelector('#player_button_muted').innerHTML = iconMute
			}
		}

		this.Kernel.onVolumechange = () => {
			if(this.Kernel.volume > 0.0) {
				this.Kernel.ConstructorElement.querySelector('#player_button_muted').innerHTML = iconUnMute
			} else {
				this.Kernel.ConstructorElement.querySelector('#player_button_muted').innerHTML = iconMute
			}
		}

		this.Kernel.onDurationchange = () => {
			this.Kernel.ConstructorElement.querySelector('#videoDuration').textContent = intToTime(this.Kernel.duration)
		}

		this.Kernel.onTimeupdate = () => {
			this.currentTime = this.Kernel.currentTime
			this.Kernel.ConstructorElement.querySelector('#videoCurrentTime').textContent = intToTime(this.Kernel.currentTime)

			let videoCurrentTime = (this.Kernel.currentTime / this.Kernel.duration) * 100;
			progressBarReaded.style.width = videoCurrentTime+"%"
		}

		this.Kernel.onPlay = () => {
			this.Kernel.ConstructorElement.classList.add('video-is-play')
			this.Kernel.ConstructorElement.classList.remove('video-is-pause')
			this.Kernel.ConstructorElement.classList.remove('video-ended')
			this.Kernel.ConstructorElement.classList.remove('video-is-error')

			if(!this.Kernel.ConstructorElement.classList.contains('video-playing'))
				this.Kernel.ConstructorElement.classList.add('video-playing')

			this.Kernel.ConstructorElement.querySelector('#player_button_pause').innerHTML = iconPause

			//this.updateBar(null, Kernel.vVolume);
		}
		this.Kernel.onPause = () => {
			this.Kernel.ConstructorElement.classList.remove('video-is-play')
			this.Kernel.ConstructorElement.classList.add('video-is-pause')

			this.Kernel.ConstructorElement.querySelector('#player_button_pause').innerHTML = iconPlay
		}

		let intervalHide = null;
		function setIntervalMouseInPlayer(e, elem) {
			clearInterval(intervalHide);
			intervalHide = setInterval(() => {
				elem.classList.remove('mouse-in-player')
				e.visibilityControler = false

				clearInterval(intervalHide);
			}, 5000)
		}

		this.Kernel.addEvent(this.Kernel.ConstructorElement, 'mouseleave', () => {
			if(this.Kernel.ConstructorElement.classList.contains('player-error'))
				return;

			this.Kernel.ConstructorElement.classList.remove('mouse-in-player')
			this.Kernel.visibilityControler = false

			clearInterval(intervalHide);
		})
		this.Kernel.addEvent(this.Kernel.ConstructorElement, 'mousemove', () => {
			if(this.Kernel.ConstructorElement.classList.contains('error'))
				return;

			this.Kernel.ConstructorElement.classList.add('mouse-in-player')
			this.Kernel.visibilityControler = true

			setIntervalMouseInPlayer(this, this.Kernel.ConstructorElement)
		})
		this.Kernel.addEvent(this.Kernel.ConstructorElement.querySelector('.butterfly-player-controleurs .bottom'), 'mouseenter', () => {
			clearInterval(intervalHide);
		})
		this.Kernel.addEvent(this.Kernel.ConstructorElement.querySelector('.butterfly-player-controleurs .bottom'), 'mouseleave', () => {
			setIntervalMouseInPlayer(this, this.Kernel.ConstructorElement)
		})



		this.Kernel.addEvent(progressBarContenaire, 'mouseenter', () => {
			progressBarContenaire.addEventListener('mousemove', (e) => {
				let progressWidth = progressBarContenaire.offsetWidth


				var rect = progressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
				let x = e.clientX - rect.left;
				var time = (x/progressWidth) * this.Kernel.duration;

				infoBull.querySelector('.timecode').textContent = intToTime(time)

				if(this.Kernel.seek_file)
					infoBull.querySelector('video').currentTime = time

				infoBull.style.left = (x)+"px"
				infoBull.style.display = 'block'
			})
		})

		this.Kernel.addEvent(progressBarContenaire, 'mousedown', (e) => {
			let progressWidth = progressBarContenaire.offsetWidth


			var rect = progressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
			let x = e.clientX - rect.left;
			var time = (x/progressWidth) * this.Kernel.duration;

			this.Kernel.currentTime = time
		})

		this.Kernel.addEvent(progressBarContenaire, 'mouseleave', () => {
			infoBull.style.display = 'none'
		})


		this.Kernel.addEvent('.volumechange-bar', 'mousedown', (ev) => {
			this.volumeDrag = true;
			this.updateBar(ev.clientX);
		}, true);

		this.Kernel.addEvent(document, 'mousemove', (ev) => {
			if(this.volumeDrag){
				this.updateBar(ev.clientX);
			}
		});
		this.Kernel.addEvent(document, 'mouseup', (ev) => {
			this.volumeDrag = false;
		});


		this.Kernel.addEvent(this.Kernel.ConstructorElement, 'click', (e) => {
			switch(e.target.nodeName) {
				case 'h1':
				case 'A':
				case 'BUTTON':
				case 'SPAN':
					return
					break;
			}
			if(this.Kernel.ConstructorElement.classList.contains('settings')) {
					
				let r = this.kicked_settings()
				if(r)
					return;

				this.Kernel.ConstructorElement.classList.remove('settings')
			}
			//console.log(this.Kernel.videoNode.parentNode)
			this.Kernel.togglePlay()
		})

		this.Kernel.addEvent('#player_button_pause', 'click', (e) => {
			this.Kernel.togglePlay()
		}, true)

		this.Kernel.addEvent('#player_button_muted', 'click', (e) => {
			this.Kernel.toggleMute()
		}, true)

		this.Kernel.addEvent('#player_button_fullscreen', 'click', (e) => {
			this.Kernel.toggleFullScreen()
		}, true)

		let allButtonSettoing = this.Kernel.ConstructorElement.querySelectorAll('.button-get-settings')
		this.Kernel.addEvent('#setting-video-icon', 'click', (e) => {
			if(this.Kernel.ConstructorElement.classList.contains('settings')) {
				this.Kernel.ConstructorElement.classList.remove('settings')
					
				this.kicked_settings()
				return
			}
			
			this.Kernel.ConstructorElement.classList.add('settings')

			allButtonSettoing.forEach((element) => {
				this.Kernel.addEvent(element, 'click', (e) => {
					this.Kernel.ConstructorElement.querySelector('.option-player-video-translate').classList.add('focus')

					let element_changer = element.parentNode.parentNode
					let classUl = element.dataset.get

					if(!element_changer.querySelector(`.option-player-video-content.right #`+classUl))
						return

					element_changer.querySelector(`.option-player-video-content.right #`+classUl).style.display = "block"
					element_changer.querySelector('.option-player-video-content.right #menu-title').innerHTML = `<span>${element.dataset.name}</span><span class="generate-change">${element.dataset.current}</span>`
					element_changer.style.transform = 'translateX(-'+element_changer.offsetWidth+'px)'
				})
			})
		}, true)

		this.load_evement_settings()
	}

	kicked_settings() {
		let allButtonSettoing = this.Kernel.ConstructorElement.querySelectorAll('.button-get-settings')
		let allB = this.Kernel.ConstructorElement.querySelectorAll('.option-player-video-content.right .setting-info')

		if(this.Kernel.ConstructorElement.querySelectorAll('.option-player-video-translate.focus').length > 0) {
			this.Kernel.ConstructorElement.querySelector('.option-player-video-translate').classList.remove('focus')
			this.Kernel.ConstructorElement.querySelector('.option-player-video-content.right #menu-title').innerHTML = ``
			this.Kernel.ConstructorElement.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'

			allB.forEach((e) => {
				e.style.display = "none"
			})

			return true;
		}

		this.Kernel.ConstructorElement.classList.remove('settings')	
		allButtonSettoing.forEach((element) => {
			this.Kernel.removeEvent(element, 'click', () => {})
		})

		return false;
	}
}

const Player = new FluttershyHMI()