const si = require('systeminformation');
const isOnline = require('is-online');

$(document).ready(function () {

    // CPU Graph Plotting Algorithm

    var dataPoints = [];
    var xValue = 0;

    var chart = new CanvasJS.Chart("cpuLoadContainer", {
        height: 119,
        interactivityEnabled: false,
        backgroundColor: "transparent",
        axisX: {
            labelFontColor: "transparent",
            lineColor: "white",
            tickColor: "transparent",
        },
        axisX2: {
            lineColor: "transparent",
        },
        axisY: {
            labelFontFamily: "Lato",
            labelFontColor: "white",
            labelFontSize: 12,
            suffix: "%",
            minimum: 0,
            maximum: 100,
        },
        data: [{
            type: "splineArea",
            color: "white",
            markerSize: 0,
            dataPoints: dataPoints
        }]
    });

    updateData();

    function addData(cpuLoad) {
        xValue += 5;
        if (dataPoints.length > 150) {
            dataPoints.shift()
        }
        dataPoints.push({ x: xValue, y: parseInt(cpuLoad) });

        $('#cpuLoadValue').text(`CPU Load: ${cpuLoad}%`)

        chart.render();
        setTimeout(updateData, 500);
    }

    function updateData() {

        si.currentLoad()
            .then(data => addData(Math.round(data.currentload)))
        // .catch(error => console.error(error));
    }


    // CPU Information Algorithm

    si.cpu()
        .then((data) => {
            $('#cpuInformation').text(data.manufacturer + ' ' + data.brand + ' ' + data.speed + 'GHz')
            // console.log(data)
        })


    // Add RAM Total

    si.mem()
        .then((data) => {
            $('#ramInformation').text((data.total) / (1024 * 1024 * 1024) + 'GB Total RAM')
        })

    window.setInterval(() => {
        si.mem()
            .then((data) => {
                $('#ramLoadValue').text(((data.free) / (1024 * 1024 * 1024)).toFixed(2) + ' GB Free')
                var used = ((data.total - data.free) / data.total) * 100
                $('#ram').css('width', used + '%')
            })
    }, 500)

    si.graphics()
        .then((data) => {
            $('#graphicsData').text(`${data.controllers[0].vram} MB ${data.controllers[0].model}`)
            console.log(data)
        })


    const button = document.getElementById('help');
    button.addEventListener('click', () => {
        checkForInternet()
    });

    function checkForInternet() {

        (async () => {
            if (await isOnline()) {
                openDocs()
            } else {
                noInternet()
            }
        })();
        
    }

    function noInternet() {
        const remote = require('electron').remote;
        const BrowserWindow = remote.BrowserWindow;
        const win = new BrowserWindow({
            height: 640,
            width: 360,
            title: 'BackSlash Linux Help'
        });

        win.loadFile('app/noInternet.html')
    }

    function openDocs() {
        const remote = require('electron').remote;
        const BrowserWindow = remote.BrowserWindow;
        const win = new BrowserWindow({
            height: 640,
            width: 360,
            title: 'BackSlash Linux Help'
        });

        win.loadURL('https://docs.backslashlinux.com');
    }

})