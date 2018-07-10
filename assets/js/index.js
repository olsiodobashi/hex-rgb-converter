// Color converter (actual name TBD) V1.0
// Convert between RGB and HEX color systems
// ---
// ToDos
// [] - Check if the user inputs a light vs dark color and adjust the body color accordingly, so the text is still readable
var Colors = (function () {
    function Colors() {
        var _this = this;
        this.rgbField = document.getElementById('js__rgbField');
        this.hexField = document.getElementById('js__hexField');
        this.regex = {
            rgb: /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/,
            hex: /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{3}$)/i
        };
        this.bodyDefaultBg = '#252830';
        this.rgbField.addEventListener('keyup', function (event) {
            if (_this.ignoredKeyPressed(event))
                return;
            var color = event.target.value, validRgb = _this.checkValidRgb(color);
            if (validRgb) {
                var intRgbArray = _this.splitColor(color), convertedToHex = _this.rgbToHex(intRgbArray);
                _this.hexField.value = convertedToHex.toUpperCase();
                _this.setBodyBackground('rgb(' + color + ')');
            }
            else {
                _this.setBodyBackground(_this.bodyDefaultBg);
                document.getElementsByTagName('body')[0].className = '';
            }
        });
        this.hexField.addEventListener('keyup', function (event) {
            if (_this.ignoredKeyPressed(event))
                return;
            var color = event.target.value, validHex = _this.checkValidHex(color);
            if (color[0] !== '#') {
                color = '#' + color;
            }
            if (validHex) {
                var convertedRgb = _this.hexToRgb(color);
                _this.rgbField.value = convertedRgb;
                _this.setBodyBackground(color);
            }
            else {
                _this.setBodyBackground(_this.bodyDefaultBg);
            }
        });
    }
    Colors.prototype.checkValidRgb = function (userInput) {
        return this.regex.rgb.test(userInput);
    };
    Colors.prototype.checkValidHex = function (userInput) {
        return this.regex.hex.test(userInput);
    };
    Colors.prototype.rgbToHex = function (rgb) {
        return '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    };
    Colors.prototype.hexToRgb = function (hex) {
        return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) { return '#' + r + r + g + g + b + b; })
            .substring(1)
            .match(/.{2}/g)
            .map(function (x) { return parseInt(x, 16); });
    };
    Colors.prototype.ignoredKeyPressed = function (event) {
        return (event.keyCode === 16 || event.keyCode === 17 || event.keyCode === 18);
    };
    Colors.prototype.splitColor = function (color) {
        var isCommaSeparated = this.isCommaSeparatedColor(color), rgbArray = isCommaSeparated ? color.split(',') : color.split(' ');
        return this.arrayValuesToInt(rgbArray);
    };
    Colors.prototype.isCommaSeparatedColor = function (color) {
        var trimmedColor = this.trimString(color), newColorArray = trimmedColor.split(',');
        return newColorArray.length === 3;
    };
    Colors.prototype.arrayValuesToInt = function (values) {
        var newRgb = values.map(function (v) { return parseFloat(v); });
        return newRgb;
    };
    Colors.prototype.trimString = function (str) {
        return str.replace(new RegExp(' ', 'g'), '');
    };
    Colors.prototype.isBrightColor = function (color) {
        if (color * 100 >= 50) {
            return true;
        }
        return false;
    };
    Colors.prototype.setBodyBackground = function (color) {
        document.body.style.backgroundColor = color;
    };
    return Colors;
})();
new Colors();
