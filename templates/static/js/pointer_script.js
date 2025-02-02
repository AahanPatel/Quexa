document.addEventListener("DOMContentLoaded", () => {

const root = document.documentElement;

    const cursor = document.querySelector(".pointer");
    const colorSpot = document.querySelector(".color-spot");
    const canvas = document.getElementsByClassName("title-canvas")[0];
    const ctx = canvas.getContext("2d");

    let referenceWidth = 1920;
    let referenceHeight = 1080;

    if (!cursor || !colorSpot) {
        console.error("Pointer or color-spot element missing.");
        return;
    }

    const cursorSize = cursor.getBoundingClientRect().width / 2;
    const lightSpotSize = colorSpot.getBoundingClientRect().width / 2;

    const lerp = (start, stop, amt) => amt * (stop - start) + start;

    let cursorX = 0, cursorY = 0;
    let lightSpotX = 0, lightSpotY = 0;
    let mouseY = 0;
    let mouseX = 0;

    let isMouseDown = false;

    ctx.scale(1,1);
    const dimensions = getObjectFitSize(
        true,
        canvas.clientWidth,
        canvas.clientHeight,
        window.outerWidth,
        window.outerHeight
    );

    let minDistance = 70;
    let pixelsBetween = 50;
    let intensity = 6;
    const numX = window.innerWidth / pixelsBetween;
    const numY = window.innerHeight / pixelsBetween;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', (e) => {
        const dimensions = getObjectFitSize(
            true,
            canvas.clientWidth,
            canvas.clientHeight,
            window.outerWidth,
            window.outerHeight
        );
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
    });

    function animate() {
        cursorX = lerp(cursorX, mouseX, 0.1); 
        cursorY = lerp(cursorY, mouseY + window.scrollY, 0.1);
        lightSpotX = lerp(lightSpotX, mouseX, 0.02); 
        lightSpotY = lerp(lightSpotY, mouseY + window.scrollY, 0.02);

        cursor.style.transform = `translate(${cursorX - cursorSize}px, ${cursorY - cursorSize}px)`;
        colorSpot.style.transform = `translate(${lightSpotX - lightSpotSize}px, ${lightSpotY - lightSpotSize}px)`;
        
        const targetValue = isMouseDown ? 12 : 6;
        
        intensity += (targetValue - intensity) * 0.05;

        if (Math.abs(targetValue - intensity) < 0.01) {
            intensity = targetValue;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < numX; i++) {
            for (let k = 0; k < numY; k++) {
                const effectiveDistance = 700;
                const changeX = (pixelsBetween * window.outerHeight / referenceHeight) * i - (cursor.getBoundingClientRect().x * window.outerHeight / referenceHeight) * (Math.abs(numX/2 - k) * Math.abs(numX/2 - i)) / 40;
                const changeY = (pixelsBetween * window.outerWidth / referenceWidth) * k - (cursor.getBoundingClientRect().y * window.outerWidth / referenceWidth);
                let distance = Math.sqrt(Math.pow(changeX, 2) + Math.pow(changeY, 2));

                distance = Math.max(distance, minDistance);
                let color = darkenColor(getComputedStyle(root).getPropertyValue('--primary-1'), distance / intensity);

                if (color != null) {
                    ctx.fillStyle = color;

                    const angleX = changeX / distance;
                    const angleY = changeY / distance;
                    const force = effectiveDistance - distance > 0 ? effectiveDistance - distance : 0;

                    let xPos = (pixelsBetween) * i + (force * angleX) / intensity;
                    let yPos = (pixelsBetween) * k + (force * angleY) / intensity
                    
                    if (xPos > 0 && xPos < canvas.width && yPos > 0 && yPos < canvas.height) {
                        ctx.strokeStyle = 'transparent';
                        ctx.beginPath();
                        ctx.arc(
                            xPos,
                            yPos,
                            Math.max(3, force / distance) * (window.outerWidth + window.outerHeight) / (referenceWidth + referenceHeight), 
                            0, 
                            2 * Math.PI
                        );
                        ctx.fill();
                        ctx.stroke();
                    } 
                } 
            }
        }

        requestAnimationFrame(animate); 
    }

    animate();

    window.addEventListener('mousedown', () => {
        const root = document.documentElement;
        cursor.style.backgroundColor = getComputedStyle(root).getPropertyValue('--secondary-2').trim();
        cursor.style.width = "9px";
        cursor.style.height = "9px";

        isMouseDown = true;
    });

    window.addEventListener('mouseup', () => {
        const root = document.documentElement;
        cursor.style.backgroundColor = getComputedStyle(root).getPropertyValue('--primary-2').trim();
        cursor.style.width = "13px";
        cursor.style.height = "13px";

        isMouseDown = false;
    });
});

function getObjectFitSize(
    contains,
    containerWidth,
    containerHeight,
    width,
    height
  ) {
    var doRatio = width / height;
    var cRatio = containerWidth / containerHeight;
    var targetWidth = 0;
    var targetHeight = 0;
    var test = contains ? doRatio > cRatio : doRatio < cRatio;
  
    if (test) {
      targetWidth = containerWidth;
      targetHeight = targetWidth / doRatio;
    } else {
      targetHeight = containerHeight;
      targetWidth = targetHeight * doRatio;
    }
  
    return {
      width: targetWidth,
      height: targetHeight,
      x: (containerWidth - targetWidth) / 2,
      y: (containerHeight - targetHeight) / 2
    };
}

function darkenColor(color, amount) {
    if (color.startsWith("#")) {
        color = color.slice(1);
    }

    const rgb = [
        parseInt(color.substring(0, 2), 16),
        parseInt(color.substring(2, 4), 16),
        parseInt(color.substring(4, 6), 16),
    ];

    const darkenedRgb = rgb.map((c) => Math.max(10, Math.round(c * (1 - amount / 80))));
    
    if (darkenedRgb[0] == 10 && darkenedRgb[1] == 10 && darkenedRgb[2] == 10) {
        return null;
    }

    const darkenedHex = darkenedRgb
        .map((c) => c.toString(16).padStart(2, "0"))
        .join("");
    
    return `#${darkenedHex}`; 
}