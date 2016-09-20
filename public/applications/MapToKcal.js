function loadExerciseDefaultValues(exercise) {
    var exercise;
    switch (document.getElementById("exercise").value) {
        case "city_cycling":
            exercise = new CityCycling();
            break;
        case "race_cycling":
            exercise = new RaceCycling();
            break;
        case "running":
            exercise = new Running();
            break;
        case "walking":
            exercise = new Walking();
            break;
        default:
            exercise = new CityCycling();
            alert("Invalid exercise value");
            break;
    }
    document.getElementById("estimate-braking").checked = exercise.brakingEstimated;
    document.getElementById("estimate-braking").disabled = false;
    document.getElementById("speed").value = parseFloat(mpsToKph(exercise.vr).toFixed(3));
    document.getElementById("weight").value = exercise.mExerciser;
    if (routeLoader.route != null) {
        setInputExercise();
        routeLoader.route.processWeatherExercise();
        displayRecalculatedData();
    }
}

function onInputChange() {
    if (routeLoader.route != null) {
        setInputExercise();
        routeLoader.route.processWeatherExercise();
        displayRecalculatedData();
    }
}

function invertRoute() {
    if (routeLoader.route != null) {
        routeLoader.route.invert();
        displayRecalculatedData();
    }
}

function displayRecalculatedData() {
    displayElevations(routeLoader.loadedModules.elevations == true ? null : routeLoader.loadedModules.elevations, false);
    displayRouteInfo(routeLoader.loadedModules.routeInfo == true ? null : routeLoader.loadedModules.routeInfo, false);
    displayWeather(routeLoader.loadedModules.weather == true ? null : routeLoader.loadedModules.weather, false);
}

function handleFileSelect(evt) {
    document.getElementById("info").innerHTML = null;
    if (!isFileApiSupported) {
        displayError("The File APIs are not fully supported by your browser")
        return null;
    }

    var file = evt.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var route = routeLoader.createRouteFromGpx(e);
                document.getElementById("file_label").innerHTML = "Load gpx. file (" + file.name + ")";
                chartDrawer.route = route;
                setInputExercise();
                showLoading(true);
                routeLoader.onLoadingFinished = function () {
                    showLoading(false);
                };
                routeLoader.loadApi();
            } catch (error) {
                displayError("Not a .gpx file (" + error + ")");
            }
        };
        reader.readAsText(file);
    }
}

function showLoading(isLoading) {
    if (isLoading) {
        hideOutput("info");
        hideOutput("base_energy");
        hideOutput("detailed_energy");
        hideOutput("route_info");
        hideOutput("weather");
        hideOutput("wind_scale")
        hideOutput("elevation_chart");
        hideOutput("highways_chart");
        hideOutput("surfaces_chart");
        hideOutput("headwind_chart");
        hideOutput("crosswind_chart");
    }
    openDetails();
    document.getElementById("loader").style.visibility = (isLoading ? "visible" : "hidden");
    disableRecursively(document.getElementById("input"), isLoading);
}

function disableRecursively(element, isDisabled) {
    try {
        element.disabled = isDisabled;
    } catch (error) {}
    if (element.childNodes && element.childNodes.length > 0) {
        for (var i = 0; i < element.childNodes.length; i++) {
            disableRecursively(element.childNodes[i], isDisabled);
        }
    }
}

function setInputExercise() {
    var speed = kphToMps(document.getElementById("speed").value),
        weight = parseFloat(document.getElementById("weight").value),
        brakingEstimated = document.getElementById("estimate-braking").checked,
        route = routeLoader.route;
    var exercise;
    switch (document.getElementById("exercise").value) {
        case "city_cycling":
            exercise = new CityCycling(speed, weight, brakingEstimated);
            break;
        case "race_cycling":
            exercise = new RaceCycling(speed, weight, brakingEstimated);
            break;
        case "running":
            exercise = new Running(speed, weight, brakingEstimated);
            break;
        case "walking":
            exercise = new Walking(speed, weight, brakingEstimated);
            break;
        default:
            exercise = new CityCycling(speed, weight, brakingEstimated);
            alert("Invalid exercise value");
            break;
    }
    route.exercise = exercise;
}

function isFileApiSupported() {
    return (window.File && window.FileReader && window.FileList && window.Blob);
}

