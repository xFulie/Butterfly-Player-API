	/* 
	 * Blueberry V0.2
	 *
	 *
	 *
	 */
	// GETTER VIDEO
	get vSrc() { return this.#vGlobal.src }
	get vCurrentQuality() { return this.#vSettings.currentQuality }

	// SETTER VIDEO
	set vElement(value) { this.vGlobal.element = value; }
	set vTitle(value) {  }
	set vThumbnail(value) { this.#vGlobal.srcThumbnail = value }
	set vSrc(value) { this.#vGlobal.src = value }
	set vAllQuality(value) { this.#vSettings.allQuality = value }
	set vAllAudio(value) { this.#vSettings.allAudio = value }
	set vAllSubtitle(value) { this.#vSettings.allSubtitle = value }

	set vCurrentQuality(value) { this.#vSettings.currentQuality = value }


	gSize(size) {
		this.#vSettings.height = size[0]
		this.#vSettings.width = size[1]

		if(!this.#gContenaire) {
			console.error("Error d'initilisation du lecteur.")
			return;
		}

		this.#gContenaire.style.height = this.#vSettings.height+"px"
		this.#gContenaire.style.width = this.#vSettings.width+"px"

		return true;
	}

	// SETTER EVENT
	set onChangeVolume(value) {  }
	set onChangeQuality(value) {  }
	set onChangeAudio(value) {  }
	set onChangeSubittle(value) {  }
	//set onChange(value) {  }

	set gContenaire(value) { this.#gContenaire = document.querySelector(value) }

	// FUNCTION PRIVATE


	// FUNCTION
	ToggleMute() {
		if(this.#vGlobal.element.volume > 0.0) {
			this.#updateBar(null, 0)
		} else {
			this.#updateBar(null, 100)
		}
	}
	TogglePlay() {
		if(this.#vGlobal.element.paused) {
			this.#vGlobal.element.play()
			this.#vGlobal.is_play = true
		} else {
			this.#vGlobal.element.pause()
			this.#vGlobal.is_play = false
		}
	}

	gClassAdd(val) {
		this.#gContenaire.classList.add(val)
	} 

	gClassRemove(val) {
		this.#gContenaire.classList.remove(val)
	}

	gClassContains(val) {
		return this.#gContenaire.classList.contains(val)
	}

	gAdding(position, html, classs) {
		if(classs !== "")
			this.#gContenaire.querySelector(classs).insertAdjacentHTML(position, html)
		else
			this.#gContenaire.insertAdjacentHTML(position, html)
	}



	// Syeteme
	#is(string, not_string) {
		let extFile = this.#vSettings.chargeExtention

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

	#load_video() {
		this.#vSettings.CurrentExtension = this.#is_extension()
		this.#vSettings.CurrentFileMime = get_mime(this.#vSettings.CurrentExtension)

		this.#vGlobal.element.src = this.#vGlobal.src
		this.#vGlobal.element.currentTime = this.#vGlobal.currentTime

		this.#vGlobal.element.load()
		this.#gContenaire.querySelector('#bar-timerange').innerHTML = ''
	}

	#init_evenement() {
		this.addEvent(window, 'load', () => {
			this.#updateBar(null, this.#vGlobal.element.volume)
		})

		this.addEvent(this.#gContenaire, 'click', (e) => {

			switch(e.target.nodeName) {
				case 'h1':
				case 'A':
				case 'BUTTON':
				case 'SPAN':
					return
					break;
			}

			if(this.#gContenaire.classList.contains('settings')) {				
				if(this.#gContenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
					this.#gContenaire.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'
					this.#gContenaire.querySelector('.option-player-video-translate').classList.remove('focus')
					let allB = this.#gContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
					return
				}
				this.#gContenaire.classList.remove('settings')
			}

			this.TogglePlay()
		})

		this.addEvent(this.#vGlobal.element, 'play', () => {
			this.gClassAdd('video-is-play')
			this.gClassRemove('video-is-pause')
			this.gClassRemove('video-ended')
			if(!this.gClassContains('video-playing'))
				this.gClassAdd('video-playing')

			this.#gContenaire.querySelector('#player_button_pause').innerHTML = iconPause
		})
		this.addEvent(this.#vGlobal.element, 'pause', () => {
			this.gClassRemove('video-is-play')
			this.gClassAdd('video-is-pause')

			this.#gContenaire.querySelector('#player_button_pause').innerHTML = iconPlay
		})
		this.addEvent(this.#vGlobal.element, 'ended', () => {
			this.gClassAdd('video-ended')

			if(this.gClassContains('video-playing'))
				this.gClassRemove('video-playing')
		})

		this.addEvent(this.#vGlobal.element, 'timeupdate', () => {
			this.#event_timeUpdate()

			this.#vGlobal.currentTime = this.#vGlobal.element.currentTime
			
			this.EventViewUpdat()
		})


		this.#vGlobal.element.addEventListener('volumechange', () => {
			if(this.#vGlobal.element.volume > 0.0) {
				this.#gContenaire.querySelector('#player_button_muted').innerHTML = iconUnMute
			} else {
				this.#gContenaire.querySelector('#player_button_muted').innerHTML = iconMute
			}
		})



		//// TMP
		this.addEvent(this.#vControls.progressBarContenaire, 'mouseenter', () => {
			this.#vControls.progressBarContenaire.addEventListener('mousemove', (e) => {
				let progressWidth = this.#vControls.progressBarContenaire.offsetWidth


				var rect = this.#vControls.progressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
				let x = e.clientX - rect.left;
				var time = (x/progressWidth) * this.#vGlobal.element.duration;

				this.#vControls.infoBull.querySelector('.timecode').textContent = this.#intToTime(time)

				if(this.seek_file)
					this.#vControls.infoBull.querySelector('video').currentTime = time

				this.#vControls.infoBull.style.left =  (x)+"px"
				this.#vControls.infoBull.style.display = 'block'
			})
		})

		this.addEvent(this.#vControls.progressBarContenaire, 'mousedown', (e) => {
			let progressWidth = this.#vControls.progressBarContenaire.offsetWidth


			var rect = this.#vControls.progressBarContenaire.getBoundingClientRect(); //todo: optimisation ?
			let x = e.clientX - rect.left;
			var time = (x/progressWidth) * this.#vGlobal.element.duration;

			this.#vGlobal.element.currentTime = time
		})

		this.addEvent(this.#vControls.progressBarContenaire, 'mouseleave', () => {
			this.#vControls.infoBull.style.display = 'none'
		})

		// Mouvement
		let intervalHide = null;

		function setIntervalMouseInPlayer(e) {
			clearInterval(intervalHide);
			intervalHide = setInterval(() => {
				if(e.#vControls.visibilityControler) {
					e.#gContenaire.classList.remove('mouse-in-player')
					e.#vControls.visibilityControler = false
				}
				e.#vControls.visibilityControler = false

				clearInterval(intervalHide);
			}, 5000)
		}

		this.addEvent(this.#gContenaire, 'mouseleave', () => {
			if(this.#gContenaire.classList.contains('player-error'))
				return;

			this.#gContenaire.classList.remove('mouse-in-player')
			this.#vControls.visibilityControler = false

			clearInterval(intervalHide);
		})
		this.addEvent(this.#gContenaire, 'mousemove', () => {
			if(this.#gContenaire.classList.contains('error'))
				return;

			this.#gContenaire.classList.add('mouse-in-player')
			this.#vControls.visibilityControler = true

			setIntervalMouseInPlayer(this)
		})
		this.addEvent(this.#gContenaire.querySelector('.butterfly-player-controleurs .bottom'), 'mouseenter', () => {
			clearInterval(intervalHide);
		})
		this.addEvent(this.#gContenaire.querySelector('.butterfly-player-controleurs .bottom'), 'mouseleave', () => {
			setIntervalMouseInPlayer(this)
		})




		this.addEvent(this.#vGlobal.element, 'progress', () => {
			this.#event_timeUpdate_buffer()

			if(this.#vGlobal.is_play)
		    	this.#vGlobal.element.play()
		})
		this.addEvent(this.#vGlobal.element, 'seeked', () => {
			if(this.#vGlobal.is_play)
		    	this.#vGlobal.element.play()

		    var inc = this.#gContenaire.querySelector('#bar-timerange').offsetWidth / this.#vGlobal.element.duration;
		    for (let i = 0; i < this.#vGlobal.element.buffered.length; i++) {
		      var startX = this.#vGlobal.element.buffered.start(i) * inc;
		      var endX = this.#vGlobal.element.buffered.end(i) * inc;
		      var width = endX - startX;

		      this.#gContenaire.querySelector('#bar-timerange').innerHTML += `<span class="content" style="width: ${width}px; left: ${startX}px;"></span>`
		    }
		    for (let i = 0; i < this.#vGlobal.element.played.length; i++) {
		      var startX = this.#vGlobal.element.played.start(i) * inc;
		      var endX = this.#vGlobal.element.played.end(i) * inc;
		      var width = endX - startX;

		      this.#gContenaire.querySelector('#bar-timerange').innerHTML += `<span class="content played" style="width: ${width}px; left: ${startX}px;"></span>`
		    }
		})
		this.addEvent(this.#vGlobal.element, 'playing', () => {
			if(this.#vGlobal.is_play)
		    	this.#vGlobal.element.play()
		})

		
		//let vi = this.#vGlobal
		this.addEvent(this.#vControls.volumeBarContenaire, 'mousedown', (ev) => {
			this.#vGlobal.volumeDrag = true;
			this.#updateBar(ev.clientX);
		});
		document.addEventListener('mousemove', (ev) => {
			if(this.#vGlobal.volumeDrag){
				this.#updateBar(ev.clientX);
			}
		});
		document.addEventListener('mouseup', (ev) => {
			this.#vGlobal.volumeDrag = false;
		});

		this.addEvent(this.#gContenaire.querySelector('#player_button_pause'), 'click', () => {
			this.TogglePlay()
		})
		
		this.addEvent(this.#gContenaire.querySelector('#player_button_muted'), 'click', () => {
			this.ToggleMute()
		})


		this.addEvent(this.#gContenaire.querySelector('#setting-video-icon'), 'click', () => {
			if(this.#gContenaire.classList.contains('settings')) {
				this.#gContenaire.classList.remove('settings')
				
				if(this.#gContenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
					this.#gContenaire.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'
					this.#gContenaire.querySelector('.option-player-video-translate').classList.remove('focus')
					let allB = this.#gContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
				}
			}
			else
				this.#gContenaire.classList.add('settings')
		})

		this.addEvent(this.#gContenaire.querySelector('#player_button_fullscreen'), 'click', () => {
			this.toggleFullScreen()
		})






		let allQuality = this.#gContenaire.querySelectorAll('ul#quality li')
		allQuality.forEach((e) => {
			this.addEvent(e, 'click', () => {
				if(this.#gContenaire.classList.contains('error'))
					return;

				this.#gContenaire.classList.remove('settings')
				let elkement = e.querySelector('span')
				
				this.#vSettings.currentQuality = elkement.dataset.qualityId

				this.#gContenaire.querySelector('#quality-current').textContent = elkement.dataset.qualityId

				if(this.onQualityChange)
					this.onQualityChange()

				this.#load_video()
				
				if(this.#gContenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
					this.#gContenaire.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'
					this.#gContenaire.querySelector('.option-player-video-translate').classList.remove('focus')

					let allB = this.#gContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
				}
			})
		})


		let allaudio = this.#gContenaire.querySelectorAll('ul#audio li')
		allaudio.forEach((e) => {
			this.addEvent(e, 'click', () => {
				if(this.#gContenaire.classList.contains('error'))
					return;

				this.#gContenaire.classList.remove('settings')
				let elkement = e.querySelector('span')
				
				//this.#vGlobal.currentAudio = elkement.dataset.audioId
				//this.#vGlobal.src = elkement.dataset.audioInit
				//console.log(elkement.dataset.audioInit)
				//console.log(this.#vGlobal.src)

				if(this.onAudioChange)
					this.onAudioChange(elkement.dataset.audioInit)
				else
					this.#vGlobal.src = elkement.dataset.audioInit

				this.#load_video()

				this.#gContenaire.querySelector('#audio-current').textContent = elkement.textContent
				this.#vSettings.currentAudio = elkement.textContent

				if(this.#gContenaire.querySelectorAll('.option-player-video-translate.focus').length > 0) {
					this.#gContenaire.querySelector('.option-player-video-translate').style.transform = 'translateX(0px)'
					this.#gContenaire.querySelector('.option-player-video-translate').classList.remove('focus')

					let allB = this.#gContenaire.querySelectorAll('.option-player-video-content.right .setting-info')
					allB.forEach((e) => {
						e.style.display = "none"
					})
				}
			})
		})


		let allLang = this.#gContenaire.querySelectorAll('ul#subtitle li.button')
		let con = 0
		allLang.forEach((e) => {
			if(con < (allLang.length-1)) {
				let id = e.querySelector('span').dataset.id

				this.#vGlobal.element.textTracks[id].removeEventListener('cuechange', null)
				this.#gContenaire.querySelector('.trackText').style.display = "none"
				this.#vGlobal.element.textTracks[id].mode = 'hidden'
				this.#vGlobal.element.textTracks[id].mode = 'disabled'
			}

			e.addEventListener('click', () => {
				if(this.#gContenaire.classList.contains('error'))
					return;

				this.#gContenaire.classList.remove('settings')
				let elkement = e.querySelector('span')

				if(elkement.dataset.id == 'off') {
					this.#gContenaire.querySelector('#lang-current').textContent = "Off"
					this.#vSettings.currentSubtitle = "Off"
					let aco = 0;
					allLang.forEach((ee) => {
						if(aco < (allLang.length-1)) {
							let idaa = ee.querySelector('span').dataset.id
							
							this.#vGlobal.element.textTracks[idaa].removeEventListener('cuechange', null)
							this.#gContenaire.querySelector('.trackText').style.display = "none"
							this.#vGlobal.element.textTracks[idaa].mode = 'disabled' 
						}
						aco++
					})
					return
				}

				this.#vGlobal.currentTrack = this.#vGlobal.element.textTracks[elkement.dataset.id]
				this.#vGlobal.currentTrack.mode = 'hidden'
				
				this.#init_event_subtitle()

				this.#gContenaire.querySelector('#lang-current').textContent = elkement.dataset.name
				this.#vSettings.currentSubtitle = elkement.dataset.name
				//this.hide_setting_menu()
			})
			con++
		})



		this.#gContenaire.querySelector('.icon-button#less-font-st').addEventListener('click', () => {
			console.log('clicked')
			this.#vGlobal.fontSizeSubtitle--

			this.#gContenaire.querySelector('#font-st').textContent = this.#vGlobal.fontSizeSubtitle

			this.#gContenaire.querySelector('.trackText').style.fontSize = this.#vGlobal.fontSizeSubtitle+'px'
			this.#gContenaire.querySelector('.trackText').style.lineHeight = (this.#vGlobal.fontSizeSubtitle+5)+'px'


		})

		this.#gContenaire.querySelector('.icon-button#plus-font-st').addEventListener('click', () => {
			this.#vGlobal.fontSizeSubtitle++

			this.#gContenaire.querySelector('#font-st').textContent = this.#vGlobal.fontSizeSubtitle

			this.#gContenaire.querySelector('.trackText').style.fontSize = this.#vGlobal.fontSizeSubtitle+'px'
			this.#gContenaire.querySelector('.trackText').style.lineHeight = (this.#vGlobal.fontSizeSubtitle+5)+'px'


		})
	}


	addEvent(element, action, callback, is_query) {
		let element_add_event = element
		if(is_query)
			element_add_event = this.#gContenaire.querySelector(element)


		element_add_event.addEventListener(action, callback)

		this.initEventNumber++;
	}

	removeEvent(element, action, callback, is_query) {
		let element_add_event = element
		if(is_query)
			element_add_event = this.#gContenaire.querySelector(element)


		element_add_event.addEventListener(action, callback)

		this.initEventNumber--;
		this.EventViewUpdat()
	}

	EventViewUpdat() {
		this.#gContenaire.querySelector('#count-event').textContent = this.initEventNumber+" - event loaded"
		this.#gContenaire.querySelector('#volume-info').textContent = "Volume "+(this.#vGlobal.element.volume*100).toFixed(2)+"%"
		this.#gContenaire.querySelector('#video-quality').textContent = "Video "+this.#vSettings.currentQuality
		this.#gContenaire.querySelector('#video-audio').textContent = "Lang "+this.#vSettings.currentAudio
		this.#gContenaire.querySelector('#video-currentTime').textContent = "Current Time "+this.#vGlobal.currentTime.toFixed(2)+" / "+this.#vGlobal.element.duration.toFixed(2)
		this.#gContenaire.querySelector('#video-subtitle').textContent = "Subtitle "+this.#vSettings.currentSubtitle
		if(this.#vGlobal.element.paused)
			this.#gContenaire.querySelector('#video-statut').textContent = "Status PAUSE"
		else
			this.#gContenaire.querySelector('#video-statut').textContent = "Status PLAY"
	}


	#event_timeUpdate() {
		let videoCurrentTime =  (this.#vGlobal.element.currentTime / this.#vGlobal.element.duration) * 100;
		this.#vControls.progressBarReaded.style.width = videoCurrentTime+"%"

		this.#gContenaire.querySelector('#videoCurrentTime').textContent =  this.#intToTime(this.#vGlobal.element.currentTime)
		this.#gContenaire.querySelector('#videoDuration').textContent =  this.#intToTime(this.#vGlobal.element.duration)
	}

	#event_timeUpdate_buffer() {
		var duration = this.#vGlobal.element.duration;
		var videoElement = this.#vGlobal.element;

		if (duration > 0) {
			for (var i = 0; i < videoElement.buffered.length; i++) {
				if (
					videoElement.buffered.start(videoElement.buffered.length - 1 - i) <
					videoElement.currentTime
				) {
				//console.log(this.#vControls.progressBarBuffered)
					this.#vControls.progressBarBuffered.style.width =
						(videoElement.buffered.end(videoElement.buffered.length - 1 - i) / duration) *
						100 +
						"%";
					break;
				}
			}
		}
	}

	#updateBar(x, vol) {
		var volume = this.#vControls.volumeBarContenaire;
		var percentage;
		//if only volume have specificed
		//then direct update volume
		if (vol) {
			percentage = vol * 100;
		} else {
			var rect = this.#vControls.volumeBarContenaire.getBoundingClientRect();

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
		this.#vControls.volumeBarSlider.style.width = percentage +'%';
		this.#vGlobal.element.volume = percentage / 100;

		if((percentage / 100) > 0.0) {
			this.#gContenaire.querySelector('#player_button_muted').innerHTML = iconUnMute
		} else {
			this.#gContenaire.querySelector('#player_button_muted').innerHTML = iconMute
		}

		if (!vol)
			this.#vControls.currentVolume = percentage / 100
	}


	#intToTime(int) {
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


	setting_get(name, element, classeName, classUl) {
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

	toggleFullScreen() {
		video_resize(this.#gContenaire, this.#vGlobal.element)

		if(!this.inFullScreen) {
			if (this.#gContenaire.requestFullscreen) {
				this.#gContenaire.requestFullscreen();
			} else if (this.#gContenaire.webkitRequestFullscreen) { /* Safari */
				this.#gContenaire.webkitRequestFullscreen();
			} else if (this.#gContenaire.msRequestFullscreen) { /* IE11 */
				this.#gContenaire.msRequestFullscreen();
			}
			this.inFullScreen = true
			this.#gContenaire.classList.add('fullscreen')
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
			this.#gContenaire.classList.remove('fullscreen')
		}
	}