(($) => {
    $.fn.transition = function (transitionName = '') {
        this
        .addClass('transition-from transition-active')
        .addClass(transitionName);

        requestAnimationFrame(() => {
            this
            .removeClass('transition-from')
            .addClass('transition-to');
        })

        this.one('transitionend animationend', () => {
            this
            .removeClass('transition-active transition-to')
            .removeClass(transitionName);
        });
    }
})(jQuery);

(($) => {
    requestAnimationFrame(function TweenAnimation () {
        requestAnimationFrame(TweenAnimation);
        TWEEN.update();
    });

    let UA = window.detectUserAgent();

    console.log(UA.browser, UA.version);

    (function logoMaker () {
        let asciiArt = new String([
            '#     #  ####  #    #    #    #  #######     #     #  #     # #######',
            '#     # #   # ##   # #  # #   ##  #    #     #     #  #     #       #',
            '#     ##    #  #  #    #   #  # #             #   #   #     #       #',
            '#     #     #    #    #     #    #            #   #   #     #      # ',
            '#     #     #   #    #   #   #    #   #        # #    #     #     #  ',
            '#     #     #  #    #   ###   #    ####         #      #   #     #   ',
            '#     #     #   #    #   #   #    #   #        # #      # #     #    ',
            '#     #     #    #    #     #    #            #   #      #     #     ',
            '#    ##     #  #  #    #   #  # #             #   #     #     #      ',
            '#   # #     #  #   # #  # #   ##  #    #     #     #   #      #      ',
            '####  #     #  #    #    #    #  #######  #  #     #  #       #######',
        ].join('\n'));

        // console.log(asciiArt.toString());

        document.createSVGElement = function (tag, attributes) {
            let el = document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (let k in attributes) {
            el.setAttribute(k, attributes[k]);
            }

            return el;
        }

        let $logo = $('#icon-logo');

        if (UA.browser === 'Internet Explorer' || UA.browser === 'Edge') {
            // Just show the logo...
            $logo.removeAttr('stroke-dashoffset', 'stroke-dasharray');
        }
        else {
            $('html').addClass('not-ie');

            // Use <animate> SVG element
            $logo.children().wrap(document.createSVGElement('g'));

            let animDelay = 0.5;
            let animSequence = [
                0.2 , 0.2, 0.1,
                0.05, 0.05,
                0.25,
                0.3,
                0.05, 0.3,
                0.05, 0.05,
                0.1,
                0.1, 0.05,
                0.1,
                0.1,
                0.15, 0.15,
                0.1,
                0.4
            ];

            animSequence.unshift(animDelay);

            $logo.children().each((i, el) => {
                if (animSequence[i - 1]) {
                animSequence[i] = animSequence[i - 1] + animSequence[i];
                }

                let animEl = document.createSVGElement('animate', {
                attributeName: 'stroke-dashoffset',
                to: 0,
                begin: animSequence[i] + 's',
                dur: '1s',
                fill: 'freeze',
                repeatCount: 1
                });

                el.appendChild(animEl);
            });
        }
    })();

    $('.toggler').on('click', function (e) {
        e.preventDefault();
        let $this   = $(this);
        let $target = $($this.attr('href') || $this.attr('data-target'));

        let isActive = $this.hasClass('active');
        if (isActive) {
            $this.removeClass('active');
            $target.removeClass('show');
        }
        else {
            $this.addClass('active');
            $target.addClass('show');
        }
    });

    $('[data-toggle="tooltip"]').tooltip({
        container: 'body',
    });
})(jQuery);

(($) => {
    function rippleInEffect (sourceX, sourceY) {
        let $window   = $(window);
        let wndWidth  = $window.innerWidth();
        let wndHeight = $window.innerHeight();

        let r    = Math.sqrt(Math.pow(Math.max(sourceX, wndWidth - sourceX), 2) + Math.pow(Math.max(sourceY, wndHeight - sourceY), 1));
        let top  = sourceY - r;
        let left = sourceX - r;
    }

    $('musicbox-expander').on('click', (e) => {
        e.preventDefault();
        rippleInEffect(e.pageX, e.pageY);
    });
})(jQuery);

