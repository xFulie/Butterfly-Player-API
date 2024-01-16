const Player = new class {
	globalObjSet = []
	playerContenaire = ''
	videoPlayer = null

	isPlay = false


	link_css_player = '//floagg.info/package/player-css@release-butterfly'


	playerSubtitleList_Track = ''
	playerQualityList_Button = ''
	playerAudioList_Button = ''


	globalHtmlQualityButtons = ""
	globalHtmlSubtitleButtons = ""
	globalHtmlAudioButtons = ""

	globalHtmlQuality = ""
	globalHtmlSubtitle = ""
	globalHtmlAudio = ""

	muted = false
	loop = false

	colorPlayer = "#fff"
	colorPlayerText = "#000"

	idTrack = null

	fontSizeSubtitle = 28

	playerSubTitle = 'Vous regardez'

	set(tags_contenaire_for_player, setting_obj) {
		this.globalObjSet = setting_obj
		this.playerContenaire = document.querySelector(tags_contenaire_for_player)

		// Size player Height & Width
		if(setting_obj['height'] && setting_obj['width']) {
			this.playerHeight = setting_obj['height']
			this.playerWidth = setting_obj['width']
		}

		if(setting_obj['sub_title'])
			this.playerSubTitle = setting_obj['sub_title']

		if(setting_obj['title'])
			this.playerTitle = setting_obj['title']

		if(setting_obj['intro_skipping'])
			this.intro_skipping = setting_obj['intro_skipping']
		
		// Vidéo parametter

		if(setting_obj['thumbnail'])
			this.filePlayerThumbnail = setting_obj['thumbnail']

		if(setting_obj['muted'])
			this.muted = setting_obj['muted']

		if(setting_obj['loop'])
			this.loop = setting_obj['loop']

		if(setting_obj['autoPlay'])
			this.autoPlay = setting_obj['autoPlay']

		if(setting_obj['seek_file'])
			this.seek_file = setting_obj['seek_file']

		this.playerExtension = this.globalObjSet['extension']
	}

	// Render
	load() {
		// Initalisation du contenaire Size & Display = none
		this.playerContenaire.style.display = "none"
		this.playerContenaire.style.height = this.playerHeight+"px"
		this.playerContenaire.style.width = this.playerWidth+"px"

		// Création de la classe
		this.playerContenaire.classList.add('floagg-video-player_contenaire-player', 'skipped', 'pause')

		document.querySelector('head').insertAdjacentHTML(
			'beforeend',
			`<style type="text/css">:root { --color-primary-player-butterfly: ${this.colorPlayer}; --color-text-player-butterfly: ${this.colorPlayerText}; }</style>`
		)
		document.querySelector('head').insertAdjacentHTML(
			'beforeend',
			`<link rel="stylesheet" type="text/css" href="${this.link_css_player}">`
		)


		this.init_quality()
		this.init_audio()
		this.init_subtitle()
		this.graph()

		window.onload = () => {
			this.playerContenaire.style.display = "flex"
			video_resize(this.playerContenaire, this.videoPlayer)

			let is_error = this.videoPlayer.canPlayType(this.playerMime)
			console.log(is_error, this.playerMime)

			if(is_error == "") {
				this.playerContenaire.classList.add('error')
				this.loadError(this.playerMime+" is not accepted.")

				return
			}

			if(!this.videoPlayer.muted) {
				this.playerContenaire.querySelector('#player_button_muted').innerHTML = iconUnMute
			} else {
				this.playerContenaire.querySelector('#player_button_muted').innerHTML = iconMute
			}

			this.init_allEvent()

			if(this.autoPlay) {
				this.videoPlayer.play()
			}
		}

		window.onresize = () => {
			video_resize(this.playerContenaire, this.videoPlayer)
		}
	}

	graph() {
		// HTML du player
		let playerHTML = `<span class="loading-bubul"></span>`
		playerHTML += `<div class="video-controler">`
			playerHTML += `<div class="top">`
				if(this.playerTitle) {
					playerHTML += `<div class="info_file">`
						playerHTML += `<h2>${this.playerSubTitle}</h2>`
						playerHTML += `<h1 id="filename">${this.playerTitle}</h1>`
					playerHTML += `</div>`
				}

				playerHTML += `<div class="option-video">`
					playerHTML += `<section class="option-player-video">`
						playerHTML += `<section class="option-player-video-content left">`
							playerHTML += this.globalHtmlQuality
							playerHTML += this.globalHtmlAudio
							playerHTML += this.globalHtmlSubtitle
							playerHTML += `<div class="option-button quality-changer">`
									+`<span class="current qulity-current" onClick="setting_get('V${systeme_version} ${systeme_name} ${systeme_environement}', this.parentNode, 'focus', 'legal-notice')">`
										+`<span class="title">Information sur le player</span>`
									+`</span>`
							+`</div>`
						playerHTML += `</section>`
						playerHTML += `<section class="option-player-video-content right">`
							playerHTML += `<section class="setting-head">`
								playerHTML += `<div class="button-icon">${iconLess}</div>`
								playerHTML += `<span id="menu-title">Menu</span>`
							playerHTML += `</section>`
							playerHTML += this.globalHtmlQualityButtons
							playerHTML += this.globalHtmlSubtitleButtons
							playerHTML += this.globalHtmlAudioButtons
							playerHTML += `<div class="setting-info" id="legal-notice">`
								playerHTML += `<p>Butterfly Player API</p>`
								playerHTML += `<p>- Kernel 1.03 - Lemon</p>`
								playerHTML += `<p>- V${systeme_version} ${systeme_name} ${systeme_environement}</p>`
								playerHTML += `<p>By 'heart_butterfly' - Floagg Entreprise EI</p>`
								playerHTML += systeme_changelogs
							playerHTML += `</div>`
						playerHTML += `</section>`
					playerHTML += `</section>`
				playerHTML += `</div>`

			playerHTML += `</div>`

			playerHTML += `<div class="bottom">`

				playerHTML += `<div class="left">`
					playerHTML += `<ul>`
						playerHTML += `<li><a id="player_button_pause">${iconPlay}</a></li>`
						playerHTML += `<li><a id="player_button_muted">${iconMute}</a></li>`
					playerHTML += `</ul>`
				playerHTML += `</div>`

				playerHTML += `<div class="center">`
					playerHTML += `<span class="infobull-progressbar">`
						if(this.seek_file) {
							playerHTML += `<video src="${this.seek_file}" muted width="200px"></video>`
						}
						playerHTML += `<span class="timecode">00:00</span>`
					playerHTML += `</span>`
					playerHTML += `<span class="progress-bar">`
						playerHTML += `<span class="content-bar"></span>`
						playerHTML += `<span class="beta-bar"></span>`
					playerHTML += `</span>`
				playerHTML += `</div>`

				playerHTML += `<div class="right">`
					playerHTML += `<ul>`
						playerHTML += `<li>`
							playerHTML += `<div class="info-video">`
								playerHTML += `<span id="videoCurrentTime">00:00</span>`
								playerHTML += `<span>/</span>`
								playerHTML += `<span id="videoDuration">00:00</span>`
							playerHTML += `</div>`
						playerHTML += `</li>`
						playerHTML += `<li><a class="setting-button-icon" id="setting-video-icon">${iconSetting}</a></li>`
						playerHTML += `<li><a id="player_button_fullscreen">${iconFullscreen}</a></li>`
					playerHTML += `</ul>`
				playerHTML += `</div>`

			playerHTML += `</div>`
		playerHTML += `</div>`

		playerHTML += `<div class="bull-info-action-player">...</div>`

		playerHTML += `<div class="menu-deroulant-for-player"  id="context-menu">`
			playerHTML += `<ul>`
				playerHTML += `<li><a onclick="Player.copy(Player.videoCurrentTime)"><span class="icon">${iconSetting}</span><span class="text">Copier 'currentTime'</span></a></li>`
				playerHTML += `<li><a onclick="Player.init_play()"><span class="icon">${iconPlay}</span><span class="text">Play/Pause</span></a></li>`
				playerHTML += `<li><a onclick="Player.init_mute()"><span class="icon">${iconUnMute}</span><span class="text">Mute/Unmute</span></a></li>`
				playerHTML += `<li><a onclick="Player.init_fullscreen()"><span class="icon">${iconFullscreen}</span><span class="text">Fullscreen</span></a></li>`
			playerHTML += `</ul>`
		playerHTML += `</div>`

		playerHTML += `<video `
		if(this.muted)
			playerHTML += `muted `
		if(this.loop)
			playerHTML += `loop `
		playerHTML += `id="video_player"`
		playerHTML += `src="${this.filePlayer}" `
		playerHTML += `poster="${this.filePlayerThumbnail}">`
			playerHTML += `${this.playerSubtitleList_Track}`
		playerHTML += `</video>`

		if(this.intro_skipping)
			playerHTML += `<div class="player-button"><a id="skip_intro_video">Passer l'introduction</a></div>`

		playerHTML += `<div class="trackText" style="font-size: ${this.fontSizeSubtitle}px; line-height: ${this.fontSizeSubtitle+5}px;"></div>`

		this.playerContenaire.innerHTML = playerHTML

		// Init variable Message_player & videoPlayer
		this.videoPlayer = document.getElementById('video_player')
		this.bullAction = this.playerContenaire.querySelector('.bull-info-action-player')
		this.videoPressBar = this.playerContenaire.querySelector('.progress-bar .content-bar')

		this.videoPressBarContenaire = this.playerContenaire.querySelector('.progress-bar')
		this.playerInfobull = this.playerContenaire.querySelector('.infobull-progressbar')
	}


	loadError(r = this.videoPlayer.error.code) {
		// HTML du player
		let playerHTML = `<div class="video-controler-for-error">`
			playerHTML += `<img src="https://xn--rparation-tv-beb.fr/wp-content/uploads/2022/10/TV-Cassee-v2.png" width="200">`
			playerHTML += `<section>`
				playerHTML += `<h2>Erreur de lecture</h2>`
				playerHTML += `<p>Il semblerait que le fichier ne peut etre lue :/</p>`
				playerHTML += `<p>ERROR : ${r} {Butterfly - v1.03}</p>`
			playerHTML += `</section>`
		playerHTML += `</div>`
		this.playerContenaire.innerHTML += playerHTML
	}





	init_quality() {
		this.playerFile = this.globalObjSet['init']

		this.playerQuality = this.globalObjSet['quality']
		if(this.globalObjSet['defaultQuality'])
			this.playerCurrentQuality = this.globalObjSet['defaultQuality']
		else
			this.playerCurrentQuality = this.playerQuality[0]

		this.playerExtension = this.globalObjSet['extension']
		this.playerCurrentExtension = is_extension()
		this.playerMime = get_mime(this.playerCurrentExtension)

		if(this.pluginQualityReplace) {
			this.pluginQualityReplace(this.globalObjSet)
		} else {
			this.filePlayer = this.playerFile+this.playerCurrentExtension
		}

		this.globalHtmlQuality = `<div class="option-button quality-changer">`
									+`<span class="current qulity-current" onClick="setting_get('Qualité vidéo', this.parentNode, 'focus', 'quality')">`
										+`<span class="title">Qualité</span>`
										+`<span class="generate-change" id="quality-current">${this.playerCurrentQuality}</span>`
									+`</span>`
							+`</div>`

		let i = 0;
		this.globalHtmlQualityButtons = '<ul class="setting-info" id="quality">'
		this.playerQuality.forEach((e) => {
			this.globalHtmlQualityButtons += `<li class="button-hover"><span class="button-change button-change-quality" data-quality-id="${e}">${e}</span></li>`
			i++
		})
		this.globalHtmlQualityButtons += '</ul>'
	}
	
	init_subtitle() {

		if(this.globalObjSet['subtitle'] == undefined) {
			return;
		}
		this.playerSubtitle = this.globalObjSet['subtitle']

		this.globalHtmlSubtitle = `<div class="option-button lang-changer">`
									+`<span class="current lang-current" onClick="setting_get('Sous-titre', this.parentNode, 'focus', 'subtitle')">`
										+`<span class="title">Sous-titre</span>`
										+`<span class="generate-change" id="lang-current">Off</span>`
									+`</span>`
									+`</div>`

		let i = 0;
		this.globalHtmlSubtitleButtons = '<ul class="setting-info" id="subtitle">'
		this.globalHtmlSubtitleButtons += `<li class="button-change-font"><span class="icon-button button-hover" id="less-font-st">${iconLess}</span><span id="font-st">${this.fontSizeSubtitle}</span><span class="icon-button button-hover" id="plus-font-st">${iconPlus}</span></li>`
		this.playerSubtitle.forEach((e) => {
			this.playerSubtitleList_Track += `<track default kind="captions" srclang="${e.lang}" src="${e.url}" data-name="${e.name}" />`
			this.globalHtmlSubtitleButtons += `<li class="button button-hover"><span class="button-change button-change-lang" data-id="${i}" data-name="${e.name}">${e.name}</span></li>`
			i++
		})
		this.globalHtmlSubtitleButtons += `<li class="button button-hover"><span class="button-change button-change-lang" data-id="off">Off</span></li>`
		this.globalHtmlSubtitleButtons += '</ul>'
	}

	init_audio() {
		if(this.globalObjSet['audio'] == undefined) {
			return;
		}

		this.playerAudio = this.globalObjSet['audio']
		this.playerCurrentAudio = this.playerAudio[0]
		this.playerFile = this.playerAudio[0]['init']

		if(this.pluginQualityReplace) {
			this.pluginQualityReplace(this.globalObjSet)
		} else {
			this.filePlayer = this.playerFile+this.playerCurrentExtension
		}

		this.globalHtmlAudio = `<div class="option-button audio-changer">`
									+`<span class="current audio-current" onClick="setting_get('Audio de la vidéo', this.parentNode, 'focus', 'audio')">`
										+`<span class="title">Audio</span>`
										+`<span class="generate-change" id="audio-current">${this.playerAudio[0]['name']}</span>`
									+`</span>`
							+`</div>`

		let i = 0;
		this.globalHtmlAudioButtons = '<ul class="setting-info" id="audio">'
		this.playerAudio.forEach((e) => {
			this.globalHtmlAudioButtons += `<li class="button-hover"><span class="button-change button-change-audio" data-audio-init="${e.init}" data-audio-id="${e.id}">${e.name}</span></li>`
			i++
		})
		this.globalHtmlAudioButtons += '</ul>'
	}

	change_quality() {

		if(this.pluginQualityReplace) {
			this.pluginQualityReplace(this.globalObjSet)
		} else {
			this.filePlayer = this.globalObjSet['init']+this.playerCurrentExtension
		}

		this.videoPlayer.src = this.filePlayer
		this.videoPlayer.currentTime = this.videoCurrentTime
		this.videoPlayer.load()

		this.init_event_subtitle()
	}
	change_audio() {

		if(this.pluginQualityReplace) {
			this.pluginQualityReplace(this.globalObjSet)
		} else {
			this.filePlayer = this.globalObjSet['init']+this.playerCurrentExtension
		}

		this.videoPlayer.src = this.filePlayer
		this.videoPlayer.currentTime = this.videoCurrentTime - 10
		this.videoPlayer.load()

		this.init_event_subtitle()
	}

	plugin(replace_function, callback) {
		switch(replace_function) {
			case 'replace_quality':
				this.pluginQualityReplace = callback
				break;
		}
		//callback(this.globalObjSet)
	}