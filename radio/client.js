const resourceName = GetCurrentResourceName();
const decoratorName = "Player_Vehicle_Radio";
const trackTextCache = new Set();
const customRadios = [];
const radios = {};
let isPlaying = false;
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

RegisterNuiCallback("ready", (data, cb) => {
    cb({ "radios": customRadios, "volume": volume });
});

const PlayCustomRadio = () => {
    isPlaying = true;
    ToggleCustomRadioBehavior();
};

const StopCustomRadios = () => {
    isPlaying = false;
    ToggleCustomRadioBehavior();
};

const ToggleCustomRadioBehavior = () => {
    SetFrontendRadioActive(!isPlaying);

    if (isPlaying) {
        StartAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE");
        SetPositionedPlayerVehicleRadioEmitterEnabled(false);
    } else {
        StopAudioScene("DLC_MPHEIST_TRANSITION_TO_APT_FADE_IN_RADIO_SCENE");
        SetPositionedPlayerVehicleRadioEmitterEnabled(true);
    }
};

const StopVehicleRadio = (vehicle, removeDecorator = true) => {
    if (removeDecorator) {
        DecorRemove(vehicle, decoratorName);
    }

    SendNuiMessage(JSON.stringify({ "type": "stop", vehicle }));

    if (radios[vehicle]) {
        delete radios[vehicle];
    }
}

const DECOR_TYPE_INT = 3;
if (!DecorIsRegisteredAsType(decoratorName, DECOR_TYPE_INT)) {
    DecorRegister(decoratorName, DECOR_TYPE_INT);
}

function updateVehiclesRadio() {
    if (DoesVehicleExistWithDecorator(decoratorName)) {
        const playerPed = PlayerPedId();
        const playerPosition = GetEntityCoords(playerPed);
        const playerVehicle = GetVehiclePedIsIn(playerPed, false);
        const vehicles = GetGamePool('CVehicle');
        const currentTime = Date.now();

        for (const vehicle of vehicles) {
            if (DecorExistOn(vehicle, decoratorName)) {
                const vehiclePosition = GetEntityCoords(vehicle);

                if (GetDistanceBetweenPositions(...playerPosition, ...vehiclePosition) < 100) {
                    let isLoud = !AreAllVehicleWindowsIntact(vehicle);
                    const isPlayerInsideVehicle = playerVehicle === vehicle;
                    const offsetCoords = GetOffsetFromEntityGivenWorldCoords(
                        playerPed,
                        ...vehiclePosition
                    );

                    for (let doorIndex = 0; doorIndex <= 5 && !isLoud; doorIndex++) {
                        if (GetVehicleDoorAngleRatio(vehicle, doorIndex) > 0) {
                            isLoud = true;
                        }
                    }

                    radios[vehicle] = {
                        radioIndex: DecorGetInt(vehicle, decoratorName),
                        isInside: isPlayerInsideVehicle,
                        isLoud,
                        position: offsetCoords,
                        updatedAt: currentTime
                    };
                }
            } else if (radios[vehicle]) {
                StopVehicleRadio(vehicle, false);
            }
        }

        for (const vehicle in radios) {
            const vehicleRadio = radios[vehicle];

            if (currentTime - vehicleRadio.updatedAt > 30000) {
                StopVehicleRadio(vehicle, false);
            }
        }

        SendNuiMessage(JSON.stringify({ "type": "vehicles", "data": radios }));
    } else {
        Object.keys(radios).forEach(function(vehicle) {
            SendNuiMessage(JSON.stringify({ "type": "stop", "vehicle": vehicle }));

            delete radios[vehicle];
        });
    }
}

function GetDistanceBetweenPositions(x1, y1, z1, x2, y2, z2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dz = z2 - z1;

    return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

setInterval(() => {
    const playerPed = PlayerPedId();

    if (IsPlayerVehicleRadioEnabled()) {
        const vehicle = GetVehiclePedIsIn(playerPed, false);
        const stationName = GetPlayerRadioStationName();

        let radioIndex = customRadios.findIndex((radio) => {
            return radio.name === stationName;
        });

        if (radioIndex !== -1) {
            const trackTextId = GetAudibleMusicTrackTextId();

            if (!trackTextCache.has(trackTextId)) {
                AddTextEntry(`${trackTextId}S`, ""); // (S)ong title
                AddTextEntry(`${trackTextId}A`, ""); // (A)rtist

                trackTextCache.add(trackTextId);
            }

            if (!DecorExistOn(vehicle, decoratorName) || radioIndex !== DecorGetInt(vehicle, decoratorName)) {
                DecorSetInt(vehicle, decoratorName, radioIndex);
            }
        }

        if (!isPlaying && radioIndex !== -1) {
            PlayCustomRadio();
        } else if (isPlaying && radioIndex === -1) {
            StopCustomRadios();
            StopVehicleRadio(vehicle);
        }
    } else {
        if (isPlaying) {
            StopCustomRadios();
        }

        const lastVehicle = GetVehiclePedIsIn(playerPed, true);

        if (!GetIsVehicleEngineRunning(lastVehicle) && DecorExistOn(lastVehicle, decoratorName)) {
            StopVehicleRadio(lastVehicle);
        }
    }

    volume = GetProfileSetting(306) / 10;
    if (previousVolume !== volume) {
        SendNuiMessage(JSON.stringify({ "type": "volume", "volume": volume }));
        previousVolume = volume;
    }
}, 100);

setInterval(() => {
    updateVehiclesRadio();
}, 250);
