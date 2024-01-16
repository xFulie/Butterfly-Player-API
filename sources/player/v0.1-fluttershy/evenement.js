	init_allEvent() {
		this.mediaEvent()
		this.mouseEvent()
		this.clickEvent()
		this.keyboardEvent()
		this.settingEvent()

		console.log('all event call')

		this.playerContenaire.addEventListener("fullscreenchange", () => {
			video_resize(this.playerContenaire, this.videoPlayer)
			if (!document.fullscreenElement) {
		    	console.log('espace')
		    	this.inFullScreen = false;
				this.playerContenaire.classList.remove('fullscreen')
			}
		});
	}

	mediaEvent() {
		this.eventCall(this.videoPlayer, 'error', () => {
			this.playerContenaire.classList.add('error')
			this.loadError()
		});
		this.eventCall(this.videoPlayer, 'playing', () => {
			this.playerContenaire.classList.remove('loading')

			if(this.isPlay)
				this.videoPlayer.play()
			this.videoPlayer.play()
		})
		this.eventCall(this.videoPlayer, 'seeked', () => {
			this.playerContenaire.classList.remove('loading')

			var inc = this.playerContenaire.querySelector('.progress-bar').offsetWidth / this.videoPlayer.duration;

			for (let i = 0; i < Player.videoPlayer.buffered.length; i++) {
		      var startX = Player.videoPlayer.buffered.start(i) * inc;
		      var endX = Player.videoPlayer.buffered.end(i) * inc;
		      var width = endX - startX;

		      this.playerContenaire.querySelector('.progress-bar').insertAdjacentHTML(
				'beforeend',
					`<span class="prog-buffer" style="width: ${width}px; left: ${startX}px;"></span>`
				)
			
		    }

		    if(this.isPlay)
		    	this.videoPlayer.play()
		})
		this.eventCall(this.videoPlayer, 'progress', () => {
			var duration = this.videoPlayer.duration;

		    if (duration > 0) {
		      for (var i = 0; i < this.videoPlayer.buffered.length; i++) {
		        if (
		          this.videoPlayer.buffered.start(this.videoPlayer.buffered.length - 1 - i) <
		          this.videoPlayer.currentTime
		        ) {
		          this.playerContenaire.querySelector('.beta-bar').style.width =
		            (this.videoPlayer.buffered.end(this.videoPlayer.buffered.length - 1 - i) / duration) *
		              100 +
		            "%";
		          break;
		        }
		      }
		    }

		    if(this.isPlay)
		    	this.videoPlayer.play()
		})
		this.eventCall(this.videoPlayer, 'seeking', () => {
			this.playerContenaire.classList.add('loading')
		})
		this.eventCall(this.videoPlayer, 'waiting', () => {
			this.videoPlayer.pause()
			this.playerContenaire.classList.add('loading')
		})
		this.eventCall(this.videoPlayer, 'play', (e) => {
			this.playerContenaire.querySelector('#player_button_pause').innerHTML = iconPause
			this.playerContenaire.classList.remove('pause')

			if(this.isPlay)
				this.videoPlayer.play()
		})
		this.eventCall(this.videoPlayer, 'pause', (e) => {
			this.playerContenaire.querySelector('#player_button_pause').innerHTML = iconPlay
			this.playerContenaire.classList.add('pause')
		})

		this.event('#video_player', 'timeupdate', (event) => {
			update_currentTime(this.videoPlayer, this.playerContenaire)

			this.videoCurrentTime = this.videoPlayer.currentTime
			if(
				(this.videoPlayer.currentTime > this.intro_skipping[0])
				&&
				(this.videoPlayer.currentTime < this.intro_skipping[1])
			) {
				this.playerContenaire.classList.remove('skipped')
			} else {
				this.playerContenaire.classList.add('skipped')
			}
		})
	}

	globalClassAdd(val) {
		this.globalContenaire.classList.add(val)
	} 

	globalClassRemove(val) {
		this.globalContenaire.classList.remove(val)
	} 


	mouseEvent() {
		// Mouvement
		let mouseEnterInPlayer = false
		let intervalHide = setInterval(() => {
			if(mouseEnterInPlayer) {
				this.playerContenaire.classList.remove('mouse-in')
				mouseEnterInPlayer = false
			}
			mouseEnterInPlayer = false

			console.log('hidden menu')
		}, 5000)

		this.playerContenaire.addEventListener('mouseleave', () => {
			if(this.playerContenaire.classList.contains('error'))
				return;

			this.playerContenaire.classList.remove('mouse-in')
			mouseEnterInPlayer = false
		})
		this.playerContenaire.addEventListener('mousemove', () => {
			if(this.playerContenaire.classList.contains('error'))
				return;

			this.playerContenaire.classList.add('mouse-in')
			mouseEnterInPlayer = true
		})
		
		this.playerContenaire.querySelector('.video-controler .bottom').addEventListener('mouseenter', (e) => {
			console.log('remove interval')
			clearInterval(intervalHide);
		})

		this.playerContenaire.querySelector('.video-controler .bottom').addEventListener('mouseleave', (e) => {
			console.log('add interval')

			intervalHide = setInterval(() => {
				if(mouseEnterInPlayer) {
					this.playerContenaire.classList.remove('mouse-in')
					mouseEnterInPlayer = false
				}
				mouseEnterInPlayer = false

				console.log('hidden menu')
			}, 5000)
		})

		this.eventCall(this.videoPressBarContenaire, 'mouseenter', (e) => {
			this.videoPressBarContenaire.addEventListener('mousemove', (e) => {
				let progressWidth = this.videoPressBarContenaire.offsetWidth


				var rect = this.videoPressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
				let x = e.clientX - rect.left;
				var time = (x/progressWidth) * this.videoPlayer.duration;

				this.playerInfobull.querySelector('.timecode').textContent = intToTime(time)
				if(this.seek_file)
					this.playerInfobull.querySelector('video').currentTime = time

				this.playerInfobull.style.left =  (x)+"px"
				this.playerInfobull.style.display = 'block'
			})
		})

		this.eventCall(this.videoPressBarContenaire, 'mousedown', (e) => {
			let progressWidth = this.videoPressBarContenaire.offsetWidth


			var rect = this.videoPressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
			let x = e.clientX - rect.left;
			var time = (x/progressWidth) * this.videoPlayer.duration;

			this.videoPlayer.currentTime = time
		})

		this.eventCall(this.videoPressBarContenaire, 'mouseleave', (e) => {
				this.playerInfobull.querySelector('.timecode').textContent = "00:00"
				this.playerInfobull.style.display = 'none'
		})
	}

	clickEvent() {
		// click
		this.playerContenaire.addEventListener('click', (e) => {
			if(this.playerContenaire.classList.contains('error'))
				return;

			let contextMenu = this.playerContenaire.querySelector('#context-menu')
			contextMenu.style.display = "none"
			//console.log(e.target)
			switch(e.target.nodeName) {
				case 'h1':
				case 'A':
				case 'BUTTON':
				case 'SPAN':
					return
					break;
			}

			if(this.playerContenaire.classList.contains('settings')) {
				if(this.playerContenaire.querySelectorAll('.option-player-video.focus').length > 0) {
					this.playerContenaire.querySelector('.option-player-video.focus').classList.remove('focus')
					this.playerContenaire.querySelector('.option-player-video-content.right').style.display = "none"
					this.playerContenaire.querySelector('.option-player-video-content.left').style.display = "block"

					let allB = this.playerContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
					return
				}
				this.playerContenaire.classList.remove('settings')
				return
			}
			this.init_play()
		})

		this.event('#setting-video-icon', 'click', () => {
			if(this.playerContenaire.classList.contains('settings')) {
				this.playerContenaire.classList.remove('settings')
				if(this.playerContenaire.querySelectorAll('.option-player-video.focus').length > 0) {
					this.playerContenaire.querySelector('.option-player-video.focus').classList.remove('focus')
					this.playerContenaire.querySelector('.option-player-video-content.right').style.display = "none"
					this.playerContenaire.querySelector('.option-player-video-content.left').style.display = "block"

					let allB = this.playerContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
				}
			}
			else
				this.playerContenaire.classList.add('settings')
		})

		this.event('#player_button_pause', 'click', () => {
			this.init_play()
		})
		this.event('#player_button_muted', 'click', () => {
			this.init_mute()
		})
		this.event('#player_button_fullscreen', 'click', () => {
		    this.init_fullscreen()
		})

		this.event('#skip_intro_video', 'click', () => {
			if(this.intro_skipping)
				this.videoPlayer.currentTime = this.intro_skipping[1]
		})



		this.playerContenaire.oncontextmenu = function (event) {
			let contextMenu = this.querySelector('#context-menu')

			var rect = this.getBoundingClientRect(); //todo: optimisation ?

			let posY = (event.clientY - rect.top)
			let posX = (event.clientX - rect.left)

			if(posY > (this.offsetHeight-contextMenu.offsetHeight)) {
				posY -= contextMenu.offsetHeight
			}

			if(posX > (this.offsetWidth-contextMenu.offsetWidth)) {
				posX -= contextMenu.offsetWidth
			}

			contextMenu.style.display = "block"
			contextMenu.style.top = posY+"px"
			contextMenu.style.left = posX+"px"
			return false //on annule l'affichage du menu contextuel
		}





		this.event('.icon-button#less-font-st', 'click', () => {
			this.fontSizeSubtitle--

			this.playerContenaire.querySelector('#font-st').textContent = this.fontSizeSubtitle

			this.playerContenaire.querySelector('.trackText').style.fontSize = this.fontSizeSubtitle+'px'
			this.playerContenaire.querySelector('.trackText').style.lineHeight = (this.fontSizeSubtitle+5)+'px'


		})

		this.event('.icon-button#plus-font-st', 'click', () => {
			this.fontSizeSubtitle++

			this.playerContenaire.querySelector('#font-st').textContent = this.fontSizeSubtitle

			this.playerContenaire.querySelector('.trackText').style.fontSize = this.fontSizeSubtitle+'px'
			this.playerContenaire.querySelector('.trackText').style.lineHeight = (this.fontSizeSubtitle+5)+'px'


		})
	}

	keyboardEvent() {
		// kaybord
		document.addEventListener("keydown", (event) => {
			if(this.playerContenaire.classList.contains('error'))
				return;

		    const keyName = event.key;
		    console.log(keyName)
		    switch(keyName) {
		    	case ' ':
		    	case 'k':
		    		this.init_play()
		    		break;

		    	case 'r':
		    		video_resize(this.playerContenaire, this.videoPlayer)
		    		break;

		    	case 'ArrowRight':
		    		//this.videoPlayer.currentTime += 5.0
		    		this.skip(5.0, '+')
		    		break;
		    	case 'ArrowLeft':
		    		//this.videoPlayer.currentTime -= 5.0
		    		this.skip(5.0, '-')
		    		break;
		    	case 'a':
		    		this.videoPlayer.currentTime -= 0.05
		    		break;
		    	case 'z':
		    		this.videoPlayer.currentTime += 0.05
		    		break;

		    	case 'f':
		    		this.init_fullscreen()
		    		break;

		    	case 'm':
		    		this.init_mute()
		    		break;
		    }
		})
	}

	settingEvent() {
		console.log('call settings')
		let allQuality = this.playerContenaire.querySelectorAll('ul#quality li')
		allQuality.forEach((e) => {
			this.eventCall(e, 'click', () => {
				if(this.playerContenaire.classList.contains('error'))
					return;

				this.playerContenaire.classList.remove('settings')
				let elkement = e.querySelector('span')
				//console.log(e.dataset)
				this.filePlayer = elkement.dataset.file
				
				this.playerCurrentQuality = elkement.dataset.qualityId

				this.change_quality()

				this.playerContenaire.querySelector('#quality-current').textContent = elkement.dataset.qualityId
				this.hide_setting_menu()
			})
		})

		let allaudio = this.playerContenaire.querySelectorAll('ul#audio li')
		allaudio.forEach((e) => {
			this.eventCall(e, 'click', () => {
				if(this.playerContenaire.classList.contains('error'))
					return;

				this.playerContenaire.classList.remove('settings')
				let elkement = e.querySelector('span')
				//console.log(e.dataset)
				this.playerFile = elkement.dataset.audioInit
				
				this.playerCurrentaudio = elkement.dataset.audioId

				this.change_audio()
		
				this.infoBull_message(`Audio en '${elkement.textContent}'`)
				this.playerContenaire.querySelector('#audio-current').textContent = elkement.textContent
				this.hide_setting_menu()
			})
		})

		let allLang = this.playerContenaire.querySelectorAll('ul#subtitle li.button')
		let con = 0
		allLang.forEach((e) => {
			if(con < (allLang.length-1)) {
				let id = e.querySelector('span').dataset.id

				this.videoPlayer.textTracks[id].removeEventListener('cuechange', null)
				this.playerContenaire.querySelector('.trackText').style.display = "none"
				this.videoPlayer.textTracks[id].mode = 'disabled'

				console.log('remove subtitle')
			}
			this.eventCall(e, 'click', () => {
				if(this.playerContenaire.classList.contains('error'))
					return;

				this.playerContenaire.classList.remove('settings')
				let elkement = e.querySelector('span')

				if(elkement.dataset.id == 'off') {
					this.playerContenaire.querySelector('#lang-current').textContent = "Off"
					let aco = 0;
					allLang.forEach((ee) => {
						if(aco < (allLang.length-1)) {
							let idaa = ee.querySelector('span').dataset.id
							
							this.videoPlayer.textTracks[idaa].removeEventListener('cuechange', null)
							this.playerContenaire.querySelector('.trackText').style.display = "none"
							this.videoPlayer.textTracks[idaa].mode = 'disabled' 
						}
						aco++
					})
					return
				}

				this.idTrack = this.videoPlayer.textTracks[elkement.dataset.id]
				this.idTrack.mode = 'hidden'
				
				this.init_event_subtitle()

				this.playerContenaire.querySelector('#lang-current').textContent = elkement.dataset.name
				this.hide_setting_menu()
			})
			con++
		})
	}

	event(element_selector, eventName, callback) {
		if(this.playerContenaire.classList.contains('error'))
			return;

		if(!this.playerContenaire.querySelector(element_selector))
			return


		this.playerContenaire.querySelector(element_selector).addEventListener(eventName, callback)
	}
	eventCall(element, eventName, callback) {
		if(this.playerContenaire.classList.contains('error'))
			return;

		if(!element)
			return

		element.addEventListener(eventName, callback)
	}

	init_event_subtitle() {
		this.idTrack.removeEventListener('cuechange', null)
		this.eventCall(this.idTrack, 'cuechange', () => {
			let cues = this.idTrack.activeCues;

			if(!cues[0]) {
				this.playerContenaire.querySelector('.trackText').style.display = "none"
				return
			}

			let trackText = cues[0].text

			this.playerContenaire.querySelector('.trackText').innerHTML = '<div><span>'+trackText.replace("\n", '</div></span><div><span>')+"</div></span>"
			this.playerContenaire.querySelector('.trackText').style.display = "inline-block"
		})
	}