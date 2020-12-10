'use strict';

let buttonPresed = false;

const DIFSTANCE_TO_GOOD = 10;

let eventHasBeen = false;

window.onload = (e) => {
    // Button center
    const btn = document.getElementById('button');
    btn.style.left = (document.documentElement.clientWidth - btn.offsetWidth) / 2 + 'px';
    const btnOriginalTop = btn.offsetTop;
    const btnOriginalLeft = btn.offsetLeft;
    btn.onmousedown = (e) => {
        eventHasBeen = true;
        buttonPresed = true;
        btn.classList.add('bad-idea');
    }
    window.onmousemove = (e) => {
        if (buttonPresed) {
            btn.style.left = btn.offsetLeft + e.movementX + 'px';
            btn.style.top = btn.offsetTop + e.movementY + 'px';
        }
    }
    window.onmouseup = (e) => {
        if (buttonPresed) {
            buttonPresed = false;
            const distance = Math.sqrt(Math.pow(btn.offsetLeft - btnOriginalLeft, 2) + Math.pow(btn.offsetTop - btnOriginalTop, 2));
            if (distance > DIFSTANCE_TO_GOOD) {
                document.getElementById('bad-final').remove();
            } else {
                document.getElementById('good-final').remove();
            }
            document.getElementById('christmas-tree').remove();
            btn.remove();
        }
    }

    let touchX;
    let touchY;
    btn.ontouchstart = (e) => {
        eventHasBeen = true;
        buttonPresed = true;
        btn.classList.add('bad-idea');
        touchX = e.touches[0].screenX;
        touchY = e.touches[0].screenY;
    }
    window.ontouchend = (e) => {
        if (buttonPresed) {
            buttonPresed = false;
            const distance = Math.sqrt(Math.pow(btn.offsetLeft - btnOriginalLeft, 2) + Math.pow(btn.offsetTop - btnOriginalTop, 2));
            if (distance > DIFSTANCE_TO_GOOD) {
                document.getElementById('bad-final').remove();
            } else {
                document.getElementById('good-final').remove();
            }
            document.getElementById('christmas-tree').remove();
            btn.remove();
        }
    }
    window.ontouchmove = (e) => {
        const currentX = e.touches[0].screenX;
        const currentY = e.touches[0].screenY;
        const movementX = currentX - touchX;
        const movementY = currentY - touchY;
        touchX = currentX;
        touchY = currentY;

        if (buttonPresed) {
            btn.style.left = btn.offsetLeft + movementX + 'px';
            btn.style.top = btn.offsetTop + movementY + 'px';
        }
    }
}

setTimeout(() => {
    if (!eventHasBeen) {
        document.getElementById('good-final').remove();
        document.getElementById('bad-final').remove();
        document.getElementById('christmas-tree').remove();
    }
}, 10000);
