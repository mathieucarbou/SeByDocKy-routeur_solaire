// infos contains keys : setting, name, content, readonly, pattern, min, max, type
function addInputNested(infos) {
    let value;
    const type = infos.type ? infos.type : 'text';
    let bornes = '';
    if (type === 'number') {
        value = +infos.setting.value.toFixed(5);
    } else {
        value = infos.setting.value;
    }
    if (infos.min && infos.max) {
        bornes = ' min="' + infos.min + '" max="' + infos.max + '" ';
    }
    infos.content += "<div class='group'>";
    infos.content += "   <input step='0.000001' type='" + type + "' pattern='" + infos.pattern + "' value='" +
        (value !== undefined ? value : '') + "' name='" + infos.name + "' id='" + infos.name + "' " + (infos.readonly ? 'readonly' : '') + bornes + ">";
    infos.content += "    <span class='highlight'></span>";
    infos.content += "    <span class='bar'></span>";
    infos.content += "    <label class='label-input-text'>" + infos.setting.label + "</label > ";
    infos.content += "</div>";
    return infos.content;
}

function addInput(settingValue, name, content, readonly, pattern, id) {
    let value;
    if (settingValue instanceof Number) {
        value = settingValue.toFixed(5);
    } else {
        value = settingValue;
    }

    content += "<div class='group'>";
    content += "   <input step='0.000001' type='text' pattern='" + pattern + "' value='" + (value ? value : '') + "' name='" + name + "' id='" + id + "' " + (readonly ? 'readonly' : '') + ">";
    content += "    <span class='highlight'></span>";
    content += "    <span class='bar'></span>";
    content += "    <label class='label-input-text'>" + name + "</label > ";

    content += "</div>";
    return content;
}

function updatePercentageState() {
    const checked = document.getElementById('marcheForcee').checked;
    document.getElementById('marcheForceeHidden').value = checked;
}

function update2Sortie() {
    const checked = document.getElementById('utilisation2Sorties').checked;
    document.getElementById('utilisation2SortiesHidden').value = checked;
}

function updateRelaisStatique() {
    const checked = document.getElementById('relaisStatique').checked;
    document.getElementById('relaisStatiqueHidden').value = checked;
}

function addSwitch(setting, name, onchange, content) {
    content += "<label class='pure-material-switch' style='padding: 0 0 1em 0; margin: 0 1em; width: calc(100% - 2em);'>";
    content += "    <input name='" + name + "NotHidden' id='" + name + "' type='checkbox' onchange='" + onchange + "()' " + (setting.value ? 'checked' : '') + ">";
    content += "    <span style='font-size: 1em'>" + setting.label + "</span>";
    content += "</label>";
    content += "    <input type='hidden' name='" + name + "' id='" + name + "Hidden' value='" + setting.value + "'></input>";
    return content;
}

function updateSelectBooleanHidden(idHidden, id) {
    document.getElementById(idHidden).value = document.getElementById(id).value
}

function updateMarcheForceeHidden() {
    document.getElementById('marcheForceePercentageHidden').value = document.getElementById('selectMarcheForcee').value;
}
function updateBasculementModeHidden() {
    document.getElementById('basculementModeHidden').value = document.getElementById('basculementMode').value;
    update2Sortie();
}

function addSelectMarcheForcee(setting, content, disabled) {
    content += "<div class='select'>";
    content += "    <select onchange='updateMarcheForceeHidden()' name='marcheForceePercentageNotHidden' id='selectMarcheForcee' class='select-text'  " + (disabled ? 'disabled' : '') + ">";
    content += "        <option value='' " + (setting.value === '' ? 'selected' : '') + "></option>";
    content += "        <option value='25' " + (setting.value === 25 ? 'selected' : '') + ">25%</option>";
    content += "        <option value='50' " + (setting.value === 50 ? 'selected' : '') + ">50%</option>";
    content += "        <option value='75' " + (setting.value === 75 ? 'selected' : '') + ">75%</option>";
    content += "        <option value='100' " + (setting.value === 100 ? 'selected' : '') + ">100%</option>";
    content += "    </select>";
    content += "    <span class='select-highlight'></span>";
    content += "    <span class='select-bar'></span>";
    content += "    <label class='select-label'>Pourcentage</label>";
    content += "<input type='hidden' name='marcheForceePercentage' id='marcheForceePercentageHidden' value='" + setting.value + "'></input>";
    content += "</div>";
    return content;
}
function addSelectBasculementMode(setting, content, disabled) {
    content += "<div class='select'>";
    content += "    <select onchange='updateBasculementModeHidden()' name='basculementModeNotHidden' id='basculementMode' class='select-text'  " + (disabled ? 'disabled' : '') + ">";
    content += "        <option value='T' " + (setting.value === 'T' ? 'selected' : '') + ">Température</option>";
    content += "        <option value='P' " + (setting.value === 'P' ? 'selected' : '') + ">Puissance Zéro</option>";
    content += "    </select>";
    content += "    <span class='select-highlight'></span>";
    content += "    <span class='select-bar'></span>";
    content += "    <label class='select-label'>Choix du basculement</label>";
    content += "<input type='hidden' name='basculementMode' id='basculementModeHidden' value='" + setting.value + "'></input>";
    content += "</div>";
    return content;
}

