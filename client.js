const customRadios = [];

for (let i = 0, length = GetNumResourceMetadata("radio", "supersede_radio"); i < length; i++) {
    const radio = GetResourceMetadata("radio", "supersede_radio", i);

    if (!availableRadios.includes(radio)) {
        console.error(`radio: ${radio} is an invalid radio.`);
        continue;
    }

    try {
        const data = JSON.parse(GetResourceMetadata("radio", "supersede_radio_extra", i));
        if (data !== null) {
            customRadios.push({
                "isPlaying": false,
                "name": radio,
                "data": data
            });
        } else {
            console.error(`radio: Missing data for ${radio}.`);
        }
    } catch (e) {
        console.error(e);
    }
}

RegisterNuiCallbackType("ready");
on("__cfx_nui:ready", (data, cb) => {
    SendNuiMessage(JSON.stringify({ "type": "create", "radios": customRadios }));
});

const PlayCustomRadio = (state, radio) => {
    radio = radio || {};
    radio.isPlaying = state;
    SetFrontendRadioActive(!customRadios.reduce((isPlaying, radio) => {
        return radio.isPlaying || isPlaying;
    }, false));
    SendNuiMessage(JSON.stringify({ "type": "play", "radio": radio.name, "play": radio.isPlaying }));
};

setTick(() => {
    if (IsPlayerVehicleRadioEnabled()) {
        let playerRadioStationName = GetPlayerRadioStationName();

        for (let radio of customRadios) {
            let customRadio = playerRadioStationName === radio.name;

            if (!radio.isPlaying && customRadio) {
                PlayCustomRadio(true, radio);
            } else if (radio.isPlaying && !customRadio) {
                PlayCustomRadio(false, radio);
            }
        }
    } else {
        let isPlaying = customRadios.reduce((isPlaying, radio) => {
            return radio.isPlaying || isPlaying;
        }, false);

        if (isPlaying) {
            for (let i = 0, length = customRadios.length; i < length; i++) {
                customRadios[i].isPlaying = false;
            }
            PlayCustomRadio(false);
        }
    }
});
