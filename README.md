# 📻FiveM Radio MP3 and OGG

- This resource allows you to integrate your own radios in place of the original radios.
It's fully written in JavaScript and uses resource metadata for its configuration.

## 📋Features

- Radio wheel
- Radio design
- Audio file *(format: MP3 and OGG)*
- Audio stream
- No dependency
- Easy configuration
- Player-configurable volume
- A modified `hud.ytd` (`gtav_radio_stations_texture_512`)

## 📺Showcase
### [🎞️Showcase](https://streamable.com/6hrhp)
### [🎞️Tutorial](https://youtu.be/2tuJZB_7WPM)
#### 🖥️Hud:
<img src="https://cdn.discordapp.com/attachments/517028743357792258/908833431675342849/2021-11-12.png" width="600" height="600">

## 📎Configuration

For each custom radio, add this line in `fxmanifest.lua:
```
supersede_radio "[ORIGINAL_RADIO_NAME]" { url = "[RADIO URL]", volume = 0.5, name = "[NEW RADIO NAME]" }
```
### Example:
```
supersede_radio "RADIO_02_POP" { url = "https://revolutionradio.ru:8443/live.ogg", volume = 0.2 }
```

❗ You can find the list of radio names in [`data.js`](radio/data.js) and a full example in [`fxmanifest.lua`](radio/fxmanifest.lua).

## 🐛Known bugs and limitations

- Sometimes the radio stream doesn't work and the stream doesn't play
- The text content may disappear more often

## 🧑‍⚖️License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.