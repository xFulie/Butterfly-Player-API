ToggleMute() {
	if(this.#vGlobal.error)
		return;

	if(this.#vGlobal.element.volume > 0.0) {
		this.vVolume = 0;
	} else {
		this.vVolume = 1;
	}
}
TogglePlay() {
	if(this.#vGlobal.error)
		return;

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
	if(classs !== "") {
		if(!this.#gContenaire.querySelector(classs))
			return;

		this.#gContenaire.querySelector(classs).insertAdjacentHTML(position, html)
	}
	else
		this.#gContenaire.insertAdjacentHTML(position, html)
}

is_extension() {
  if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
    return this.#is(this.#vSettings.chargeExtention, 'mp4')
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    return this.#is(this.#vSettings.chargeExtention, 'mp4')
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return this.#is(this.#vSettings.chargeExtention, 'webm')
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return this.#is(this.#vSettings.chargeExtention, 'mp4')
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return this.#is(this.#vSettings.chargeExtention, 'webm')
  } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
  {
    return this.#is(this.#vSettings.chargeExtention, 'mp4')
  } else {
    return null;
  }
}

addEvent(element, action, callback, is_query) {
	let element_add_event = element
	if(is_query) {
		element_add_event = this.#gContenaire.querySelector(element)
	}

	if(!element_add_event) {
		return;
	}

	//console.log(element_add_event, action)

	element_add_event.addEventListener(action, (event) => {
		//console.log('Event active')
		callback(event)
		//console.log('Event active x2')
	})

	this.initEventNumber++;
}

removeEvent(element, action, callback, is_query) {
	let element_add_event = element
	if(is_query)
		element_add_event = this.#gContenaire.querySelector(element)

	if(!element_add_event)
		return;

	element_add_event.addEventListener(action, callback)

	this.initEventNumber--;
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
}


setting_get(name, element, classeName, classUl, current) {
	let element_changer = element.parentNode.parentNode

	if(element_changer.classList.contains(classeName)) {
		element_changer.classList.remove(classeName)
	} else {
		element_changer.classList.add(classeName)

		element_changer.querySelector(`.option-player-video-content.right #`+classUl).style.display = "block"
		element_changer.querySelector('.option-player-video-content.right #menu-title').innerHTML = `<span>${name}</span><span class="generate-change">${current}</span>`
		element_changer.style.transform = 'translateX(-'+element_changer.offsetWidth+'px)'
	}
}

toggleFullScreen() {
	if(this.#vGlobal.error)
		return;

	this.#video_resize()

	if(!this.inFullScreen) {
		if (this.#gContenaire.requestFullscreen) {
			this.#gContenaire.requestFullscreen();
		} else if (this.#gContenaire.webkitRequestFullscreen) { /* Safari */
			this.#gContenaire.webkitRequestFullscreen();
		} else if (this.#gContenaire.msRequestFullscreen) { /* IE11 */
			this.#gContenaire.msRequestFullscreen();
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