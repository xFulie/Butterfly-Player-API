
# Butterfly Player API

**Butterfly Player API** est une alternative Javascript sans dépendance au framework Vidéo.js. Elle vous permet d'intégré facillement un lecteurs vidéos à votre site internet.

**La Butterfly Player API** est un Thèmes démontrant les capacité du gestionnaire d'évenemment **Blueberry V0.3**. Le code source fournis dans cette page Github vous permetteras de créer votre propre lecteurs vidéos, sur mesures à vos besoin.
Bien sur, les fonctionnalité disponible dans le thèmes présent dans ce git utiliser des fonctionnalité native du gestionnaire.
## Deployment

Intégrer la Butterfly Player API à mon site internet.

```html
<script type="text/javascript" src="//floagg.info/package/beta-player@v0.7-fluttershy"></script>
```

```html
<script type="text/javascript">
Player.set('#player', {
    height: 720,
    width: 1280,
    src: 'https://www.siteweb.com/monfichier.mp4',
    thumbnail: 'https://www.siteweb.com/monfichier.png'
});
Player.load()
</script>
```

Si vous souhaiter intègré plusieurs lecteur vidéos à votre site internet, il est préférable de créer une instance pour chaccun d'entre eux. Comme suite
```html
<script type="text/javascript">
const MyInstanceAPI = new Fluttershy_API()
MyInstanceAPI.set('#player', {
    height: 720,
    width: 1280,
    src: 'https://www.siteweb.com/monfichier.mp4',
    thumbnail: 'https://www.siteweb.com/monfichier.png'
});
MyInstanceAPI.load()
</script>
```
