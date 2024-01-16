[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/FloaggFrance/Butterfly-Player-API/blob/main/README.md)
[![fr](https://img.shields.io/badge/lang-fr-green.svg)](https://github.com/FloaggFrance/Butterfly-Player-API/blob/main/README.fr.md)

# Butterfly Player API

**Butterfly Player API** est une alternative JavaScript sans dépendance au framework Video.js. Elle vous permet d'intégrer facilement un lecteur vidéo à votre site internet.

**La Butterfly Player API** est un thème démontrant les capacités du gestionnaire d'événements **Blueberry V0.3**. Le code source fourni dans cette page Github vous permettra de créer votre propre lecteur vidéo, sur mesure selon vos besoins. Bien sûr, les fonctionnalités disponibles dans le thème présent dans ce git utilisent des fonctionnalités natives du gestionnaire.

## Déploiement

Intégrez la Butterfly Player API à votre site internet.

```html
<script type="text/javascript" src="//floagg.info/package/beta-player@v0.7-fluttershy"></script>
<script type="text/javascript">
    Player.set('#player', {
        height: 720,
        width: 1280,
        src: 'https://www.siteweb.com/monfichier.mp4',
        thumbnail: 'https://www.siteweb.com/monfichier.png'
    });
    Player.load();
</script>
```
Si vous souhaitez intégrer plusieurs lecteurs vidéo à votre site internet, il est préférable de créer une instance pour chacun d'entre eux, comme suit :

```html
<script type="text/javascript">
    const MyInstanceAPI = new Fluttershy_API();
    MyInstanceAPI.set('#player', {
        height: 720,
        width: 1280,
        src: 'https://www.siteweb.com/monfichier.mp4',
        thumbnail: 'https://www.siteweb.com/monfichier.png'
    });
    MyInstanceAPI.load();
</script>
```