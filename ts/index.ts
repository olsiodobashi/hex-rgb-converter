// Color converter (actual name TBD) V1.0
// Convert between RGB and HEX color systems
// ---
// ToDos
// [] - Check if the user inputs a light vs dark color and adjust the body color accordingly, so the text is still readable

class Colors {
    rgbField;
    hexField;
    regex;
    bodyDefaultBg;

    constructor() {
        this.rgbField = document.getElementById('js__rgbField');
        this.hexField = document.getElementById('js__hexField');

        this.regex = {
            rgb: /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/,
            hex: /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i
        }

        this.bodyDefaultBg = '#252830';

        // ===
        // listen for key input
        this.rgbField.addEventListener('keyup', (event) => {
            // ignore if shift, ctrl or alt is pressed
            if (this.ignoredKeyPressed(event)) return;

            // get value from input
            let color = event.target.value,
                // check if value is a valid rgb color
                validRgb = this.checkValidRgb(color);

            if (validRgb) {

                let intRgbArray = this.splitColor(color),
                    // actually convert the RGB array to HEX
                    convertedToHex = this.rgbToHex(intRgbArray);

                // write converted HEX into the hex field
                this.hexField.value = convertedToHex.toUpperCase();

                // set the body's bg to that color
                this.setBodyBackground('rgb(' + color + ')');
            } else {
                // if the input value is not a valid RGB,
                // set the body's bg color to the defualt one
                this.setBodyBackground(this.bodyDefaultBg);
                document.getElementsByTagName('body')[0].className = '';
            }
        });
        this.hexField.addEventListener('keyup', (event) => {
            // ignore if shift, ctrl or alt is pressed
            if (this.ignoredKeyPressed(event)) return;

            // get value from input
            let color = event.target.value,
                // check if value is a valid hex color
                validHex = this.checkValidHex(color);

            // add # if the user did not add it
            if (color[0] !== '#') {
                color = '#' + color;
            }

            // if hex is not valid, set default background
            if (validHex) {
                let convertedRgb = this.hexToRgb(color);

                this.rgbField.value = convertedRgb;

                this.setBodyBackground(color);
            } else {
                this.setBodyBackground(this.bodyDefaultBg);
            }
        });
    }

    // =================
    // Check for valid colors
    //
    // check if provided RGB is valid
    checkValidRgb(userInput): boolean {
        return this.regex.rgb.test(userInput);
    }
    // check if provided HEX is valid
    checkValidHex(userInput): boolean {
        return this.regex.hex.test(userInput);
    }
    // =================

    // =================
    // Converter functions
    //

    // from RGB
    rgbToHex(rgb): string {
        return '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    }

    // from HEX
    hexToRgb(hex): number[] {
        return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
            .substring(1)
            .match(/.{2}/g)
            .map(x => parseInt(x, 16));
    }
    // =================

    // =================
    // Utilities
    //
    ignoredKeyPressed(event): boolean {
        return (event.keyCode === 16 || event.keyCode === 17 || event.keyCode === 18);
    }
    // split RGB into array depending on whether the user entered a comma or space separated color
    // also convert string values to numbers
    splitColor(color) {
        let isCommaSeparated = this.isCommaSeparatedColor(color),
            rgbArray = isCommaSeparated ? color.split(',') : color.split(' ');

        return this.arrayValuesToInt(rgbArray);
    }
    // used only to check if the provided rgb is separated by commas or spaces
    isCommaSeparatedColor(color): boolean {
        let trimmedColor = this.trimString(color),
            newColorArray = trimmedColor.split(',');

        return newColorArray.length === 3;
    }
    // converts string[] => number[]
    arrayValuesToInt(values): number[] {
        let newRgb = values.map((v) => parseFloat(v));

        return newRgb;
    }
    // removed all spaces and commas from string
    trimString(str): string {
        return str.replace(new RegExp(' ', 'g'), '');
    }

    // check if the entered color is light or dark and update the text color accordingly
    isBrightColor(color): boolean {
        if (color * 100 >= 50) {
            return true;
        }
        return false;
    }
    // change body's background
    setBodyBackground(color): void {
        document.body.style.backgroundColor = color;
    }
    // =================
}

new Colors();
