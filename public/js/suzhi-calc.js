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
        let _iter = Math.ceil(Mat.sqrt(str.length));

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

        return _i8aa
        .map((v, i) => v + _i8ab[i])
        .reduce((n, s) => n + s, 0);
    }

    const COPYRIGHT = {
        version: '0.0.2',
        description: '音游狗素质计算器（仅供娱乐，请勿当真）',
        author: 'J.B.Klieve',
        help: '使用 calcSuZhi("<某人的名字>") 即可计算某人的音游素质指数。'
    }

    for (let k in COPYRIGHT) {
        Reflect.defineProperty(calcSuZhi, k, {
            value: COPYRIGHT[k],
            enumerable: false,
        });
    }

    window.calcSuZhi = calcSuZhi;
})(jQuery);
