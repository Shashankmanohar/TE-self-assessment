function resizeViewPort() {
    var vp = document.getElementById("vp");
    if (vp != null) {
        vp.remove();
    }
    var viewport = document.createElement("meta");
    viewport.setAttribute("name", "viewport");
    viewport.setAttribute("id", "vp");
    //console.log('screen.width ' + screen.width);
    if (screen.width < 450) {
        viewport.setAttribute("content", "width=450");
    } else {
        viewport.setAttribute("content", "width=device-width, initial-scale=1");
    }
    document.head.appendChild(viewport);
}

$(window).resize(function () {
    //console.log('Windows resize')
    resizeViewPort();
});

window.onload = function () {
    resizeViewPort();
}

// new WOW().init();

