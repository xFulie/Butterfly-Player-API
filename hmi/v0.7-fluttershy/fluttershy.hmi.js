class FluttershyHMI extends FluttershyMain {
	create(CssSelectorElement, SettingsObject) { this.init(CssSelectorElement, SettingsObject); }
	set(CssSelectorElement, SettingsObject) { this.init(CssSelectorElement, SettingsObject); }

	global_controls() {
		this.kernel.ConstructorElement.classList.add('butterfly-player-api', 'blueberry-player-kernel')

		document.querySelector('head').insertAdjacentHTML(
			'beforeend',
			`<link rel="stylesheet" type="text/css" href="${this.link_css_player}">
			<style type="text/css">:root { --color-primary-player-butterfly: ${this.colorPlayer}; --color-text-player-butterfly: ${this.colorPlayerText}; }</style>`
		)

		const myHtml = html("div", {class: "butterfly-player-controleurs"},
			html("div", {class: "top"}),
			html("div", {class: "bottom"},
				html("div", {class: "left"}, 
					html("ul", {},
						html("li", {},
							html("button", {id: "player_button_pause"}, iconPlay)
						),
						html("li", {},
							html("button", {id: "player_button_muted"}, iconMute),
							html("span", {class: "volumechange-bar"},
								html("span", {class: "volumechange-bar-content"})
							)
						)
					)
				),
				html("div", {class: "center"},
					html("div", {class: "progress-bar-contenaire-relative"},
						html("span", {class: "infobull-progressbar"},
							html("span", {class: "timecode"})
						),
						html("span", {class: "wf-display progress-bar"},
							html("span", {class: "buffered"}),
							html("span", {class: "readed"})
						)
					)
				),
				html("div", {class: "right"},
					html("ul", {class: "center"},
						html("li", {},
							html("div", {class: "info-video"},
								html("span", {id: "videoCurrentTime"}, "00:00"),
								html("span", {}, "/"),
								html("span", {id: "videoDuration"}, "00:00")
							)
						),
						html("li", {},
							html("button", {class: "icon setting-video-icon", id: "setting-video-icon"}, iconSetting)
						),
						html("li", {},
							html("button", {class: "icon", id: "player_button_fullscreen"}, iconFullscreen)
						)
					)
				)
			),
			html("div", {class: "trackText", style: `font-size: ${this.fontSizeSubtitle}px; line-height: ${this.fontSizeSubtitle+5}px;`}),
			html("div", {class: "option-video"},
				html("section", {class: "option-player-video"},
					html("section", {class: "option-player-video-translate"},
						html("section", {class: "option-player-video-content left"},
							this.htmlQuality,
							this.htmlAudio,
							this.htmlSubtitle,
							this.htmlPlaybackRate,
							html("div", {class: "button-get-settings option-button", 'data-get': "legal-notice", 'data-name': `V${systeme_version} ${systeme_name} ${systeme_environement}`},
								html("span", {class: "current qulity-current"},
									html("span", {class: "title"}, "Information sur le player"),
									html("span", {class: "generate-change"})
								)
							),
						),
						html("section", {class: "option-player-video-content right"},
							html("section", {class: "setting-head"},
								html("div", {class: "button-icon"}, iconLess),
								html("div", {id: "menu-title"}, "Menu")
							),
							this.htmlQualityButtons,
							this.htmlAudioButtons,
							this.htmlSubtitleButtons,
							this.htmlPlaybackRateButtons,
							html("section", {class: "setting-info", id: "legal-notice"},
								html("p", {}, "Butterfly Player API"),
								html("p", {}, `Kernel V${kernel_version} ${kernel_name} ${kernel_environement}`),
								html("p", {}, `Player V${systeme_version} ${systeme_name} ${systeme_environement}`),
								html("p", {}, `By 'heart_butterfly' - Floagg Entreprise EI`)
							)
						)
					)
				)
			) 
		)

		if(this.playerSubTitle || this.playerTitle) {
			myHtml.querySelector('.top').appendChild(html("div", {class: "info_file"},
				html("h2", {}, this.playerSubTitle),
				html("h1", {id: "filename"}, this.playerTitle)
			))
		}

		this.kernel.ConstructorElement.appendChild(myHtml)
	}

	option_video_content() {
					this.playerHTML += `< class="" data-get="legal-notice" data-name="">`
									+`<span class="current qulity-current">`
										+`<span class="title"></span>`
									+`</span>`
	}

	evement_controls() {
		let infoBull = this.kernel.getElement('.infobull-progressbar')
		let progressBarContenaire = this.kernel.getElement('.progress-bar')
		let progressBarReaded = progressBarContenaire.querySelector('.readed')

		function verify_volume(kernel) {
			if(kernel.volume > 0.0) {
				kernel.getElement('#player_button_muted').innerHTML = iconUnMute
			} else {
				kernel.getElement('#player_button_muted').innerHTML = iconMute
			}
		}


		/*
		 *
		 * Appel à des evenement du Kernel
		 *
		 *
		 */ 
		
		this.kernel.button('#player_button_pause', 'togglePlay')
		this.kernel.button('#player_button_muted', 'toggleMute')
		this.kernel.button('#player_button_fullscreen', 'toggleFullScreen')

		this.kernel.keydown(['z', 'ArrowRight'], () => { this.kernel.upateTime = this.kernel.currentTime + 5 })
		this.kernel.keydown(['a', 'ArrowLeft'], () => { this.kernel.upateTime = this.kernel.currentTime - 5 })
		this.kernel.keydown(['k', ' '], () => { this.kernel.togglePlay() })
		this.kernel.keydown('f', () => { this.kernel.toggleFullScreen() })
		this.kernel.keydown('m', () => { this.kernel.toggleMute() })

		this.kernel.onPlay = () => { this.kernel.getElement('#player_button_pause').innerHTML = iconPause }
		this.kernel.onPause = () => { this.kernel.getElement('#player_button_pause').innerHTML = iconPlay }
		this.kernel.onVolumechange = () => { verify_volume(this.kernel) }
		this.kernel.onDurationchange = () => { this.kernel.updateText('#videoDuration', intToTime(this.kernel.duration)) }

		this.kernel.onLoad = () => {
			this.updateBar(null, this.kernel.volume, false)
			verify_volume(this.kernel)
		}

		this.kernel.onTimeupdate = () => {
			this.kernel.updateText('#videoCurrentTime', intToTime(this.kernel.currentTime))
			let progressSize = (this.kernel.currentTime / this.kernel.duration) * 100;
			progressBarReaded.style.width = progressSize+"%"
		}

		this.kernel.addEvent(this.kernel.ConstructorElement, 'click', (e) => {
			switch(e.target.nodeName) {
				case 'h1':
				case 'A':
				case 'BUTTON':
				case 'SPAN':
					return
					break;
			}
			if(this.kernel.ConstructorElement.classList.contains('settings')) {
					
				let r = this.kicked_settings()
				if(r)
					return;

				this.kernel.ConstructorElement.classList.remove('settings')
			}
			//console.log(this.kernel.videoNode.parentNode)
			this.kernel.togglePlay()
		})

		let allButtonSettoing = this.kernel.ConstructorElement.querySelectorAll('.button-get-settings')
		this.kernel.addEvent('#setting-video-icon', 'click', (e) => {
			if(this.kernel.ConstructorElement.classList.contains('settings')) {
				this.kernel.ConstructorElement.classList.remove('settings')
					
				this.kicked_settings()
				return
			}
			
			this.kernel.ConstructorElement.classList.add('settings')

			allButtonSettoing.forEach((element) => {
				this.kernel.addEvent(element, 'click', (e) => {
					this.kernel.getElement('.option-player-video-translate').classList.add('focus')

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






		let intervalHide = null;
		function setIntervalMouseInPlayer(e, elem) {
			clearInterval(intervalHide);
			intervalHide = setInterval(() => {
				elem.classList.remove('mouse-in-player')
				e.visibilityControler = false

				clearInterval(intervalHide);
			}, 5000)
		}

		this.kernel.addEvent(this.kernel.ConstructorElement, 'mouseleave', () => {
			if(this.kernel.ConstructorElement.classList.contains('player-error'))
				return;

			this.kernel.ConstructorElement.classList.remove('mouse-in-player')
			this.kernel.visibilityControler = false

			clearInterval(intervalHide);
		})
		this.kernel.addEvent(this.kernel.ConstructorElement, 'mousemove', () => {
			if(this.kernel.ConstructorElement.classList.contains('error'))
				return;

			this.kernel.ConstructorElement.classList.add('mouse-in-player')
			this.kernel.visibilityControler = true

			setIntervalMouseInPlayer(this, this.kernel.ConstructorElement)
		})
		this.kernel.addEvent(this.kernel.getElement('.butterfly-player-controleurs .bottom'), 'mouseenter', () => {
			clearInterval(intervalHide);
		})
		this.kernel.addEvent(this.kernel.getElement('.butterfly-player-controleurs .bottom'), 'mouseleave', () => {
			setIntervalMouseInPlayer(this, this.kernel.ConstructorElement)
		})



		this.kernel.addEvent(progressBarContenaire, 'mouseenter', () => {
			progressBarContenaire.addEventListener('mousemove', (e) => {
				let progressWidth = progressBarContenaire.offsetWidth


				var rect = progressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
				let x = e.clientX - rect.left;
				var time = (x/progressWidth) * this.kernel.duration;

				infoBull.querySelector('.timecode').textContent = intToTime(time)

				if(this.kernel.seek_file)
					infoBull.querySelector('video').currentTime = time

				infoBull.style.left = (x)+"px"
				infoBull.style.display = 'block'
			})
		})

		this.kernel.addEvent(progressBarContenaire, 'mousedown', (e) => {
			let progressWidth = progressBarContenaire.offsetWidth


			var rect = progressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
			let x = e.clientX - rect.left;
			var time = (x/progressWidth) * this.kernel.duration;

			this.kernel.upateTime = time
		})

		this.kernel.addEvent(progressBarContenaire, 'mouseleave', () => {
			infoBull.style.display = 'none'
		})


		this.kernel.addEvent('.volumechange-bar', 'mousedown', (ev) => { this.volumeDrag = true; this.updateBar(ev.clientX); }, true);
		this.kernel.addEvent(document, 'mousemove', (ev) => { if(this.volumeDrag){ this.updateBar(ev.clientX); } });
		this.kernel.addEvent(document, 'mouseup', (ev) => { this.volumeDrag = false; });

		this.load_evement_settings()
	}

	kicked_settings() {
		let allButtonSettoing = this.kernel.ConstructorElement.querySelectorAll('.button-get-settings')
		let allB = this.kernel.ConstructorElement.querySelectorAll('.option-player-video-content.right .setting-info')

		if(this.kernel.ConstructorElement.querySelectorAll('.option-player-video-translate.focus').length > 0) {
			this.kernel.getElement('.option-player-video-translate').classList.remove('focus')
			this.kernel.getElement('.option-player-video-content.right #menu-title').innerHTML = ``
			this.kernel.getElement('.option-player-video-translate').style.transform = 'translateX(0px)'

			allB.forEach((e) => {
				e.style.display = "none"
			})

			return true;
		}

		this.kernel.ConstructorElement.classList.remove('settings')	
		allButtonSettoing.forEach((element) => {
			this.kernel.removeEvent(element, 'click', () => {})
		})

		return false;
	}
}

const Player = new FluttershyHMI()