function addRadioButtonRelaisStatique(setting, content, readonly) {
    content += "<div class='radios' style='margin: 0 1em;display: flex;'>";
    content += "    <label class='pure-material-radio' style='flex: 1;'>";
    content += "        <input value='V' id='r1_relaisstatique' type='radio' name='tensionOuTemperature' " + (setting.value === 'V' ? 'checked ' : '') + (readonly ? 'readonly' : '') + ">";
    content += "        <span>Tension Batterie</span>";
    content += "    </label>";
    content += "    <label class='pure-material-radio'>";
    content += "        <input value='D' id='r2_relaisstatique' type='radio' name='tensionOuTemperature' " + (setting.value === 'D' ? 'checked ' : '') + (readonly ? 'readonly' : '') + ">";
    content += "        <span>Température</span>";
    content += "    </label>";
    content += "</div>";
    return content;
}

function submitSummary() {
    const oldMarcheForcee = JSON.parse(sessionStorage.getItem("settings")).userSettings.marcheForcee.value;
    sessionStorage.removeItem("settings");
    if (oldMarcheForcee && !document.getElementById('marcheForcee').checked) {
        // réinitialisation de la temporisation
        document.getElementById('temporisation').value = 0;
        document.getElementById('marcheForceePercentageHidden').value = 0;
    }
    document.getElementById('toast').className = 'notif peek';
    document.getElementById('toast').style.animation = 'none';
    setTimeout(function () {
        document.getElementById('toast').style.animation = '';
    }, 10);
    document.getElementById('summaryForm').submit();
    setTimeout(function () {
        displayContent();
    }, 1500);
}
function submitSystem(needRestart) {
    const coeffPince = document.getElementById('coeffPince').checkValidity();
    const zeropince = document.getElementById('zeropince').checkValidity();
    const coeffTension = document.getElementById('coeffTension').checkValidity();
    const correctionTemperature = document.getElementById('correctionTemperature').checkValidity();
    const seuilDemarrageBatterieValid = document.getElementById('seuilDemarrageBatterie').checkValidity();
    const toleranceNegativeValid = document.getElementById('toleranceNegative').checkValidity();
    const temperatureBasculementSortie2 = document.getElementById('temperatureBasculementSortie2').checkValidity();
    const temperatureRetourSortie1 = document.getElementById('temperatureRetourSortie1').checkValidity();
    const seuilMarche = document.getElementById('temperatureRetourSortie1').checkValidity();
    const seuilArret = document.getElementById('seuilArret').checkValidity();

    if (coeffPince && zeropince && coeffTension && correctionTemperature && seuilDemarrageBatterieValid && toleranceNegativeValid
        && temperatureBasculementSortie2 && temperatureRetourSortie1 && seuilMarche && seuilArret) {
        const idToast = needRestart ? 'toastRestart' : 'toast';
        document.getElementById(idToast).className = 'notif peek';
        document.getElementById(idToast).style.animation = 'none';
        setTimeout(function () {
            document.getElementById(idToast).style.animation = '';
        }, 10);
        sessionStorage.removeItem("settings");
        document.getElementById('needRestart').value = needRestart;
        document.getElementById('systemForm').submit();
        setTimeout(function () {
            displayContent();
        }, 2000);
    }
}

function submitCommunication() {
    sessionStorage.removeItem("settings");
    document.getElementById('wifiForm').submit();
    setTimeout(function () {
        document.getElementById('toastRestart').className = 'notif peek';
        document.getElementById('toastRestart').style.animation = 'none';
        setTimeout(function () {
            document.getElementById('toastRestart').style.animation = '';
        }, 10);
        document.getElementById('mqttForm').submit();
        setTimeout(function () {
            displayContent();
        }, 2000);
    }, 1000);
}

function reset() {
    sessionStorage.removeItem("settings");
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "reset", true);
    xhttp.send();
}

