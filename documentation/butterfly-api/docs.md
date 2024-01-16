# Présentation.
## Exemple interactif

<section class="video-size"><div id="player"></div></section>

Vidéo original [Rockstar mag'](https://www.youtube.com/watch?v=gMr32jqWjSE)

# Introduction.
## Créer un premier lecteur vidéo
Pour créer le lecteur Butterfly, vous devez d'abord appeler le fichier JavaScript avec le code ci-dessous. Il importera toutes les classes, fonctions et variables nécessaires pour créer le lecteur vidéo.

**Versions Stables**
```html
<script type="text/javascript" src="//floagg.info/package/player@release-butterfly"></script>
```


**Versions Beta**
```html
<script type="text/javascript" src="//floagg.info/package/beta-player@v0.7-fluttershy"></script>
```

Une fois que vous avez ajouter les fichier Javascript, vous pouvez ajouter une balise ayant par exemple d'ID égal à player et ajouter cette ligne de code.
```php
Player.set('#player', {
    height: 720,
    width: 1280,
    src: 'https://www.siteweb.com/monfichier.mp4',
    thumbnail: 'https://www.siteweb.com/monfichier.png'
});
```
> Tout action réaliser sur la classe Player ou bien Kernel doit etre mise avant d'appeller le `Player.load()`

> Si vous rencontré un problèmes CSS, ajouter simplement cette ligne `Player.link_css_player = "https://floagg.info/package/stylesheet@v0.3-fluttershy"`

# Tutoriels.
## Configuration avancées
`SettingsObject` attend un Object, celle si peut contenir une liste de paramètre (voir le tableau si-dessous), qui permettra à la Butterfly Player API définir des paramétres pour l'interface ou bien pour noyeaux d'évenement.

```JS
Player.set(CssSelectorElement, SettingsObject)
```

## Ajouter des sous-titres
La Butterfly Player API est capable d'afficher des sous-titres au format VTT seulement pour le moment.

```JS
Player.set('#player', {
    height: 720,
    width: 1280,
    src: 'https://www.siteweb.com/monfichier.mp4',
    thumbnail: 'https://www.siteweb.com/monfichier.png',
    subtitle: [
        {
            name: "Français",
            lang: "fr",
            url: "./mes-sous-titre/frencais.vtt"
        }
    ]
});
```

# Gérer plusieurs qualités
Pour afficher un menu de qualité vidéo, il faudra utiliser le Regex `$({quality})`. La Butterfly Player API remplacera le `$({quality})` par le nom de qualité défini dans le tableau 'quality'.

> Le noyau d'événements vidéo Blueberry ne supporte pas le Regex, cela est géré par la version Fluttershy de la Butterfly Player API.

```JS
Player.set('#player', {

    height: 720,

    width: 1280,

    src: 'https://www.siteweb.com/monfichier_$({quality}).mp4',

    thumbnail: 'https://www.siteweb.com/monfichier.png',

    quality: ['720p', '480p', '360p']

})
```


## Gérer plusieurs langues
Comme pour la gestion de la qualité vidéo, il vous suffit simplement d'ajouter `$({audio})` et la Butterfly Player API remplacera la source vidéo par celle sélectionnée dans le menu vidéos.

> Lorsque l'option/tableau 'audio' est défini, l'option 'src' devient facultative, car le lecteur vidéo va faire passer en priorité la première ligne du tableau 'audio'.

```JS
Player.set('#player', {
    height: 720,
    width: 1280,
    thumbnail: 'https://www.siteweb.com/monfichier.png',
    quality: ['720p', '480p', '360p'],
    audio: [
        {
            id: "vf",
            name: "Français",
            src: 'https://www.siteweb.com/monfichier_$({quality}).mp4'
        }
    ]
})
```

## Gérer plusieurs extensions de fichier vidéo
En ajoutant `$({extension})`, la Butterfly Player API mettra l'extension adaptée au navigateur parmi la liste fournie dans le tableau des extensions.

```JS
Player.set('#player', {
    height: 720,
    width: 1280,
    thumbnail: 'https://www.siteweb.com/monfichier.png',
    quality: ['720p', '480p', '360p'],
    extension: ['mp4', 'webm'],
    audio: [
        {
            id: "vf",
            name: "Français",
            src: 'https://www.siteweb.com/monfichier_$({quality}).$({extension})'
        }
    ]
})
```

# Propriétés initialisation.

## Height
La propriété `height` prend encharge les entier superrieur à 0 ou bien une chaine de caratère entre 'auto' ou 'xxx%', pour mettre à jour la hauteurs du lecteur vidéo.

## Width
La propriété `width` prend encharge les entier superrieur à 0 ou bien une chaine de caratère entre 'auto' ou 'xxx%', pour mettre à jour la largeur du lecteur vidéo.

## Src
La propriété `Src`...

## Thumbnail
La propriété `Thumbnail`...

## Title
La propriété `Title`...

## Sub_title
La propriété `Sub_title`...

## Quality
La propriété `Quality`...


## Extension
La propriété `Extension`...

## Subtitle
La propriété `Subtitle`...

## Audio
La propriété `Audio`...

## DefaultQuality
La propriété `DefaultQuality`...

# Méthodes.

# Évènements.

## Introduction aux évènements
Le Kernel d'événement utilisé par la Butterfly Player API (BPA) fournit des événements personnalisés s'exécutant lorsque le kernel Blueberry réalise une action, que ce soit sur la vidéo ou bien dans les contrôles.

> L'exemple fourni ci-dessous est tiré du code Butterfly Player API, se situant dans la fonction `Player.set(String, Object)` de la classe Player. Celle-ci met à jour la source de la vidéo avec le bon Regex.

```JS
Kernel.onChangeAudio = () => {
    let reg = this.videoSrc
        .replace(/\$\(\{audio\}\)/g, this.videoSrc)
        .replace(/\$\(\{quality\}\)/g, Kernel.vCurrentQuality)
        .replace(/\$\(\{extension\}\)/g, Kernel.vCurrentExtension)
                
    Kernel.vSrc = reg
}
```

|test|teste|aaaa
|----|-----|----
|test|teste|aaaa