(($) => {
    class AppContainer {
        constructor (AppClass, o = {}) {
            this._PID = o._PID;

            this._isResizing = false;
            this._isMoving = false;
            this._isFocused = true;
            this._isMaximized = false;
            this._isResizable = true;

            this.id = `app-instance-${ md5((new Date()).toISOString() + Date.now()) }`

            let {
                title = '',
                top = 40,
                left = 120,
                width = 320,
                height = 240,
                minWidth = 0,
                minHeight = 0,
                resize = true,
                singleton = false,
            } = Object.assign({}, AppClass && (AppClass.defaults || {}), o);

            if (singleton) {
                let _search = Object.values(containers).find((c) => c.appInstance.constructor === AppClass);
                if (_search) {
                    _search.focus();
                    throw new Error('Cannot create app instance because it can only run one instance at the same time.');
                }
            }

            this._isResizable = resize;

            const _mousemoveWindowResize = ($event) => {
                if (this._isResizing) {
                    $event.relatedTarget = $event.data.relatedTarget;
                    $event.data = {};

                    this._$resizeWindow($event);
                }
            };

            const _mousemoveWindowMove = ($event) => {
                if (this._isMoving && !this._isMaximized) {
                    this._$moveWindow($event);
                }
            }

            this.$window = $('<div>', {
                id: this.id,
                class: 'app-window',
                role: 'dialog',
                tabindex: -1,
                opacity: 0
            })
            .css({
                top,
                left,
                width,
                height,
            });

            if (resize) {
                this.$window.attr('resize', resize === true ? 'both' : resize)
            }

            this.$windowClientArea = $('<div>', { class: 'window-client-area', role: 'presentation' });
            this.$windowTitlebar = $('<div>', { class: 'window-titlebar' });

            this.$windowResizers = $('<div>', { class: 'window-resizers is-focused' })
            .append(
                'n,e,w,s,nw,ne,sw,se'
                .split(',')
                .map((dir) =>
                    $('<div>', {
                        class: `resizer resizer-${ dir }`,
                    })
                    .data('resize-dir', dir)
                )
            );

            let $windowTitle = $('<header>', { class: 'window-title' }).text(title);

            let $windowMaximizeButton = $('<button type="button" class="window-command-button command-maximize"><i class="fa fa-window-maximize fa-fw"></i></button>')
            .on('click', () => this.maximize());

            let $windowCloseButton = $('<button type="button" class="window-command-button command-close"><i class="fa fa-close fa-fw"></i></button>')
            .on('click', () => this.destroy());

            let $windowCommandButtonGroup = $('<div>', { class: 'window-command-button-group' }).append([
                // $windowMaximizeButton,
                $windowCloseButton,
            ])
            .on('mousedown', () => false);

            this.$window[0].addEventListener('mousedown', () => {
                this.focus();
                this.pullFront();
            }, true);

            this.$windowTitlebar.on('mousedown', ($event) => {
                this._isMoving = true;
                this.$window.addClass('is-moving');

                this.pullFront();

                let { left: _l, top: _t } = this.windowPosition;

                let _ol = $event.pageX - _l;
                let _ot = $event.pageY - _t;

                let $body = $(document.body);

                $body
                .css({ userSelect: 'none' })
                .on('mousemove', { $left: _ol, $top: _ot }, _mousemoveWindowMove)
                .one('mouseup', () => {
                    $body
                    .off('mousemove', _mousemoveWindowMove)
                    .css({ userSelect: null });

                    this._isMoving = false;
                    this.$window.removeClass('is-moving');
                })
            });

            this.$windowResizers.on('mousedown', '.resizer', ($event) => {
                if (this._isMaximized || !this._isResizable) {
                    return;
                }

                this._isResizing = true;
                this.$window.addClass('is-resizing');

                let $body = $(document.body);

                let _oldCursor = $body.css('cursor');

                $body
                .css({
                    cursor: $($event.target).css('cursor'),
                    userSelect: 'none',
                })
                .on('mousemove', { relatedTarget: $event.target }, _mousemoveWindowResize)
                .one('mouseup', () => {
                    $body
                    .off('mousemove', _mousemoveWindowResize)
                    .css({
                        userSelect: null,
                        cursor: _oldCursor
                    });

                    this._isResizing = false;
                    this.$window.removeClass('is-resizing');
                });
            });

            this.$window
            .append([
                this.$windowResizers,
                this.$windowTitlebar.append([
                    $windowTitle,
                    $windowCommandButtonGroup,
                ]),
                $('<div>', { class: 'window-client' }).append([
                    this.$windowClientArea,
                ]),
            ]);

            $(document.body).append(this.$window);

            this.pullFront();
            this.focus();

            this.$window.transition('init');

            height = this.$windowTitlebar.height() + height;
            minWidth = Math.max($windowCommandButtonGroup.width(), minWidth);
            minHeight = Math.max(this.$windowTitlebar.height(), minHeight);

            this.$window.css({
                height,
                minWidth,
                minHeight,
            });

            this.appInstance = new AppClass(this);
        }

        maximize () {
            this._isMaximized = true;
        }

        destroy () {
            this.$window.one('transitionend animationend', () => {
                if ($.isFunction(this.appInstance.destroy)) {
                    this.appInstance.destroy();
                }

                this.$window.remove();
                Reflect.deleteProperty(containers, this._PID);
            });

            this.$window.transition('destroy');
        }

        blur () {
            this._isFocused = false;
            this.$window.removeClass('is-focused');
        }

        focus () {
            Object.values(containers).forEach((c) => c.blur());

            this._isFocused = true;
            this.pullFront();
            this.$window.addClass('is-focused');
        }

        pullFront () {
            let _max = Math.max(...Object.values(containers).map((c) => c.zIndex));
            this.zIndex = _max + 1;
            return this;
        }

        _transition (className = '') {
            this.$window
            .addClass('transition-from transition-active')
            .addClass(className);

            requestAnimationFrame(() => {
                this.$window
                .removeClass('transition-from')
                .addClass('transition-to');
            });

            this.$window.one('transitionend animationend', () => {
                this.$window
                .removeClass('transition-active transition-to')
                .removeClass(className);
            });
        }

        get windowSize () {
            let minWidth = parseInt(this.$window.css('min-width'));
            let minHeight = parseInt(this.$window.css('min-height'));
            let maxWidth = parseInt(this.$window.css('max-width'));
            let maxHeight = parseInt(this.$window.css('max-height'));

            return {
                width: this.$window.outerWidth(),
                height: this.$window.outerHeight(),

                minWidth: isNaN(minWidth) ? 0 : minWidth,
                minHeight: isNaN(minHeight) ? 0 : minHeight,

                maxWidth: isNaN(maxWidth) ? Infinity : maxWidth,
                maxHeight: isNaN(maxHeight) ? Infinity : maxHeight,
            };
        }

        get windowPosition () {
            return this.$window.offset();
        }

        get zIndex () {
            return Number(this.$window.css('zIndex'));
        }

        set zIndex (zIndex) {
            this.$window.css({ zIndex });
        }

        _$moveWindow ($event) {
            this.$window.css({
                top: $event.pageY - $event.data.$top,
                left: $event.pageX - $event.data.$left,
            });
        }

        _$resizeWindow ($event) {
            let _$resizer = $($event.relatedTarget);

            let dir = _$resizer.data('resize-dir').toLowerCase().split('');
            let { top: _t, left: _l } = this.windowPosition;
            let { width: _w, height: _h, minWidth: _minw, minHeight: _minh } = this.windowSize;

            let _ot = $event.pageY - _t;
            let _ol = $event.pageX - _l;

            let _wt = _t;
            let _wl = _l;
            let _ww = _w;
            let _wh = _h;

            if (this._isResizable === true || this._isResizable === 'vertical') {
                if (dir.includes('s')) {
                    _wh = _ot;
                }
                else if (dir.includes('n')) {
                    _wt = Math.min(_wt + _wh - _minh, $event.pageY);
                    _wh = _t + _h - _wt;
                }
            }

            if (this._isResizable === true || this._isResizable === 'horizontal') {
                if (dir.includes('e')) {
                    _ww = _ol;
                }
                else if (dir.includes('w')) {
                    _wl = Math.min(_wl + _ww - _minw, $event.pageX);
                    _ww = _l + _w - _wl;
                }
            }

            this.$window.css({
                top: _wt,
                left: _wl,
                width: _ww,
                height: _wh,
            });
        }
    }

    let apps = {};
    let containers = {};

    window._registerApp = (AppClass, appName) => {
        if (!appName) {
            appName = AppClass.name;
        }

        if (Reflect.has(apps, appName)) {
            console.warn(`App "${ appName }" has been registered, try to use another name.`);
            return false;
        }
        else {
            apps[appName] = AppClass;
            return true;
        }
    };

    window._launchApp = (appName) => {
        try {
            if (Reflect.has(apps, appName)) {
                let _PID = Date.now();

                containers[_PID] = new AppContainer(apps[appName], {
                    _PID,
                });

                return _PID;
            }
        }
        catch (error) {
            console.warn(error);
        }

        return -1;
    };
})(jQuery);
