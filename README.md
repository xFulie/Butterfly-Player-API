[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/FloaggFrance/Butterfly-Player-API/blob/main/README.md)
[![fr](https://img.shields.io/badge/lang-fr-green.svg)](https://github.com/FloaggFrance/Butterfly-Player-API/blob/main/README.fr.md)

# Butterfly Player API

**Butterfly Player API** is a JavaScript alternative with no dependencies on the Video.js framwork. It allorws you to easily integrate a video player into your website.

**The Butterfly Player API** is a theme showcasing the capabilities of the **Blueberry V0.3** event handler. The provided source code on this GitHub page will enable you to create your own custom video player tailored to your needs. Of course, the features available in the theme present in this git use native functionalities of the handler.

## Deployment

Integrate the Butterfly Player API into your website.

```html
<script type="text/javascript" src="//floagg.info/package/beta-player@v0.7-fluttershy"></script>
<script type="text/javascript">
    Player.set('#player', {
        height: 720,
        width: 1280,
        src: 'https://www.website.com/myfile.mp4',
        thumbnail: 'https://www.website.com/myfile.png'
    });
    Player.load();
</script>
```
If you wish to integrate multiple video players into your website, it's preferable to create an instance for each of them, as follows:

```html
<script type="text/javascript">
    const MyInstanceAPI = new Fluttershy_API();
    MyInstanceAPI.set('#player', {
        height: 720,
        width: 1280,
        src: 'https://www.website.com/myfile.mp4',
        thumbnail: 'https://www.website.com/myfile.png'
    });
    MyInstanceAPI.load();
</script>
```