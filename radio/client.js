const resourceName = GetCurrentResourceName();
const customRadios = [];
let isPlaying = false;
let index = -1;
let volume = GetProfileSetting(306) / 10;
let previousVolume = volume;

for (let i = 0, length = GetNumResourceMetadata("radio", "supersede_radio"); i < length; i++) {
    const radio = GetResourceMetadata("radio", "supersede_radio", i);

    if (!availableRadios.includes(radio)) {
        console.error(`${resourceName}: ${radio} is an invalid radio.`);
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
            if (data.name) {
                AddTextEntry(radio, data.name);
            }
        } else {
            console.error(`${resourceName}: Missing data for ${radio}.`);
        }
    } catch (e) {
        console.error(e);
    }
}

RegisterNuiCallbackType(`${resourceName}:ready`);
on(`__cfx_nui:${resourceName}:ready`, (data, cb) => {
    SendNuiMessage(JSON.stringify({ "type": "create", "radios": customRadios, "volume": volume }));
    previousVolume = -1;
});
SendNuiMessage(JSON.stringify({ "type": "create", "radios": customRadios, "volume": volume }));

const PlayCustomRadio = (radio) => {
    isPlaying = true;
    index = customRadios.indexOf(radio);
    ToggleCustomRadioBehavior();
    SendNuiMessage(JSON.stringify({ "type": "play", "radio": radio.name }));
};

const StopCustomRadios = () => {
    isPlaying = false;
    ToggleCustomRadioBehavior();
    SendNuiMessage(JSON.stringify({ "type": "stop" }));
};

const ToggleCustomRadioBehavior = () => {
    SetFrontendRadioActive(!isPlaying);

    if (isPlaying) {
        StartAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE");
    } else {
        StopAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE");
    }
};

setTick(() => {
    if (IsPlayerVehicleRadioEnabled()) {
        let playerRadioStationName = GetPlayerRadioStationName();

        let customRadio = customRadios.find((radio) => {
            return radio.name === playerRadioStationName;
        });

        if (!isPlaying && customRadio) {
            PlayCustomRadio(customRadio);
        } else if (isPlaying && customRadio && customRadios.indexOf(customRadio) !== index) {
            StopCustomRadios();
            PlayCustomRadio(customRadio);
        } else if (isPlaying && !customRadio) {
            StopCustomRadios();
        }
    } else if (isPlaying) {
        StopCustomRadios();
    }

    volume = GetProfileSetting(306) / 10;
    if (previousVolume !== volume) {
        SendNuiMessage(JSON.stringify({ "type": "volume", "volume": volume }));
        previousVolume = volume;
    }
});