function reboot() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "reboot", true);
    xhttp.send();
}

function setSummarySettingsContent(settings) {
    let content = '<div class="title-container"><h1 style="text-align: center; margin: auto;">Routeur Solaire Hors Réseau</h1></div>';
    content += "<div style='max-width: 25em;margin: auto;height: calc(100vh - 8em);'>";
    content += "<form id='summaryForm' method='post' action='/summarysettings'>";
    content += "<div class='card card-2'>";
    content = addInputNested({ setting: settings["systemSettings"]["capteurTension"], name: 'capteurTension', content, readonly: true, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    settings['systemSettings']['intensiteBatterie']['value'] = settings['systemSettings']['intensiteBatterie']['value'].toFixed(2);
    content = addInputNested({ setting: settings["systemSettings"]["intensiteBatterie"], name: 'intensiteBatterie', content, readonly: true, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content = addInputNested({ setting: settings["systemSettings"]["sortieActive"], name: "sortieActive", content, readonly: true, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });

    const state = settings["userSettings"]["etatRelaisStatique"] ? "Oui" : "Non";
    content = addInput(state, "Etat relais statique", content, true, '.+', 'etatRelaisStatique');

    content = addInput(Math.round(settings["systemSettings"]["temperatureEauChaude"]["value"]),
        settings["systemSettings"]["temperatureEauChaude"]["label"], content, true, '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)', 'temperatureEauChaude');
    content = addInput(Math.round(settings["systemSettings"]["puissanceDeChauffe"]["value"]),
        settings["systemSettings"]["puissanceDeChauffe"]["label"], content, true, '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)', 'puissanceDeChauffe');

    content = addInputNested({ setting: settings["systemSettings"]["puissanceGradateur"], name: "puissanceGradateur", content, readonly: true, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content = addInputNested({ setting: settings["userSettings"]["seuilDemarrageBatterie"], name: "seuilDemarrageBatterie", content, readonly: true, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content += "</div>";
    content += "<div class='card card-2'>";
    content = addSwitch(settings["userSettings"]["marcheForcee"], "marcheForcee", "updatePercentageState", content);
    content = addSelectMarcheForcee(settings["userSettings"]["marcheForceePercentage"], content);
    content = addInputNested({ setting: settings["userSettings"]["temporisation"], name: "temporisation", content, readonly: false, pattern: '[0-9]+' });
    content += "</div>";
    content += "<div style='display: flex; flex-direction: column; align-items: flex-end; margin: 1em 0;'>";
    content += "    <button class='btn btn-form' onclick='submitSummary()'><span>Valider</span></button>";
    content += "</div>";
    content += "</form></div>";
    document.getElementById('content').innerHTML = content;
}

function setSystemSettingsContent(settings) {
    let content = '<div class="title-container"><h1 style="text-align: center;margin: auto;">Paramètres Généraux</h1></div>';
    content += "<div style='max-width: 25em;margin: auto; height: calc(100vh - 8em);'>";
    content += "<form id='systemForm' method='post' action='/systemsettings'>";
    content += "<div class='card card-2'>";
    content = addInputNested({ setting: settings["userSettings"]["coeffPince"], name: "coeffPince", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content = addInputNested({ setting: settings["userSettings"]["zeropince"], name: "zeropince", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content = addInputNested({ setting: settings["userSettings"]["coeffTension"], name: "coeffTension", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content = addInputNested({ setting: settings["userSettings"]["correctionTemperature"], name: "correctionTemperature", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content = addInputNested({ setting: settings["userSettings"]["seuilDemarrageBatterie"], name: "seuilDemarrageBatterie", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)', min: 0, max: 100, type: 'number' });
    content = addInputNested({ setting: settings["userSettings"]["toleranceNegative"], name: "toleranceNegative", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)', min: 0, max: 1, type: 'number' });
    content += "</div>";

    content += "<div class='card card-2'>";
    content = addSwitch(settings["userSettings"]["utilisation2Sorties"], "utilisation2Sorties", "update2Sortie", content);
    content = addSelectBasculementMode(settings["userSettings"]["basculementMode"], content, false);
    content = addInputNested({ setting: settings["userSettings"]["temperatureBasculementSortie2"], name: "temperatureBasculementSortie2", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content = addInputNested({ setting: settings["userSettings"]["temperatureRetourSortie1"], name: "temperatureRetourSortie1", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content += "</div>";

    content += "<div class='card card-2'>";
    content = addSwitch(settings["userSettings"]["relaisStatique"], "relaisStatique", 'updateRelaisStatique', content);
    content = addRadioButtonRelaisStatique(settings["userSettings"]["tensionOuTemperature"], content);
    content = addInputNested({ setting: settings["userSettings"]["seuilMarche"], name: "seuilMarche", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content = addInputNested({ setting: settings["userSettings"]["seuilArret"], name: "seuilArret", content, readonly: false, pattern: '-?[0-9]+((,[0-9]+)?|(\.[0-9]+)?)' });
    content += "    <input type='hidden' name='needRestart' id='needRestart' value='false'></input>";

    content += "</div>";

    content += "<div style='display: flex; flex-direction: column; align-items: flex-end; margin: 1em 0;'>";
    content += "<div style='display: flex;'>";
    content += "    <button class='btn btn-form' style='margin-right: .5em;' onclick='submitSystem(true)'><span>Enregistrer</span></button>";
    content += "    <button class='btn btn-form' onclick='submitSystem(false)'><span>Valider</span></button>";
    content += "</div></div>";

    content += "</form></div>";
    document.getElementById('content').innerHTML = content;
}

function setCommunicationSettingsContent(settings) {
    let content = '<div class="title-container"><h1 style="text-align: center;margin: auto;">Paramètres de Communication</h1></div>';
    content += "<div style='max-width: 25em;margin: auto; height: calc(100vh - 8em);'>";

    content += "<form id='wifiForm' method='post' action='/wifisettings'>";

    content += "<div class='card card-2'><h2 style='margin: 0em 1em 0.5em .8em;color: #2f409f;font-weight: 700;'>WIFI</h2>";
    content = addInput(settings["communicationSettings"]["ssid"], "ssid", content, false, '.+', 'ssid');
    content = addInput(settings["communicationSettings"]["password"], "password", content, false, '.+', 'password');
    content += "</div>";

    content += "</form>";

    content += "<form id='mqttForm' method='post' action='/mqttsettings'>";

    content += "<div class='card card-2'><h2 style='margin: 0em 1em 0.5em .8em;color: #2f409f;font-weight: 700;'>MQTT</h2>";
    content = addInput(settings['communicationSettings']['mqttServer'], 'mqttServer', content, false, '.+', 'mqttServer');
    content = addInput(settings['communicationSettings']['mqttPort'], 'mqttPort', content, false, '[0-9]+', 'mqttPort');
    content = addInput(settings['communicationSettings']['mqttUser'], 'mqttUser', content, false, '.+', 'mqttUser');
    content = addInput(settings['communicationSettings']['mqttPassword'], 'mqttPassword', content, false, '.+', 'mqttPassword');
    content = addInput(settings['communicationSettings']['mqttopic'], 'mqttopic', content, false, '.+', 'mqttopic');
    content = addInput(settings['communicationSettings']['mqttopicInput'], 'mqttopicInput', content, false, '.+', 'mqttopicInput');
    content = addInput(settings['communicationSettings']['mqttopicParam1'], 'mqttopicParam1', content, false, '.+', 'mqttopicParam1');
    content = addInput(settings['communicationSettings']['mqttopicParam2'], 'mqttopicParam2', content, false, '.+', 'mqttopicParam2');
    content = addInput(settings['communicationSettings']['mqttopicParam3'], 'mqttopicParam3', content, false, '.+', 'mqttopicParam3');
    content = addInput(settings['communicationSettings']['mqttopicPzem1'], 'mqttopicPzem1', content, false, '.+', 'mqttopicPzem1');
    content += "</div>";

    content += "</form>";
    content += "<div style='display: flex; flex-direction: column; align-items: flex-end; margin: 1em 0;'>";
    content += "    <button class='btn btn-form' onclick='submitCommunication()'><span>Enregistrer</span></button>";
    content += "</div></div>";

    document.getElementById('content').innerHTML = content;
}

function setActionContent(settings) {
    let content = '<div class="title-container"><h1 style="text-align: center;margin: auto;">Action sur l ESP</h1></div>';
    content += "<div style='max-width: 25em;margin: auto; height: calc(100vh - 8em);'>";
    content += "<div style='display: flex; flex-direction: column; align-items: flex-end; margin: 1em 0;'>";
    content += "    <button style='width:100%;' class='btn btn-form' onclick='getConfirmation(`Etes vous sur de vouloir redémarrer l ESP ?`, reboot)'><span>Reboot l'ESP</span></button>";
    content += "</div>";
    content += "<div style='display: flex; flex-direction: column; align-items: flex-end; margin: 1em 0;'>";
    content += "    <button style='width:100%;' class='btn btn-form' onclick='getConfirmation(`Etes vous sur de vouloir réinitialiser les propriétés ?`, reset)'><span>Réinitialise les propriétés</span></button>";
    content += "</div>";
    content += "</div>";

    document.getElementById('content').innerHTML = content;
}

function getConfirmation(question, callback) {
    var retVal = confirm(question);
    if (retVal == true) {
        callback();
        return true;
    } else {
        return false;
    }
}

function displaySettingsContent(callback) {
    if (sessionStorage.getItem("settings")) {
        callback(JSON.parse(sessionStorage.getItem("settings")));
    } else {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const responseJson = JSON.parse(this.response);
                sessionStorage.setItem("settings", JSON.stringify(responseJson));
                callback(responseJson);
            }
        };
        xhttp.open("GET", "settings", true);
        xhttp.send();
    }
}

function updateSystemSettings() {
    setInterval(function () {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (sessionStorage.getItem("settings")) {
                    resultSaved = JSON.parse(sessionStorage.getItem("settings"));
                    const responseJson = JSON.parse(this.response);

                    const intensiteBatterie = +(+responseJson["intensiteBatterie"]).toFixed(2);

                    resultSaved["systemSettings"]["capteurTension"]["value"] = +responseJson["capteurTension"];
                    resultSaved["systemSettings"]["intensiteBatterie"]["value"] = intensiteBatterie;
                    resultSaved["systemSettings"]["sortieActive"]["value"] = +responseJson["sortieActive"];
                    resultSaved["systemSettings"]["temperatureEauChaude"]["value"] = Math.round(+responseJson["temperatureEauChaude"]);
                    resultSaved["systemSettings"]["puissanceDeChauffe"]["value"] = Math.round(+responseJson["puissanceDeChauffe"]);
                    resultSaved["systemSettings"]["puissanceGradateur"]["value"] = +responseJson["puissanceGradateur"];
                    resultSaved["userSettings"]["temporisation"]["value"] = +responseJson["temporisation"];
                    resultSaved["userSettings"]["marcheForcee"]["value"] = +responseJson["marcheForcee"];
                    resultSaved["systemSettings"]["etatRelaisStatique"]["value"] = +responseJson["etatRelaisStatique"];

                    sessionStorage.setItem("settings", JSON.stringify(resultSaved));
                    if (document.getElementById('capteurTension')) {
                        document.getElementById("capteurTension").value = +responseJson["capteurTension"];
                        document.getElementById("intensiteBatterie").value = intensiteBatterie;
                        document.getElementById("sortieActive").value = +responseJson["sortieActive"];
                        document.getElementById("temperatureEauChaude").value = Math.round(+responseJson["temperatureEauChaude"]);
                        document.getElementById("puissanceDeChauffe").value = Math.round(+responseJson["puissanceDeChauffe"]);
                        document.getElementById("puissanceGradateur").value = +responseJson["puissanceGradateur"];
                        document.getElementById("temporisation").value = +responseJson["temporisation"];
                        document.getElementById("marcheForcee").value = responseJson["marcheForcee"];
                        const state = responseJson["etatRelaisStatique"] ? "Oui" : "Non";
                        document.getElementById("etatRelaisStatique").value = state;
                    }
                }
            }
        };
        xhttp.open("GET", "getNewSettings", true);
        xhttp.send();
    }, 30000);
}

function displayContent() {
    document.getElementById('summaryfooter').style.fontWeight = '400';
    document.getElementById('systemfooter').style.fontWeight = '400';
    document.getElementById('communicationfooter').style.fontWeight = '400';
    document.getElementById('actionfooter').style.fontWeight = '400';
    //document.getElementById('chartfooter').style.fontWeight = '400';
    if (window.location.href.endsWith('system')) {
        document.getElementById('systemfooter').style.fontWeight = '700';
        displaySettingsContent(setSystemSettingsContent);
    } else if (window.location.href.endsWith('chart')) {
        document.getElementById('chartfooter').style.fontWeight = '700';
        displaySettingsContent(setSummarySettingsContent);
    } else if (window.location.href.endsWith('communication')) {
        document.getElementById('communicationfooter').style.fontWeight = '700';
        displaySettingsContent(setCommunicationSettingsContent);
    } else if (window.location.href.endsWith('action')) {
        document.getElementById('actionfooter').style.fontWeight = '700';
        displaySettingsContent(setActionContent);
    } else {
        document.getElementById('summaryfooter').style.fontWeight = '700';
        displaySettingsContent(setSummarySettingsContent);
    }
}
