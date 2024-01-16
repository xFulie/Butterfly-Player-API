const Player = new class {
	static kernel = null

	userSet = null

	///
	configCurrent = {
		'extension': 'mp4',
		'src': '',

		'height': '',
		'width': '',
	}

	progressBar = {
		'element': null,
		'read': null,
		'write': null
	}

	playerTitle = 'Vous regardez'
	playerSubTitle = ''

	link_css_player = '//floagg.info/package/player-css@release-butterfly'
	//link_css_player_kernel = '//floagg.info/package/player-css@release-butterfly'

	set(tags_contenaire_for_player, setting_obj) {
		this.kernel = new Melon(tags_contenaire_for_player)

		this.userSet = setting_obj

		if(this.userSet['height'] && this.userSet['width']) {
			this.configCurrent['height'] = this.userSet['height']
			this.configCurrent['width'] = this.userSet['width']
		}


		if(this.userSet['init']) {
			this.configCurrent['src'] = this.userSet['init']
		}

		if(this.userSet['quality']) {
			this.kernel.list_quality = this.userSet['quality']
		}

		if(this.userSet['audio']) {
			this.kernel.list_audio = this.userSet['audio']
		}

		if(this.userSet['title']) {
			this.playerTitle = this.userSet['title']
		}

		if(this.userSet['sub_title']) {
			this.playerSubTitle = this.userSet['sub_title']
		}

		if(this.userSet['subtitle']) {
			this.kernel.list_subtitle = this.userSet['subtitle']
		}

		if(this.userSet['thumbnail']) {
			this.thumbnail = this.userSet['thumbnail']
		}

		if(this.userSet['intro_skipping']) {
			this.intro_skipping = this.userSet['intro_skipping']
		}


		this.kernel.contenaire_height = `${this.configCurrent['height']}px`
		this.kernel.contenaire_width = `${this.configCurrent['width']}px`
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

		this.kernel.currentQuality = '720p'
		if(this.userSet['audio'][0]) {
			this.kernel.currentAudio = this.userSet['audio'][0]['id']
			this.kernel.set_src = this.userSet['audio'][0]['init']+this.kernel.currentQuality+'.'+this.configCurrent['extension']
		}

		this.kernel.thumbnail = this.thumbnail

		this.kernel.onQualityChange = () => {
			this.kernel.set_src = this.kernel.video_src+this.kernel.currentQuality+'.'+this.configCurrent['extension']
		}
		this.kernel.onAudioChange = () => {
			this.kernel.set_src = this.kernel.video_src+this.kernel.currentQuality+'.'+this.configCurrent['extension']
		}

		this.kernel.onVideoEnded = () => {
			this.kernel.globalContenaire.querySelector('.logo-media img').src = this.kernel.thumbnail;
		}
		this.kernel.onVideoPlay = () => {
			this.kernel.globalContenaire.querySelector('.logo-media img').src = '' //'https://i.pinimg.com/originals/ce/c8/77/cec877e538c38197190bcba2249323f5.png';
		}

		this.kernel.onVideoTimeUpdate = () => {
			if(
				(this.kernel.video_currentTime > this.intro_skipping[0])
				&&
				(this.kernel.video_currentTime < this.intro_skipping[1])
			) {
				this.kernel.globalClassRemove('player-button-is-skipped')
			} else {
				this.kernel.globalClassAdd('player-button-is-skipped')
			}
		}

		this.kernel.init_video()

		if(this.userSet['volume']) {
			this.kernel.mute = this.userSet['volume']
		}
		let html = `<div class="info_file">`
			html += `<h2>${this.playerSubTitle}</h2>`
			html += `<h1 id="filename">${this.playerTitle}</h1>`
		html += `</div>`

		let html_md = `<div class="logo-media">`
			html_md += `<img src="">`
			html_md += `<button class="player_button_pause">${iconReresh}<span>Replay video<span></button>`
		html_md += `</div>`

		this.kernel.joinElementToControler('beforeend', html, '.butterfly-player-controleurs .top')
		this.kernel.joinElementToControler('beforeend', html_md, '')

		this.kernel.joinElementToControler('beforeend', `<div class="player-button"><a id="skip_intro_video">Passer l'introduction</a></div>`, '')

		this.#load_event()
	}

	#load_event() {
		this.kernel.addVideoEvent('timeupdate', (event) => {
			this.kernel.set_pbRead = this.kernel.progressBar.read
		})

		this.kernel.addVideoEvent('progress', (event) => {
			this.kernel.set_pbBuffered = this.kernel.progressBar.buffered
		})

		this.kernel.addEvent('button.player_button_pause', 'click', () => {
			this.kernel.play()
		}, true)

		this.kernel.addEvent('#skip_intro_video', 'click', () => {
			console.log('click')
			if(this.intro_skipping)
				this.kernel.video_currentTime = this.intro_skipping[1]
		}, true)
	}

	plugin() {}
}