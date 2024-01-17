class blueberryConfig extends blueberryEvenement {
	button(cssSelector, callback, isKernel) {
		//console.log(this[callback])
		let myFunction = this[callback];
		if(isKernel) {
			myFunction = callback()
		}

		this.addEvent(cssSelector, 'click', (event) => {
			if(isKernel) {
				callback(event)
			} else {
				this[callback](event)
			}
		}, true)
	}

	keydown(keyCode, callback, isKernel) {
		let func = (event, code) => {
			if(event.key == code) {
				event.preventDefault()

				callback(event)
			}
		}
		if(Array.isArray(keyCode)) {
			keyCode.forEach((keyCodeEach) => {
				this.addEvent(window, 'keydown', (event) => { func(event, keyCodeEach) })
			})
			return
		}

		this.addEvent(window, 'keydown', (event) => { func(event, keyCode) })
	}

	updateText(cssSelector, texte, iscssSelector = true) {
		let elementEvent = cssSelector
		if(iscssSelector) {
			elementEvent = this.ConstructorElement.querySelector(cssSelector);
		}

		if(!elementEvent) {
			console.error(`Imposible de charger l'évenement sur un noeud inéxistant. :`, elementEvent)
			return;
		}

		elementEvent.textContent = texte
	}

	getElement(cssSelector) {
		return this.ConstructorElement.querySelector(cssSelector)
	}
}


// this.Kernel.button('#monButton', 'togglePlay', false)