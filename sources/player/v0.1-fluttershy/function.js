	hide_setting_menu() {
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
	}
	
	init_fullscreen() {
		if(!this.inFullScreen) {
			if (this.playerContenaire.requestFullscreen) {
				this.playerContenaire.requestFullscreen();
			} else if (this.playerContenaire.webkitRequestFullscreen) { /* Safari */
				this.playerContenaire.webkitRequestFullscreen();
			} else if (this.playerContenaire.msRequestFullscreen) { /* IE11 */
				this.playerContenaire.msRequestFullscreen();
			}
			this.inFullScreen = true
			this.playerContenaire.classList.add('fullscreen')
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
			this.playerContenaire.classList.remove('fullscreen')
		}
	}

	init_play() {
		if(this.videoPlayer.paused) {
			this.videoPlayer.play()
			this.isPlay = true
			this.infoBull_message("Lecture lancé")
		} else {
			this.videoPlayer.pause()
			this.isPlay = false
			this.infoBull_message("Lecture arrété")
		}
	}
	init_mute() {
		if(this.videoPlayer.muted) {
			this.videoPlayer.muted = false;
			this.playerContenaire.querySelector('#player_button_muted').innerHTML = iconUnMute
			this.infoBull_message("Son activer")
		}
		else {
			this.videoPlayer.muted = true;
			this.playerContenaire.querySelector('#player_button_muted').innerHTML = iconMute
			this.infoBull_message("Son désactiver")
		}
	}





	infoBull_message(message, time = 5000) {
		clearTimeout(this.timerMessage)

		this.bullAction.textContent = message
		this.bullAction.classList.add('visible')
		this.timerMessage = setTimeout(() => {
			this.bullAction.classList.remove('visible')
		}, time)
	}


	skip(number_frames, action = '') {
		switch(action) {
			case '+':
				this.videoPlayer.currentTime += number_frames
				break;
			case '-':
				this.videoPlayer.currentTime -= number_frames
				break;
			default:
				this.videoPlayer.currentTime = number_frames
				break;
		}

		this.infoBull_message("Skip "+action+number_frames)
	}


	copy(value) {
		navigator.clipboard.writeText(value).then()
	}
}
/*
 *
 * Constance Functions
 *
 */
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

	console.log('size change')
}

function is(string, not_string) {
	let extFile = Player.playerExtension

	if(extFile.find((element) => string == element))
		return string;
	return not_string;
}

function is_extension() {
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
    return is(['webm', 'avi'], 'mp4')
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    return is(['webm', 'avi'], 'mp4')
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return is(['webm', 'avi'], 'mp4')
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return is(['webm', 'avi'], 'mp4')
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return is(['webm', 'avi'], 'mp4')
  } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
  {
    return is(['avi', 'mp4'], 'mp4')
  } else {
    return null;
  }
}

function update_currentTime(videoPlayer, playerContenaire) {
	const videoPressBar = playerContenaire.querySelector('.progress-bar .content-bar')
	const videoPressBarContenaire = playerContenaire.querySelector('.progress-bar')

	videoCurrentTime =  (videoPlayer.currentTime / videoPlayer.duration) * 100;
	videoPressBar.style.width = videoCurrentTime+"%"

	playerContenaire.querySelector('#videoCurrentTime').textContent =  intToTime(videoPlayer.currentTime)
	playerContenaire.querySelector('#videoDuration').textContent =  intToTime(videoPlayer.duration)
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

function class_changer(element_changer, classeName) {
	//let element_changer = Player.playerContenaire.querySelector(element)

	if(element_changer.classList.contains(classeName)) {
		element_changer.classList.remove(classeName)
	} else {
		element_changer.classList.add(classeName)
	}
}

function setting_get(name, element, classeName, classUl) {
	let element_changer = element.parentNode.parentNode

	if(element_changer.classList.contains(classeName)) {
		element_changer.classList.remove(classeName)
	} else {
		element_changer.classList.add(classeName)

		element_changer.querySelector(`.option-player-video-content.right #`+classUl).style.display = "block"
		element_changer.querySelector('.option-player-video-content.right').style.display = "block"
		element_changer.querySelector('.option-player-video-content.right #menu-title').textContent = name
		element_changer.querySelector('.option-player-video-content.left').style.display = "none"
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


function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}