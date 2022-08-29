fx_version 'cerulean'
game 'gta5'

author 'Hellslicer'
description 'This resource allows you to integrate your own radios in place of the original radios'

--
-- Config
--

supersede_radio "RADIO_02_POP" { url = "", volume = 0.2, name = "" }
supersede_radio "RADIO_03_HIPHOP_NEW" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_04_PUNK" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_01_CLASS_ROCK" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_05_TALK_01" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_06_COUNTRY" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_07_DANCE_01" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_08_MEXICAN" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_09_HIPHOP_OLD" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_12_REGGAE" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_13_JAZZ" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_14_DANCE_02" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_15_MOTOWN" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_16_SILVERLAKE" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_19_USER" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_18_90S_ROCK" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_17_FUNK" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_20_THELAB" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_11_TALK_02" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_21_DLC_XM17" { url = "", volume = 0.2, name = "" }
--supersede_radio "RADIO_22_DLC_BATTLE_MIX1_RADIO" { url = "", volume = 0.2, name = "" }

files {
	"index.html"
}

ui_page "index.html"

client_scripts {
	"data.js",
	"client.js"
}
