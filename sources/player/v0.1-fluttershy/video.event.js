class Melon {
	globalContenaire = null

	videoElement = {
		'element': null,
		'src': '',
		'autoplay': false,
		'muted': false,

		'volumeBarContenaire': null,
		'volumeBarSlider': null,
		'volumeDrag': false,


		'currentQuality': '480p',
		'currentAudio': 'vf',
		'currentAudioName': '',

		'currentFile': '',

		'height': '100%',
		'width': 'auto',

		'currentTime': null,
		'duration': null,

		'is_play': false,

		'allQuality': [],
		'allAudio': [],
		'allSubtitle': [],

		'chargeExtention': ['mp4', 'webm'],

		'allSubtitleList_Track': '',

		'fontSizeSubtitle': 32,

		'idTrack': 0
	}

	progressBar = {
		'contenaire': null,
		'buffered': 0,
	}

	addEventUser = {
		'playing': null
	}

	html = {
		'quality': '',
		'qualityButtons': '',

		'audio': '',
		'audioButtons': '',

		'subtitle': '',
		'subtitleButtons': '',
	}

	mouseEnterInPlayer = false

	onVideoInitLoad = null

	constructor(contenaire) {
		this.globalContenaire = document.querySelector(contenaire)

		this.globalContenaire.classList.add('butterfly-player-api', 'melon-player-kernel')
	}


	set contenaire_height(size) {
		this.globalContenaire.style.height = size
	}
	set contenaire_width(size) {
		this.globalContenaire.style.width = size
	}

	set video_height(size) {
		this.videoElement['height'] = size
		this.videoElement.element.style.height = size
	}
	set video_width(size) {
		this.videoElement['width'] = size
		this.videoElement.element.style.width = size
	}

	set thumbnail(string) { this.videoElement['src_thumbnail'] = string }
	get thumbnail() { return this.videoElement['src_thumbnail'] }

	init_video() {

		this.videoElement.element = document.createElement('video');
		this.videoElement.element.id = 'video-player';
		this.videoElement.element.src = this.videoElement['src'];
		this.videoElement.element.autoplay = this.videoElement['autoplay'];
		this.videoElement.element.muted = this.videoElement['muted'];
		this.videoElement.element.style.height = this.videoElement['height'];
		this.videoElement.element.style.width = this.videoElement['width'];
		this.globalContenaire.appendChild(this.videoElement.element);

		this.videoElement.thumbnail = document.createElement('img');
		this.videoElement.thumbnail.id = 'video-thumbnail';
		this.videoElement.thumbnail.src = this.videoElement['src_thumbnail'];
		this.globalContenaire.appendChild(this.videoElement.thumbnail);

		this.#init_quality()
		this.#init_audio()
		this.#init_subtitle()
		this.#init_controlers()

		this.globalContenaire.innerHTML += this.playerHTML

		this.#watch_kernel()

		this.videoElement.element = this.globalContenaire.querySelector('video#'+this.videoElement.element.id)
		this.videoElement.element.innerHTML = this.videoElement.allSubtitleList_Track

		this.progressBar.contenaire = this.globalContenaire.querySelector('.progress-bar')
		this.progressBar.elementRead = this.progressBar.contenaire.querySelector('.progress-bar .readed')
		this.progressBar.elementBuffered = this.progressBar.contenaire.querySelector('.progress-bar .buffered')
		this.progressBar.elementBuffered = this.progressBar.contenaire.querySelector('.progress-bar .buffered')

		this.progressBar.playerInfobull = this.globalContenaire.querySelector('.infobull-progressbar')



		this.videoElement.volumeBarContenaire = this.globalContenaire.querySelector('.volumechange-bar')
		this.videoElement.volumeBarSlider = this.globalContenaire.querySelector('.volumechange-bar-content')

		this.#init_all_event()
	}

	set playing(callback) {
		this.addEventUser.playing = callback
	}

	set video_currentTime(int) {
		this.videoElement.element.currentTime = int
	}

	get video_currentTime() {
		return this.videoElement.element.currentTime
	}

	globalClassAdd(val) {
		this.globalContenaire.classList.add(val)
	} 

	globalClassRemove(val) {
		this.globalContenaire.classList.remove(val)
	} 

	#init_all_event() {
		this.globalContenaire.addEventListener("fullscreenchange", () => {
			video_resize(this.globalContenaire, this.videoElement.element)
			if (!document.fullscreenElement) {
		    	this.inFullScreen = false;
				this.globalContenaire.classList.remove('fullscreen')
			}
		});

		this.videoElement.element.addEventListener("ended", () => {
			this.globalContenaire.classList.remove('video-playing')
			this.globalContenaire.classList.add('video-ending')
			this.globalContenaire.classList.remove('player-is-pause')

			this.globalContenaire.querySelector('#player_button_pause').innerHTML = iconReresh

			if(this.onVideoEnded)
				this.onVideoEnded()
		});

		let contextMenu = this.globalContenaire.querySelector('#context-menu')
		this.globalContenaire.oncontextmenu = function (event) {
		
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


		this.globalContenaire.addEventListener('click', (e) => {
			if(this.globalContenaire.classList.contains('error'))
				return;
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

			if(this.globalContenaire.classList.contains('settings')) {				
				if(this.globalContenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
					this.globalContenaire.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'
					this.globalContenaire.querySelector('.option-player-video-translate').classList.remove('focus')
					let allB = this.globalContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
					return
				}
				this.globalContenaire.classList.remove('settings')
			}

			this.pp_toggle()
		})

		this.globalContenaire.querySelector('#player_button_pause').addEventListener('click', () => {
			this.pp_toggle()
		})
		
		this.globalContenaire.querySelector('#player_button_muted').addEventListener('click', () => {
			this.toggle_mute()
		})
		this.globalContenaire.querySelector('#player_button_fullscreen').addEventListener('click', () => {
		    this.init_fullscreen()
		})

		this.globalContenaire.querySelector('#setting-video-icon').addEventListener('click', () => {
			if(this.globalContenaire.classList.contains('settings')) {
				this.globalContenaire.classList.remove('settings')
				
				if(this.globalContenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
					this.globalContenaire.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'
					this.globalContenaire.querySelector('.option-player-video-translate').classList.remove('focus')
					let allB = this.globalContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
				}
			}
			else
				this.globalContenaire.classList.add('settings')
		})


		this.videoElement.element.addEventListener('play', () => {
			this.globalContenaire.classList.add('video-playing')
			this.globalContenaire.classList.remove('video-ending')

			this.globalContenaire.querySelector('#player_button_pause').innerHTML = iconPause
			this.globalContenaire.querySelector('#kernel_info_for_player_butterfly-player-api #info-event').textContent = `Adding event for "VIDEO_PLAY"`

			this.globalContenaire.classList.remove('player-is-pause')

			if(this.addEventUser.playing)
				this.addEventUser.playing()

			if(this.onVideoPlay)
				this.onVideoPlay()
		})

		this.videoElement.element.addEventListener('pause', () => {
			this.globalContenaire.querySelector('#player_button_pause').innerHTML = iconPlay
			this.globalContenaire.querySelector('#kernel_info_for_player_butterfly-player-api #info-event').textContent = `Adding event for "VIDEO_PAUSE"`

			this.globalContenaire.classList.add('player-is-pause')

			if(this.addEventUser.pausing)
				this.addEventUser.pausing()
		})

		this.videoElement.element.addEventListener('volumechange', () => {
			if(this.videoElement.element.volume > 0.0) {
				this.globalContenaire.querySelector('#player_button_muted').innerHTML = iconUnMute
			} else {
				this.globalContenaire.querySelector('#player_button_muted').innerHTML = iconMute
			}
		})






		this.videoElement.element.addEventListener('progress', () => {
			this.event_timeUpdate_buffer()

			if(!this.videoElement.is_play)
		    	this.videoElement.element.play()
		})

		this.videoElement.element.addEventListener('seeked', () => {
			if(!this.videoElement.is_play)
		    	this.videoElement.element.play()
		})

		this.videoElement.element.addEventListener('playing', () => {
			if(!this.videoElement.is_play)
		    	this.videoElement.element.play()
		})


		this.videoElement.element.addEventListener('timeupdate', () => {
			this.event_timeUpdate()

			this.videoElement.currentTime = this.videoElement.element.currentTime

			if(this.onVideoTimeUpdate)
				this.onVideoTimeUpdate()
		})







		// Mouvement
		let intervalHide = setInterval(() => {
			if(this.mouseEnterInPlayer) {
				this.globalContenaire.classList.remove('mouse-in-player')
				this.mouseEnterInPlayer = false
			}
			this.mouseEnterInPlayer = false
		}, 5000)

		this.globalContenaire.addEventListener('mouseleave', () => {
			if(this.globalContenaire.classList.contains('player-error'))
				return;

			this.globalContenaire.classList.remove('mouse-in-player')
			this.mouseEnterInPlayer = false
		})
		this.globalContenaire.addEventListener('mousemove', () => {
			if(this.globalContenaire.classList.contains('error'))
				return;

			this.globalContenaire.classList.add('mouse-in-player')
			this.mouseEnterInPlayer = true
		})

		this.globalContenaire.querySelector('.butterfly-player-controleurs .bottom').addEventListener('mouseenter', (e) => {
			clearInterval(intervalHide);
		})

		this.globalContenaire.querySelector('.butterfly-player-controleurs .bottom').addEventListener('mouseleave', (e) => {
			intervalHide = setInterval(() => {
				if(this.mouseEnterInPlayer) {
					this.globalContenaire.classList.remove('mouse-in-player')
					this.mouseEnterInPlayer = false
				}
				this.mouseEnterInPlayer = false
			}, 5000)
		})

		this.globalContenaire.querySelector('.butterfly-player-controleurs .top').addEventListener('mouseenter', (e) => {
			clearInterval(intervalHide);
		})

		this.globalContenaire.querySelector('.butterfly-player-controleurs .top').addEventListener('mouseleave', (e) => {
			intervalHide = setInterval(() => {
				if(this.mouseEnterInPlayer) {
					this.globalContenaire.classList.remove('mouse-in-player')
					this.mouseEnterInPlayer = false
				}
				this.mouseEnterInPlayer = false
			}, 5000)
		})





		document.addEventListener("keydown", (event) => {
			if(this.globalContenaire.classList.contains('error'))
				return;

		    const keyName = event.key;
		    console.log(keyName)
		    switch(keyName) {
		    	case ' ':
		    	case 'k':
		    		this.pp_toggle()
		    		break;

		    	case 'r':
		    		video_resize(this.globalContenaire, this.videoElement.element)
		    		break;

		    	case 'ArrowRight':
		    		//this.videoElement.currentTime += 5.0
		    		this.skip(5.0, '+')
		    		break;
		    	case 'ArrowLeft':
		    		//this.videoElement.currentTime -= 5.0
		    		this.skip(5.0, '-')
		    		break;
		    	case 'a':
		    		this.videoElement.currentTime -= 0.05
		    		break;
		    	case 'z':
		    		this.videoElement.currentTime += 0.05
		    		break;

		    	case 'f':
		    		this.init_fullscreen()
		    		break;

		    	case 'm':
		    		this.toggle_mute()
		    		break;
		    }
		})



		//// TMP
		this.progressBar.contenaire.addEventListener('mouseenter', (e) => {
			this.progressBar.contenaire.addEventListener('mousemove', (e) => {
				let progressWidth = this.progressBar.contenaire.offsetWidth


				var rect = this.progressBar.contenaire.getBoundingClientRect(); //todo: optimisation ?
				let x = e.clientX - rect.left;
				var time = (x/progressWidth) * this.videoElement.element.duration;

				this.progressBar.playerInfobull.querySelector('.timecode').textContent = intToTime(time)
				if(this.seek_file)
					this.progressBar.playerInfobull.querySelector('video').currentTime = time

				this.progressBar.playerInfobull.style.left =  (x)+"px"
				this.progressBar.playerInfobull.style.display = 'block'
			})
		})

		this.progressBar.contenaire.addEventListener('mousedown', (e) => {
			let progressWidth = this.progressBar.contenaire.offsetWidth


			var rect = this.progressBar.contenaire.getBoundingClientRect(); //todo: optimisation ?
			let x = e.clientX - rect.left;
			var time = (x/progressWidth) * this.videoElement.element.duration;

			this.videoElement.element.currentTime = time
		})

		this.progressBar.contenaire.addEventListener('mouseleave', (e) => {
			this.progressBar.playerInfobull.style.display = 'none'
		})




























		let allQuality = this.globalContenaire.querySelectorAll('ul#quality li')
		allQuality.forEach((e) => {
			e.addEventListener('click', () => {
				if(this.globalContenaire.classList.contains('error'))
					return;

				this.globalContenaire.classList.remove('settings')
				let elkement = e.querySelector('span')
				
				this.videoElement.currentQuality = elkement.dataset.qualityId

				this.globalContenaire.querySelector('#quality-current').textContent = elkement.dataset.qualityId

				if(this.onQualityChange)
					this.onQualityChange()

				this.#load_video()
				
				if(this.globalContenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
					this.globalContenaire.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'
					this.globalContenaire.querySelector('.option-player-video-translate').classList.remove('focus')

					let allB = this.globalContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
				}
			})
		})


		let allaudio = this.globalContenaire.querySelectorAll('ul#audio li')
		allaudio.forEach((e) => {
			e.addEventListener('click', () => {
				if(this.globalContenaire.classList.contains('error'))
					return;

				this.globalContenaire.classList.remove('settings')
				let elkement = e.querySelector('span')
				
				this.videoElement.currentAudio = elkement.dataset.audioId
				this.videoElement.src = elkement.dataset.audioInit

				console.log(this.videoElement.src)

				if(this.onAudioChange)
					this.onAudioChange()

				console.log(this.videoElement.src)

				this.#load_video()

				this.globalContenaire.querySelector('#audio-current').textContent = elkement.textContent
				this.videoElement.currentAudioName = elkement.textContent

				if(this.globalContenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
					this.globalContenaire.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'
					this.globalContenaire.querySelector('.option-player-video-translate').classList.remove('focus')

					let allB = this.globalContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
				}
			})
		})








		
		let vi = this.videoElement
		this.videoElement.volumeBarContenaire.addEventListener('mousedown', (ev) => {
			vi.volumeDrag = true;
			this.#updateBar(ev.clientX);
		});
		document.addEventListener('mousemove', (ev) => {
			if(vi.volumeDrag){
				this.#updateBar(ev.clientX);
			}
		});
		document.addEventListener('mouseup', (ev) => {
			vi.volumeDrag = false;
		});
















		let allLang = this.globalContenaire.querySelectorAll('ul#subtitle li.button')
		let con = 0
		allLang.forEach((e) => {
			if(con < (allLang.length-1)) {
				let id = e.querySelector('span').dataset.id

				this.videoElement.element.textTracks[id].removeEventListener('cuechange', null)
				this.globalContenaire.querySelector('.trackText').style.display = "none"
				this.videoElement.element.textTracks[id].mode = 'hidden'
				this.videoElement.element.textTracks[id].mode = 'disabled'
			}

			e.addEventListener('click', () => {
				if(this.globalContenaire.classList.contains('error'))
					return;

				this.globalContenaire.classList.remove('settings')
				let elkement = e.querySelector('span')

				if(elkement.dataset.id == 'off') {
					this.globalContenaire.querySelector('#lang-current').textContent = "Off"
					let aco = 0;
					allLang.forEach((ee) => {
						if(aco < (allLang.length-1)) {
							let idaa = ee.querySelector('span').dataset.id
							
							this.videoElement.element.textTracks[idaa].removeEventListener('cuechange', null)
							this.globalContenaire.querySelector('.trackText').style.display = "none"
							this.videoElement.element.textTracks[idaa].mode = 'disabled' 
						}
						aco++
					})
					return
				}

				this.videoElement.idTrack = this.videoElement.element.textTracks[elkement.dataset.id]
				this.videoElement.idTrack.mode = 'hidden'
				
				this.#init_event_subtitle()

				this.globalContenaire.querySelector('#lang-current').textContent = elkement.dataset.name
				//this.hide_setting_menu()
			})
			con++
		})



		this.globalContenaire.querySelector('.icon-button#less-font-st').addEventListener('click', () => {
			console.log('clicked')
			this.videoElement.fontSizeSubtitle--

			this.globalContenaire.querySelector('#font-st').textContent = this.videoElement.fontSizeSubtitle

			this.globalContenaire.querySelector('.trackText').style.fontSize = this.videoElement.fontSizeSubtitle+'px'
			this.globalContenaire.querySelector('.trackText').style.lineHeight = (this.videoElement.fontSizeSubtitle+5)+'px'


		})

		this.globalContenaire.querySelector('.icon-button#plus-font-st').addEventListener('click', () => {
			this.videoElement.fontSizeSubtitle++

			this.globalContenaire.querySelector('#font-st').textContent = this.videoElement.fontSizeSubtitle

			this.globalContenaire.querySelector('.trackText').style.fontSize = this.videoElement.fontSizeSubtitle+'px'
			this.globalContenaire.querySelector('.trackText').style.lineHeight = (this.videoElement.fontSizeSubtitle+5)+'px'


		})
	}

	get video_src() { return this.videoElement.src; }

	#init_event_subtitle() {
		this.videoElement.idTrack.removeEventListener('cuechange', null)
		this.videoElement.idTrack.addEventListener('cuechange', () => {
			let cues = this.videoElement.idTrack.activeCues;

			if(!cues[0]) {
				this.globalContenaire.querySelector('.trackText').style.display = "none"
				return
			}

			let trackText = cues[0].text

			this.globalContenaire.querySelector('.trackText').innerHTML = '<div><span>'+trackText.replace("\n", '</div></span><div><span>')+"</div></span>"
			this.globalContenaire.querySelector('.trackText').style.display = "inline-block"
		})
	}

	#init_controlers() {

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

						this.playerHTML += `<div class="wf-display progress-bar">`
							this.playerHTML += `<span class="buffered"></span>`
							this.playerHTML += `<span class="readed"></span>`
						this.playerHTML += `</div>`
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
					this.playerHTML += this.html.quality
					this.playerHTML += this.html.audio
					this.playerHTML += this.html.subtitle
					this.playerHTML += `<div class="option-button quality-changer">`
									+`<span class="current qulity-current" onClick="setting_get('V${systeme_version} ${systeme_name} ${systeme_environement}', this.parentNode, 'focus', 'legal-notice')">`
										+`<span class="title">Information sur le player</span>`
									+`</span>`
							+`</div>`
				this.playerHTML += `</section>`
				this.playerHTML += `<section class="option-player-video-content right">`
					this.playerHTML += `<section class="setting-head">`
						this.playerHTML += `<div class="button-icon">${iconLess}</div>`
						this.playerHTML += `<span id="menu-title">Menu</span>`
					this.playerHTML += `</section>`
					this.playerHTML += this.html.qualityButtons
					this.playerHTML += this.html.audioButtons
					this.playerHTML += this.html.subtitleButtons
					this.playerHTML += `<div class="setting-info" id="legal-notice">`
						this.playerHTML += `<p>Butterfly Player API</p>`
						this.playerHTML += `<p>- Kernel 1.03 - Lemon</p>`
						this.playerHTML += `<p>- V${systeme_version} ${systeme_name} ${systeme_environement}</p>`
						this.playerHTML += `<p>By 'heart_butterfly' - Floagg Entreprise EI</p>`
						this.playerHTML += systeme_changelogs
					this.playerHTML += `</div>`
				this.playerHTML += `</section>`

				this.playerHTML += `</section>`

			this.playerHTML += `</section>`
		this.playerHTML += `</div>`

		this.playerHTML += `<div class="trackText" style="font-size: ${this.videoElement.fontSizeSubtitle}px; line-height: ${this.videoElement.fontSizeSubtitle+5}px;"></div>`

		this.playerHTML += `<div class="menu-deroulant-for-player"  id="context-menu">`
			this.playerHTML += `<ul>`
				this.playerHTML += `<li><a onclick="Player.copy(Player.videoCurrentTime)"><span class="icon">${iconSetting}</span><span class="text">Copier 'currentTime'</span></a></li>`
				this.playerHTML += `<li><a onclick="Player.init_play()"><span class="icon">${iconPlay}</span><span class="text">Play/Pause</span></a></li>`
				this.playerHTML += `<li><a onclick="Player.init_mute()"><span class="icon">${iconUnMute}</span><span class="text">Mute/Unmute</span></a></li>`
				this.playerHTML += `<li><a onclick="Player.init_fullscreen()"><span class="icon">${iconFullscreen}</span><span class="text">Fullscreen</span></a></li>`
			this.playerHTML += `</ul>`
		this.playerHTML += `</div>`
	}


	#updateBar(x, vol) {
		var volume = this.videoElement.volumeBarContenaire;
		var percentage;
		//if only volume have specificed
		//then direct update volume
		if (vol) {
			percentage = vol * 100;
		} else {
			var rect = this.videoElement.volumeBarContenaire.getBoundingClientRect();

			var position = x - rect.left;
			percentage = 100 * position / volume.clientWidth;
		}

		if (percentage > 100) {
		    percentage = 100;
		}
		if (percentage < 0) {
			percentage = 0;
		}

		//update volume bar and video volume
		this.videoElement.volumeBarSlider.style.width = percentage +'%';
		this.videoElement.element.volume = percentage / 100;

		if((percentage / 100) > 0.0) {
			this.globalContenaire.querySelector('#player_button_muted').innerHTML = iconUnMute
		} else {
			this.globalContenaire.querySelector('#player_button_muted').innerHTML = iconMute
		}

		if (!vol)
			this.videoElement.currentVolume = percentage / 100
	}

	#watch_kernel() {
		//document.querySelector('head').insertAdjacentHTML(
		//	'beforeend',
		//	`<link rel="stylesheet" type="text/css" href="${this.link_css_player_kernel}">`
		//)

		let kernel_info = `<div style="display: none;" id="kernel_info_for_player_butterfly-player-api" class="melon-kernel-info-contenaire">`
			kernel_info += `<div class="center">`
				kernel_info += `<ul>`
					kernel_info += `<li><span>Butterfly Player API</span></li>`
					kernel_info += `<li><span>Kernel 1.03 - Lemon</span></li>`
					kernel_info += `<li><span>V${systeme_version} ${systeme_name} ${systeme_environement}</span></li>`
					kernel_info += `<li><span>By 'heart_butterfly' - Floagg Entreprise EI</span></li>`
					kernel_info += `<li><span id="info-event"></span></li>`
				kernel_info += `</ul>`
			kernel_info += `</div>`
		kernel_info += `</div>`

		this.globalContenaire.insertAdjacentHTML('beforeend', kernel_info)
	}

	#load_video() {
		this.videoElement.CurrentExtension = this.#is_extension()
		this.videoElement.CurrentFileMime = get_mime(this.videoElement.CurrentExtension)

		if(this.onVideoInitLoad)
			this.onVideoInitLoad()

		this.videoElement.element.src = this.videoElement['src'];
		this.videoElement.element.currentTime = this.videoElement.currentTime

		this.videoElement.element.load()
	}

	logs(string, action = "global") {
		switch(action) {
			case 'global':
				console.log(string)
				break;
			case 'transfere':
				console.log(string)
				break;
			case 'tmp':
				console.log(string)
				break;
		}
	}

	addEvent(element, action, callback, is_query = false) {
		let element_add_event = element
		if(is_query)
			element_add_event = this.globalContenaire.querySelector(element)

		console.log(element_add_event)

		element_add_event.addEventListener(action, () => {
			callback()
			this.globalContenaire.querySelector('#kernel_info_for_player_butterfly-player-api #info-event').textContent = `Adding event for "${action}"`
		})
	}
	addContenaireEvent(action, callback) {
		this.globalContenaire.addEventListener(action, () => {
			callback()
			this.globalContenaire.querySelector('#kernel_info_for_player_butterfly-player-api #info-event').textContent = `Adding event for "${action}"`
		})
	}
	addVideoEvent(action, callback) {
		this.videoElement.element.addEventListener(action, () => {
			callback()
			this.globalContenaire.querySelector('#kernel_info_for_player_butterfly-player-api #info-event').textContent = `Adding event for "${action}"`
		})
	}



	removeEvent(element, action, is_query = false) {
		let element_add_event = element
		if(is_query)
			element_add_event = this.globalContenaire.querySelector(element)

		element_add_event.removeEventListener(null, callback)
	}


	event_timeUpdate() {
		let videoCurrentTime =  (this.videoElement.element.currentTime / this.videoElement.element.duration) * 100;
		this.progressBar.read = videoCurrentTime+"%"

		this.globalContenaire.querySelector('#videoCurrentTime').textContent =  intToTime(this.videoElement.element.currentTime)
		this.globalContenaire.querySelector('#videoDuration').textContent =  intToTime(this.videoElement.element.duration)
	}

	event_timeUpdate_buffer() {
		var duration = this.videoElement.element.duration;

		if (duration > 0) {
			for (var i = 0; i < this.videoElement.element.buffered.length; i++) {
				if (
					this.videoElement.element.buffered.start(this.videoElement.element.buffered.length - 1 - i) <
					this.videoElement.element.currentTime
				) {
					this.progressBar.buffered =
						(this.videoElement.element.buffered.end(this.videoElement.element.buffered.length - 1 - i) / duration) *
						100 +
						"%";
					break;
				}
			}
		}
	}


	pp_toggle() {
		if(this.videoElement.element.paused) {
			this.videoElement.element.play()
			this.videoElement.is_play = true
		} else {
			this.videoElement.element.pause()
			this.videoElement.is_play = false
		}
	}
	toggle_mute() {
		if(this.videoElement.element.muted) {
			this.videoElement.element.muted = false;
			this.#updateBar(0, 0);
		}
		else {
			this.videoElement.element.muted = true;
			this.#updateBar(0, this.videoElement.currentVolume);
		}
	}


	get_progress_bar() {
	}



	init_fullscreen() {
		video_resize(this.globalContenaire, this.videoElement.element)

		if(!this.inFullScreen) {
			if (this.globalContenaire.requestFullscreen) {
				this.globalContenaire.requestFullscreen();
			} else if (this.globalContenaire.webkitRequestFullscreen) { /* Safari */
				this.globalContenaire.webkitRequestFullscreen();
			} else if (this.globalContenaire.msRequestFullscreen) { /* IE11 */
				this.globalContenaire.msRequestFullscreen();
			}
			this.inFullScreen = true
			this.globalContenaire.classList.add('fullscreen')
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
			this.globalContenaire.classList.remove('fullscreen')
		}
	}

	skip(number_frames, action = '') {
		switch(action) {
			case '+':
				this.videoElement.element.currentTime += number_frames
				break;
			case '-':
				this.videoElement.element.currentTime -= number_frames
				break;
			default:
				this.videoElement.element.currentTime = number_frames
				break;
		}
	}

	set currentAudioName(string) { this.videoElement.currentAudioName = string }


	#init_quality() {
		this.html.quality = `<div class="option-button quality-changer">`
									+`<span class="current qulity-current" onClick="setting_get('Qualité vidéo', this.parentNode, 'focus', 'quality')">`
										+`<span class="title">Qualité</span>`
										+`<span class="generate-change" id="quality-current">${this.videoElement.currentQuality}</span>`
									+`</span>`
							+`</div>`

		let i = 0;
		this.html.qualityButtons = '<ul class="setting-info" id="quality">'
		this.videoElement.allQuality.forEach((e) => {
			this.html.qualityButtons += `<li class="button-hover"><span class="button-change button-change-quality" data-quality-id="${e}">${e}</span></li>`
			i++
		})
		this.html.qualityButtons += '</ul>'
	}

	#init_audio() {
		if(this.videoElement.allAudio.length <= 0)
			return;

		if(this.videoElement.currentAudioName === '') {
			this.videoElement.currentAudioName = this.videoElement.allAudio[0].name
			this.videoElement['src'] = this.videoElement.allAudio[0].init
		}

		this.html.audio = `<div class="option-button audio-changer">`
									+`<span class="current audio-current" onClick="setting_get('Audio de la vidéo', this.parentNode, 'focus', 'audio')">`
										+`<span class="title">Audio</span>`
										+`<span class="generate-change" id="audio-current">${this.videoElement.currentAudioName}</span>`
									+`</span>`
							+`</div>`

		let i = 0;
		this.html.audioButtons = '<ul class="setting-info" id="audio">'
		this.videoElement.allAudio.forEach((e) => {
			this.html.audioButtons += `<li class="button-hover"><span class="button-change button-change-audio" data-audio-init="${e.init}" data-audio-id="${e.id}">${e.name}</span></li>`
			i++
		})
		this.html.audioButtons += '</ul>'
	}

	#init_subtitle() {
		this.html.subtitle = `<div class="option-button lang-changer">`
									+`<span class="current lang-current" onClick="setting_get('Sous-titre', this.parentNode, 'focus', 'subtitle')">`
										+`<span class="title">Sous-titre</span>`
										+`<span class="generate-change" id="lang-current">Off</span>`
									+`</span>`
									+`</div>`

		let i = 0;
		this.html.subtitleButtons = '<ul class="setting-info" id="subtitle">'
		this.html.subtitleButtons += `<li class="button-change-font"><span class="icon-button button-hover" id="less-font-st">${iconLess}</span><span id="font-st">${this.videoElement.fontSizeSubtitle}</span><span class="icon-button button-hover" id="plus-font-st">${iconPlus}</span></li>`
		this.videoElement.allSubtitle.forEach((e) => {
			this.videoElement.allSubtitleList_Track += `<track rossorigin="use-credentials" src="${e.url}" data-name="${e.name}" />`
			this.html.subtitleButtons += `<li class="button button-hover"><span class="button-change button-change-lang" data-id="${i}" data-name="${e.name}">${e.name}</span></li>`
			i++
		})
		this.html.subtitleButtons += `<li class="button button-hover"><span class="button-change button-change-lang" data-id="off">Off</span></li>`
		this.html.subtitleButtons += '</ul>'
	}

	set list_quality(array) {
		this.videoElement.allQuality = array
	}

	set list_audio(array) {
		this.videoElement.allAudio = array
	}

	set list_subtitle(array) {
		this.videoElement.allSubtitle = array
	}

	#is(string, not_string) {
		let extFile = this.videoElement.chargeExtention

		if(extFile.find((element) => string == element))
			return string;
		return not_string;
	}

	#is_extension() {
	  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
	    return this.#is(['webm', 'avi'], 'mp4')
	  } else if (navigator.userAgent.indexOf("Edg") != -1) {
	    return this.#is(['webm', 'avi'], 'mp4')
	  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
	    return this.#is(['webm', 'avi'], 'mp4')
	  } else if (navigator.userAgent.indexOf("Safari") != -1) {
	    return this.#is(['webm', 'avi'], 'mp4')
	  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
	    return this.#is(['webm', 'avi'], 'mp4')
	  } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
	  {
	    return this.#is(['avi', 'mp4'], 'mp4')
	  } else {
	    return null;
	  }
	}


	play() {
		this.pp_toggle()
	}

	/*
	 * SETTER
	 *
	 *
	 */

	set set_src(string) { this.videoElement['src'] = string; }

	set set_video_src(string) {
		this.videoElement['src'] = string;

		this.#load_video()
	}

	set mute(val) { this.#updateBar(0, val); }


	set set_pbRead(val) { this.progressBar.elementRead.style.width = val }
	set set_pbBuffered(val) { this.progressBar.elementBuffered.style.width = val }
	set currentQuality(string) { this.videoElement.currentQuality = string }

	joinElementToControler(position, html, classs) {
		if(classs !== "")
			this.globalContenaire.querySelector(classs).insertAdjacentHTML(position, html)
		else
			this.globalContenaire.insertAdjacentHTML(position, html)
	}



	get currentQuality() {
		return this.videoElement.currentQuality
	}
}


function intToTime(int) {
	var minutes = Math.floor(int / 60); 
	var seconds = Math.floor(int - minutes * 60)
	var hours = Math.floor(seconds / 3600)

	if(hours < 10) { hours = "0"+hours }
	if(minutes < 10) { minutes = "0"+minutes }
	if(seconds < 10) { seconds = "0"+seconds }

	let textToTime = minutes + ':' + seconds

	if(hours > 0) {
		textToTime = hours + ":" + textToTime
	}

	return textToTime
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
}


function setting_get(name, element, classeName, classUl) {
	let element_changer = element.parentNode.parentNode

	if(element_changer.classList.contains(classeName)) {
		element_changer.classList.remove(classeName)
	} else {
		element_changer.classList.add(classeName)

		element_changer.querySelector(`.option-player-video-content.right #`+classUl).style.display = "block"
		element_changer.querySelector('.option-player-video-content.right #menu-title').textContent = name
		element_changer.style.transform = 'translateX(-250px)'
	}
}

function get_mime(string) {
	let r = '';
	console.log(string)
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