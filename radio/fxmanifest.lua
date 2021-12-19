fx_version 'cerulean'
game 'gta5'

author 'Hellslicer'
description 'This resource allows you to integrate your own radios in place of the original radios'
version '2.0.0'

-- Example custom radios
supersede_radio 'RADIO_02_POP' { url = 'https://listener2.mp3.tb-group.fm/tb.mp3', volume = 0.2, name = 'We Are One' }
supersede_radio 'RADIO_03_HIPHOP_NEW' { url = 'http://stream.radioreklama.bg/nrj.ogg', volume = 0.2 }

files {
	'index.html'
}

ui_page 'index.html'

client_scripts {
	'data.js',
	'client.js'
}
