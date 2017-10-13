(($) => {
    function rot (n, x, y, rx, ry) {
        if (ry === 0) {
            if (rx === 1) {
                x = n - 1 - x;
                y = n - 1 - y;
            }

            return [y, x];
        }

        return [x, y];
    }

    function xy2d (n, x, y) {
        let d = 0;

        for (let s = n / 2; s > 0; s /= 2) {
            let rx = (x & s) > 0 ? 1 : 0;
            let ry = (y & s) > 0 ? 1 : 0;
            d +=  s * s * ((3 * rx) ^ ry);
            [x, y] = rot(s, x, y, rx, ry);
        }

        return d;
    }

    function d2xy (n, d) {
        let x = 0;
        let y = 0;
        let t = d;

        for (let s = 1; s < n; s *= 2) {
            let rx = 1 & (t / 2);
            let ry = 1 & (t ^ rx);

            [x, y] = rot(s, x, y, rx, ry);

            x += s * rx;
            y += s * ry;
            t /= 4;
        }

        return [x, y];
    }

    function hilbertRearrange (str) {
        let _arr = [];
        let _iter = Math.ceil(Math.sqrt(str.length));

        let _size = _iter * _iter;

        for (let i = 0; i < _size; ++i) {
            let [c, r] = d2xy(_iter, i);

            (!_arr[r]) && (_arr[r] = []);
            _arr[r][c] = str.charAt(i);
        }

        return _arr
        .map((a) => a.join(''))
        .join('');
    }

    function calcSuZhi (name) {
        if (typeof name !== 'string' && !(name instanceof String)) {
            name = String(name);
        }

        let _a = hilbertRearrange(md5(name));
        let _b = hilbertRearrange(md5(name.split().reverse().join('')));

        let _aa = [];
        let _ba = [];

        for (let i = 0; i < _a.length; i += 2) {
            _aa.push(parseInt(
                [..._a.slice(i, i + 2)]
                .reverse()
                .join('')
            , 16));

            _ba.push(parseInt(
                _b.slice(i, i + 2)
            , 16));
        }

        let _i8aa = new Int8Array(_aa);
        let _i8ab = new Int8Array(_ba);

        if (name.includes('维系') || name.includes('维尼')) {
            return -Infinity;
        }

        return _i8aa
        .map((v, i) => v + _i8ab[i])
        .reduce((n, s) => n + s, 0);
    }

    class SuzhiCalculator {
        static get name () {
            return 'Misc/SuzhiCalculator';
        }

        static get defaults () {
            return {
                title: '音游狗素质计算器 V0.0.2 （仅供娱乐，请勿当真）',
                height: 74,
                minWidth: 480,
                minHeight: 0,
                resize: false,
                singleton: true,
            };
        }

        constructor (container) {
            let $windowClientArea = container.$windowClientArea;

            let $nameInput = $('<input>', {
                class: 'form-control',
                placeholder: '请输入名字',
            });

            let $resultDisplay = $('<input>', {
                class: 'form-control',
                placholder: '素质指数',
                readonly: true,
            });

            let $calcButton = $('<button type="button" class="btn btn-primary"><i class="fa fa-arrow-circle-o-right"></i></button>');

            $calcButton.on('click', () => {
                let _name = $nameInput.val();
                let _result = calcSuZhi(_name);

                $resultDisplay.val(_result);
            });

            $windowClientArea.append(
                $('<div>', { class: 'input-group' }).append([
                    $nameInput,
                    $('<span>', { class: 'input-group-btn' }).append($calcButton),
                    $resultDisplay,
                ])
            )
            .addClass('app-suzhi-calculator');
        }

        destroy () {

        }
    }

    window._registerApp(SuzhiCalculator);
})(jQuery);