function displayMap() {
    var mapDiv = document.getElementById("map");
    var map = new google.maps.Map(mapDiv, {
        zoom: routeLoader.route.getGoogleMapZoom(mapDiv.offsetWidth, mapDiv.offsetHeight),
        center: routeLoader.route.getMercatorCenterCoordinate(),
        mapTypeId: "terrain"
    });
    chartDrawer.gMap = map;

    var routePolyline = new google.maps.Polyline({
        path: routeLoader.route.coordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    routePolyline.setMap(map);
    displaySuccess("Loaded Google Maps");
}

function openDetails() {
    var details = document.getElementById("details");
    details.style.visibility = "visible";
    details.setAttribute("open", "open");
}

function displayElevations(error, displayInfo = true) {
    if (error != null) {
        displayWarning("An error has occured while loading elevations, loaded flat terrain (" + error + ")", displayInfo);
    } else {
        showChart("elevation_chart");
        chartDrawer.plotElevation("elevation_chart");
        displaySuccess("Loaded elevations", displayInfo);
    }
}

function displayRouteInfo(error, displayInfo = true) {
    if (error != null) {
        displayWarning("An error has occured while loading highways and surfaces, loaded default data (" + error + ")", displayInfo);
    } else {
        showChart("highways_chart");
        chartDrawer.plotHighways("highways_chart");
        showChart("surfaces_chart");
        chartDrawer.plotSurfaces("surfaces_chart");
        var widthTmp = chartDrawer.width;
        chartDrawer.width *= 1.5;
        chartDrawer.plotE("E_chart");
        chartDrawer.width = widthTmp;
        loadRouteEnergy();
        displaySuccess("Loaded route highways and surfaces", displayInfo);
    }
}

function displayWeather(error, displayInfo = true) {
    if (error != null) {
        displayWarning("An error has occured while loading weather, loaded default conditions (" + error + ")", displayInfo);
    } else {
        showChart("headwind_chart");
        chartDrawer.plotHeadwind("headwind_chart");
        showChart("crosswind_chart");
        chartDrawer.plotCrosswind("crosswind_chart");
        showChart("kcal_chart");
        chartDrawer.plotKcal("kcal_chart");
        loadWeather();
        displaySuccess("Loaded weather", displayInfo);
    }
    loadRouteInfo();
}


function loadRouteEnergy() {
    var totalEnergy = jouleToKcal(routeLoader.route.energy.E);
    document.getElementById("total_energy").value = parseFloat(totalEnergy.toFixed(3)) + " kcal";
    document.getElementById("energy_per_minute").value = parseFloat(jouleToKcal(routeLoader.route.getEnergyPerS() * 60).toFixed(3)) + " kcal/min";
    document.getElementById("energy_per_km").value = parseFloat(jouleToKcal(routeLoader.route.getEnergyPerM() * 1000).toFixed(3)) + " kcal/km";
    document.getElementById("energy_description").value = getEnergyDescription(totalEnergy);
    document.getElementById("energy_fat_description").value = "1 kg of fat tissue equals to about " + parseFloat(fat87ToKcal(1).toFixed(3)) + " kcal";
    showOutput("base_energy");
    hideOutput("detailed_energy_output");
    showOutput("detailed_energy");

    function getEnergyDescription(energyKcal) {
        if (energyKcal < 300) {
            return "Small amount of energy burned";
        } else if (energyKcal < 500) {
            return "Medium amount of energy burned";
        } else if (energyKcal < 1500) {
            return "High amount of energy burned";
        } else {
            return "Very high amount of energy burned";
        }
    }
}

function loadEnergyDetails() {
    var height = document.getElementById("height").value,
        age = document.getElementById("age").value,
        isMale = document.getElementById("male").checked,
        baseEnergy = bmr(routeLoader.route.exercise.mExerciser, height, age, isMale),
        exerciseEnergy = jouleToKcal(routeLoader.route.energy.E),
        totalEnergy = baseEnergy + exerciseEnergy,
        bmiIndex = bmi(routeLoader.route.exercise.mExerciser, height),
        exerciseHours = routeLoader.route.getTime() / 3600,
        metIndex = met(baseEnergy * exerciseHours / 24 + exerciseEnergy, routeLoader.route.exercise.mExerciser, exerciseHours);

    document.getElementById("base_detailed_energy").value = parseFloat(baseEnergy.toFixed(3)) + " kcal";
    document.getElementById("exercise_detailed_energy").value = parseFloat(exerciseEnergy.toFixed(3)) + " kcal";
    document.getElementById("total_detailed_energy").value = parseFloat(totalEnergy.toFixed(3)) + " kcal";
    document.getElementById("bmi_detailed_energy").value = parseFloat(bmiIndex.toFixed(2)) + " (" + getBmiDescription(bmiIndex) + ")";
    document.getElementById("detailed_energy_description").value = parseFloat(metIndex.toFixed(2)) + " (" + getMetDescription(metIndex) + ")";
    document.getElementById("detailed_energy_output").style.overflow = "visible";
    document.getElementById("detailed_energy_output").style.height = "auto";
    showOutput("detailed_energy");

    function getBmiDescription(bmiIndex) {
        if (bmiIndex < 15) {
            return "very severely underweight";
        } else if (bmiIndex < 16) {
            return "severely underweight";
        } else if (bmiIndex < 18.5) {
            return "underweight";
        } else if (bmiIndex < 25) {
            return "normal - healthy weight"
        } else if (bmiIndex < 30) {
            return "overweight"
        } else if (bmiIndex < 35) {
            return "obese class I - moderately obese";
        } else if (bmiIndex < 40) {
            return "obese class II - severely obese";
        } else {
            return "obese class III - very severely obese";
        }
    }

    function getMetDescription(metIndex) {
        if (metIndex < 3) {
            return "light intensity activity";
        } else if (metIndex <= 6) {
            return "moderate intensity activity";
        } else if (metIndex <= 15) {
            return "vigorous intensity activity";
        } else {
            return "very vigorous intensity activity";
        }
    }
}

function loadRouteInfo() {
    document.getElementById("average_speed").value = parseFloat(mpsToKph(routeLoader.route.exercise.vr).toFixed(3)) + " km/h";

    var totalSec = routeLoader.route.getTime(),
        days = parseInt(totalSec / (3600 * 24)),
        hours = parseInt(totalSec / 3600) % 24,
        minutes = parseInt(totalSec / 60) % 60,
        seconds = parseInt(totalSec % 60),
        miliSeconds = parseInt((totalSec % 1) * 1000),
        ddhhmmss = (days > 0 ? days + "d" : "") + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) +
        " (+" + miliSeconds + "ms)";

    document.getElementById("total_time").value = ddhhmmss;
    document.getElementById("total_distance").value = parseFloat((routeLoader.route.getDistance() / 1000).toFixed(3)) + " km";
    document.getElementById("total_slope").value = parseFloat(routeLoader.route.getSlope().toFixed(2)) + " m";
    document.getElementById("average_headwind").value = parseFloat(mpsToKph(routeLoader.route.getAverageHeadwind()).toFixed(3)) + " km/h";
    document.getElementById("average_crosswind").value = parseFloat(mpsToKph(routeLoader.route.getAverageCrosswind()).toFixed(3)) + " km/h";
    document.getElementById("average_absolute_crosswind").value = parseFloat(mpsToKph(routeLoader.route.getAverageAbsoluteCrosswind()).toFixed(3)) + " km/h";
    showOutput("route_info");
}

function loadWeather() {
    document.getElementById("city_name").value = routeLoader.route.weather.cityName + " (" + routeLoader.route.weather.country + ")";
    if (routeLoader.route.weather.conditions != null) {
        var description = "";
        for (var i = 0; i < routeLoader.route.weather.conditions.length; i++) {
            description += routeLoader.route.weather.conditions[i] + " (" + routeLoader.route.weather.descriptions[i] + "); ";
        }
        document.getElementById("weather_conditions").value = description.slice(0, -2);
    } else {
        document.getElementById("weather_conditions").value = "not defined";
    }
    var utcLabel = getUtcLabel();
    document.getElementById("weather_time").value = routeLoader.route.weather.time.toLocaleTimeString() + " " + utcLabel;
    document.getElementById("temperature").value = parseFloat(kelvinToCelsius(routeLoader.route.weather.T).toFixed(1)) + " ℃";
    document.getElementById("pressure").value = parseFloat((routeLoader.route.weather.p / 100).toFixed(2)) + " hPa";
    document.getElementById("humidity").value = parseFloat((routeLoader.route.weather.phi * 100).toFixed(2)) + " %";
    document.getElementById("cloudness").value = parseFloat((routeLoader.route.weather.cloudness * 100).toFixed(2)) + " %";
    document.getElementById("wind_speed").value = parseFloat(mpsToKph(routeLoader.route.weather.windSpeed).toFixed(3)) + " km/h";
    document.getElementById("wind_direction").value = routeLoader.route.weather.getWindDirection();
    document.getElementById("sunrise").value = routeLoader.route.weather.sunrise.toLocaleTimeString() + " " + utcLabel;
    document.getElementById("sunset").value = routeLoader.route.weather.sunset.toLocaleTimeString() + " " + utcLabel;
    var other;
    if (routeLoader.route.weather.rainPast3h != null) {
        other = "rain volume for the last 3 hours: " + routeLoader.route.weather.rainPast3h;
    }
    if (routeLoader.route.weather.snowPast3h != null) {
        if (other == null) {
            other = "snow volume for the last 3 hours: " + routeLoader.route.weather.snowPast3h;

        } else {
            other += "; snow volume for the last 3 hours: " + routeLoader.route.weather.snowPast3h;
        }
    }
    if (other != null) {
        document.getElementById("weather_conditions_other").value = other;
    } else {
        document.getElementById("weather_conditions_other").value = "none";
    }
    selectBeaufortNumber(routeLoader.route.weather.getBeaufortNumber());
    showOutput("weather");
    showOutput("wind_scale")

    function getUtcLabel() {
        var offset = -new Date().getTimezoneOffset();
        var label = "(UTC" + ((offset == 0) ? "±" : (offset > 0) ? "+" : "");
        label += parseFloat((offset / 60).toFixed(1)) + ")";
        return label;
    }
}


function selectBeaufortNumber(number) {
    document.getElementById("Beaufort_number_" + number).classList.add("card-selected");
}


function showOutput(outputId) {
    var output = document.getElementById(outputId);
    output.style.overflow = "visible";
    var height = output.scrollHeight;
    output.style.height = "0px";
    output.style.overflow = "hidden";
    output.style.height = height + "px";
}

function hideOutput(outputId) {
    var output = document.getElementById(outputId);
    output.style.overflow = "hidden";
    output.style.height = "0px";
}

function showChart(divId) {
    var div = document.getElementById(divId);
    div.style.overflow = "hidden";
    div.style.height = "150px";
}

function loadAttributions() {
    var div = document.getElementById("attribution");
    var attributions = routeLoader.getAttributions();
    var output = 'Attributions: ';
    for (key in attributions) {
        if (attributions.hasOwnProperty(key)) {
            output += '<a href="' + attributions[key][1] + '">' + attributions[key][0] + '</a>' + ", ";
        }
    }
    output += '<a href="//glyphicons.com/">Glyphicons.com, </a>';
    output += '<a href="//getbootstrap.com/">Bootstrap 3</a>';
    div.innerHTML = div.innerHTML + output;
}

function loadLicenses() {
    var div = document.getElementById("attribution");
    var licenses = routeLoader.getLicenses();
    var output = 'Application license:\r\nCopyright 2016 Damian Terlecki\r\n\r\nUnless required by applicable law or agreed to in writing, software\r\ndistributed under the License is distributed on an "AS IS" BASIS,\r\nWITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.'
    output += '\r\n\r\n\r\n\r\nOther licenses:\r\n\r\n\r\n';
    for (key in licenses) {
        if (licenses.hasOwnProperty(key)) {
            output += key + '\r\n' + licenses[key] + '\r\n\r\n\r\n';
        }
    }

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
    element.setAttribute('download', "Licenses");
    element.innerHTML = element.innerHTML + '<br>' + 'Licenses';
    div.appendChild(element);
}

function displaySuccess(text, displayInfo = true) {
    if (displayInfo) {
        var div = document.getElementById("info");
        var output = '<div><span class="label label-success">Success</span> ' + text + '</div>';
        div.innerHTML = div.innerHTML + output;
        showOutput("info");
    }
}

function displayWarning(text, displayInfo = true) {
    if (displayInfo) {
        var div = document.getElementById("info");
        var output = '<div><span class="label label-warning">Warning</span> ' + text + '</div>';
        div.innerHTML = div.innerHTML + output;
        showOutput("info");
    }
}

function displayError(text, displayInfo = true) {
    if (displayInfo) {
        var div = document.getElementById("info");
        var output = '<div><span class="label label-warning">Error</span> ' + text + '</div>';
        div.innerHTML = div.innerHTML + output;
        showOutput("info");
    }
}

function setDefaultCallbacks() {
    routeLoader.weatherCallback = displayWeather;
    routeLoader.routeInfoCallback = displayRouteInfo;
    routeLoader.elevationsCallback = displayElevations;
    routeLoader.mapCallback = displayMap;
}


var routeLoader = new RouteLoader("761bf4d93d8e449d85e8074697ec505b", "AIzaSyCQrgEBEXyQpMN1a_uoDj4hYWLi0JcuAbk");
var chartDrawer = new ChartDrawer();
setDefaultCallbacks();
document.getElementById("files").addEventListener("change", handleFileSelect, false);
loadAttributions();
loadLicenses();
