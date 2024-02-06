<h1 align="center">📻FiveM Radio MP3 and OGG / German Radio</h1>

## ℹ️Description
- This resource allows you to integrate your own radios in place of the original radios.
It's fully written in JavaScript and uses resource metadata for its configuration.

## 📋Features
- Radio wheel
- Radio design
- Audio file *(format: MP3 and OGG)*
- Audio stream
- No dependency / Standalone
- Easy configuration
- Player-configurable volume
- A modified `hud.ytd` (`gtav_radio_stations_texture_512`)
- German list of radio
- German Radio design
- ❗ You can find the list of radio names in [`data.js`](radio/data.js) and a full example in [`fxmanifest.lua`](radio/fxmanifest.lua).

## 📺Showcase
### [🎞️Showcase](https://streamable.com/6hrhp)
### [🎞️Tutorial](https://youtu.be/2tuJZB_7WPM)
### 🖥️Radio Wheel:
<img src="https://cdn.discordapp.com/attachments/517028743357792258/908833431675342849/2021-11-12.png" width="600" height="600">

### 🖥️German Radio Wheel:
<img src="https://github.com/Zerofour04/fivem-radio-mp3-ogg/assets/60815764/ace07dfc-87b7-44e9-b197-f6485ff129f2" width="700">

## 📎Configuration
For each custom radio, add this line in `fxmanifest.lua:
```
supersede_radio "[ORIGINAL_RADIO_NAME]" { url = "[RADIO URL]", volume = 0.5, name = "[NEW RADIO NAME]" }
```
Example:
```
supersede_radio "RADIO_02_POP" { url = "https://revolutionradio.ru:8443/live.ogg", volume = 0.2 }
```

### German Radio list (Mainly from Munich):
```
supersede_radio "RADIO_02_POP" { url = "http://185.52.127.162/de/33003/mp3_128.mp3", volume = 0.2, name = "Energy" }
supersede_radio "RADIO_03_HIPHOP_NEW" { url = "http://mp3.radiogong963.c.nmdn.net/ps-radiogong963/livestream.mp3", volume = 0.2, name = "Gong 96.3" }
supersede_radio "RADIO_04_PUNK" { url = "http://s1-webradio.antenne.de/antenne", volume = 0.2, name = "Antenne Bayern" }
supersede_radio "RADIO_01_CLASS_ROCK" { url = "http://br-br3-live.cast.addradio.de/br/br3/live/mp3/128/stream.mp3", volume = 0.3, name = "Bayern 3" }
supersede_radio "RADIO_05_TALK_01" { url = "http://mp3.topfm.c.nmdn.net/ps-topfm/livestream.mp3", volume = 0.2, name = "Top FM 106.4" }
supersede_radio "RADIO_06_COUNTRY" { url = "http://mp3ad.radiogalaxy.c.nmdn.net/ps-radiogalaxy/livestream.mp3", volume = 0.2, name = "Radio Galaxy" }
supersede_radio "RADIO_07_DANCE_01" { url = "http://radionetz.de:8000/purefm-by.mp3", volume = 0.2, name = "Radionetz" }
supersede_radio "RADIO_08_MEXICAN" { url = "http://fhin.4broadcast.de/radioin.mp3", volume = 0.2, name = "Das Original aus dem Herzen Bayerns" }
supersede_radio "RADIO_09_HIPHOP_OLD" { url = "http://rs4.stream24.net:80/unser-radio.mp3", volume = 0.2, name = "Unser Radio Niederbayern" }
supersede_radio "RADIO_12_REGGAE" { url = "http://egofm-live.cast.addradio.de/egofm/live/mp3/high/stream.mp3", volume = 0.2, name = "egoFM" }
supersede_radio "RADIO_13_JAZZ" { url = "https://live.arabella-bayern.de/arabella-bayern.mp3", volume = 0.2, name = "Arabella" }
supersede_radio "RADIO_14_DANCE_02" { url = "http://mp3stream1.apasf.apa.at:8000/", volume = 0.2, name = "FM4" }
supersede_radio "RADIO_15_MOTOWN" { url = "http://185.85.28.161:8000/;", volume = 0.2, name = "Radio Oe3" }
supersede_radio "RADIO_16_SILVERLAKE" { url = "http://pool.radiopaloma.de/RADIOPALOMA.mp3", volume = 0.2, name = "Radio Paloma EE" }
supersede_radio "RADIO_19_USER" { url = "http://stream.srg-ssr.ch/m/drs3/mp3_128", volume = 0.2, name = "Radio SRF 3" }
supersede_radio "RADIO_18_90S_ROCK" { url = "http://mp3channels.webradio.antenne.de/80er-kulthits", volume = 0.2, name = "80er Kulthits" }
supersede_radio "RADIO_17_FUNK" { url = "http://mp3channels.webradio.antenne.de/90er-hits", volume = 0.2, name = "90er Hits" }
supersede_radio "RADIO_20_THELAB" { url = "http://live.lora924.de:8000/lora-hq.mp3", volume = 0.2, name = "Lora 92.4" }
supersede_radio "RADIO_11_TALK_02" { url = "http://stream.antenne1.de/a1stg/livestream2.mp3", volume = 0.2, name = "Hitradio Antenne 1" }
supersede_radio "RADIO_21_DLC_XM17" { url = "http://mp3channels.webradio.rockantenne.de/rockantenne", volume = 0.2, name = "Rock Antenne" }
supersede_radio "RADIO_22_DLC_BATTLE_MIX1_RADIO" { url = "http://st01.dlf.de/dlf/01/128/mp3/stream.mp3", volume = 0.2, name = "Deutschlandfunk" }
```

## 🐛Known bugs and limitations
- Sometimes the radio stream doesn't work and the stream doesn't play
- The text content may disappear more often

## 🧑‍⚖️License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
