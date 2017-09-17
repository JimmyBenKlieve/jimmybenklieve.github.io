(($) => {
    function windowCount (arr, windowSize = 1) {
        let p = [];

        for (let i = 0; i < arr.length; i += windowSize) {
            p.push(arr.slice(i, i + windowSize));
        }

        return p;
    }

    function flat (arr) {
        return arr.reduce((p, v) => {
            if (Array.isArray(v)) {
                p = p.concat(v);
            }
            else {
                p.push(v);
            }

            return p;
        }, []);
    }

    function transpose1d (arr, windowSize) {
        let a = arr.slice(0);

        arr.forEach((v, i) => {
            a[(Math.floor(i / windowSize) + i * windowSize) % arr.length] = v;
        });

        return a;
    }

    function transpose2d (arr) {
        let _windowSize = arr[0].length;
        return windowCount(transpose1d(flat(arr), _windowSize), _windowSize);
    }

    function flipHorizontal2d (arr) {
        return arr.map((a) => a.reverse());
    }

    function sequenceEqual (arr0, arr1) {
        if (arr0.length !== arr1.length) {
            return false;
        }

        for (let i in arr0) {
            if (arr0[i] !== arr1[i]) {
                return false;
            }
        }

        return true;
    }

    // Colors and shadows

    const Color = net.brehaut.Color;

    function makeColorPalette (color, hueInterval = -10) {
        let baseColor = Color(color).toHSV();
        let scheme = baseColor.schemeFromDegrees(
            Array(16)
            .fill(0)
            .map((v, i) => i * hueInterval)
        )
        .map((v) =>
            [
                v,
                v.darkenByAmount(0.08),
                v.darkenByAmount(0.16),
                v.darkenByAmount(0.24),
                v.darkenByAmount(0.32),
                v.darkenByAmount(0.40),
            ]
            .map((v) => v.toCSS())
        );

        let o = {};

        scheme.forEach((v, i) => {
            o[Math.pow(2, i + 1)] = v;
            console.log(v.map((x) => `%c${x}`).join(' '), ...v.map((x) => `color: ${x}`));
        });

        return o;
    }

    function makeThickShadow (color, depth = 4) {
        return Array(depth)
        .fill(0)
        .map((v, i) => `0 ${ i + 1 }px 0 ${ color }`)
        .join(',');
    }

    class Game2048 {
        static get name () {
            return 'Minigames/2048';
        }

        static get defaults () {
            return {
                title: '2048',
                width: 360,
                height: 480,
                minWidth: 0,
                minHeight: 0,
                resize: false,
                singleton: true,
            };
        }

        constructor (container) {
            this._container = container;

            this._colorPalette = makeColorPalette('#a4c5d8', -15);

            let $windowClientArea = container.$windowClientArea;

            this.totalScore = 0;
            this.highScore = 0;
            this.gameBoard = Array(16).fill(0);

            this.totalMoves = 0;
            this._isMoved = false;
            this._isWon = false;
            this._isGameOver = false;

            this.$scoreDisplay = $('<h1 class="score-display">');
            this.$gameBoard = $('<div class="game-board">');
            this.$numberBlocks = this.gameBoard.map((v) =>
                $('<div>', { class: 'number-block' }).append([
                    $('<div>', { class: 'number-value' })
                ])
            );

            this.$totalMovesDisplay = $('<div class="total-moves-display">');
            this.$highScoreDisplay = $('<div class="highscore-display">');

            let $restartButton = $('<button class="restart-button" type="button"><i class="fa fa-rotate-left fa-fw"></i>Restart</button>')

            $restartButton.on('click', () => {
                this.restart();
            });

            $windowClientArea
            .addClass('app-2048')
            .append([
                $('<div class="status">').append([
                    $('<small class="text-left">Moves</small>').append(this.$totalMovesDisplay),
                    $('<div class="text-center">Score</div>'),
                    $('<small class="text-right">Highscore</small>').append(this.$highScoreDisplay),
                ]),
                this.$scoreDisplay,
                this.$gameBoard.append(this.$numberBlocks),
                $('<div class="game-buttons">').append([
                    $restartButton.addClass('restart-button'),
                ])
            ]);

            this._$resizeGameBoard();
            this.restart();

            $(window).on('keyup', this._keyupHandler.bind(this));
        }

        destroy () {
            $(window).off('keyup', this._keyupHandler);
        }

        _keyupHandler ($event) {
            if (!this._container._isFocused) {
                return;
            }

            switch ($event.keyCode) {
                case 37: this.tryMove('left'); break;
                case 38: this.tryMove('up');   break;
                case 39: this.tryMove('right');break;
                case 40: this.tryMove('down'); break;
                default: return;
            }

            return false;
        }

        _$resizeGameBoard () {
            this.$gameBoard.height(this.$gameBoard.width());
            return this;
        }

        _createNumber () {
            return Math.random() < (1 / 6) ? 4 : 2;
        }

        _listFreeCellsIndex () {
            return this.gameBoard.map((v, i) => v ? -1 : i).filter((i) => i !== -1);
        }

        _getRandomFreeCellIndex () {
            let _spaces = this._listFreeCellsIndex();

            if (_spaces.length === 0) {
                return null;
            }
            else {
                return _spaces[Math.floor(Math.random() * _spaces.length) % _spaces.length];
            }
        }

        hasFreeCell () {
            return this.gameBoard.some((v) => v === 0);
        }

        checkMovable () {
            if (this.hasFreeCell()) {
                // Can't lose while have free cells
                return true;
            }
            else {
                // No free cells
                if ((this._move('up').moveScore === 0)
                    && (this._move('left').moveScore === 0)
                    && (this._move('right').moveScore === 0)
                    && (this._move('down').moveScore === 0)
                ) {
                    return false;
                }

                return true;
            }
        }

        _move (dir) {
            let _b = [];
            let _moveScore = 0;

            switch (dir) {
            case 'up':
                _b = windowCount(transpose1d(this.gameBoard, 4), 4);
                break;

            case 'right':
                _b = flipHorizontal2d(windowCount(this.gameBoard, 4));
                break;

            case 'down':
                _b = flipHorizontal2d(windowCount(transpose1d(this.gameBoard, 4), 4));
                break;

            case 'left':
                _b = windowCount(this.gameBoard, 4);
                break;
            }

            _b = _b.map((arr) => {
                let _a = [];
                let _previous = null;

                arr
                .filter((v) => v)
                .forEach((v) => {
                    if (!_previous || _previous !== v) {
                        _a.push(v);
                        _previous = v;
                    }
                    else {
                        _moveScore += (_a[_a.length - 1] += v);
                        _previous = null;
                    }
                });

                _a.splice(_a.length, 0, ...Array(4 - _a.length).fill(0));

                return _a;
            });

            switch (dir) {
            case 'up':
                _b = transpose1d(flat(_b), 4);
                break;

            case 'right':
                _b = flat(flipHorizontal2d(_b));
                break;

            case 'down':
                _b = transpose1d(flat(flipHorizontal2d(_b)), 4);
                break;

            case 'left':
                _b = flat(_b);
                break;
            }

            return {
                board: _b,
                moveScore: _moveScore,
            };
        }

        tryMove (dir) {
            let { board: _b, moveScore: _moveScore } = this._move(dir);

            // Check if truely moved
            this._isMoved = sequenceEqual(_b, this.gameBoard) ? false : dir;

            if (this._isMoved) {
                this.gameBoard = _b;
                this.totalScore += _moveScore;

                this.totalMoves++;
                this._$updateTotalMoves();

                if (this.totalScore > this.highScore) {
                    this.highScore = this.totalScore;
                    this._$updateHighscore();
                }

                if (this.gameBoard.findIndex((v) => v === 2048) >= 0) {
                    this.win();
                }

                let _randFreeSpace = this._getRandomFreeCellIndex();
                this.gameBoard[_randFreeSpace] = this._createNumber();

                // Check if movable...
                if (!this.checkMovable()) {
                    this.lose();
                }
            }

            this._$updateGameBoard();
            this._$updateScore();

            return this;
        }

        _$updateGameBoard () {
            this.gameBoard.forEach((v, i) => {
                let _gradient = this._colorPalette[v];

                let $el = this.$numberBlocks[i];
                let $children = $el.children().eq(0);
                let _style = {};

                if (v) {
                    _style = {
                        top: -4,
                        color: _gradient[5],
                        backgroundColor: _gradient[0],
                        boxShadow: makeThickShadow(_gradient[2], 4),
                    };
                }
                else {
                    _style = {
                        top: 0,
                        color: 'rgba(255,255,255,0)',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    }
                }

                console.log()

                $children
                .text(v ? v : '')
                .css(_style);
            });

            return this;
        }

        _$updateScore () {
            let oldScore = this.$scoreDisplay.data('score');
            let newScore = this.totalScore;

            let _this = this;

            // Write to data
            this.$scoreDisplay.data({ score: this.totalScore });

            this._scoreTween = new TWEEN.Tween({
                score: oldScore,
            })
            .to({
                score: newScore,
            }, Math.max(Math.log2(Math.abs(newScore - oldScore)), 1) * 100)
            .easing(TWEEN.Easing.Quintic.Out)
            .onUpdate(function () {
                _this.$scoreDisplay.text(Math.round(this.score));
            })
            .start();

            return this;
        }

        _$updateHighscore () {
            let oldScore = this.$highScoreDisplay.data('highScore');
            let newScore = this.highScore;

            let _this = this;

            // Write to data
            this.$highScoreDisplay.data({ highScore: this.highScore });

            this._scoreTween = new TWEEN.Tween({
                score: oldScore,
            })
            .to({
                score: newScore,
            }, Math.max(Math.log2(Math.abs(newScore - oldScore)), 1) * 100)
            .easing(TWEEN.Easing.Quintic.Out)
            .onUpdate(function () {
                _this.$highScoreDisplay.text(Math.round(this.score));
            })
            .start();

            return this;
        }

        _$updateTotalMoves () {
            let _old = this.$totalMovesDisplay.data('totalMoves');
            let _new = this.totalMoves;

            let _this = this;

            // Write to data
            this.$totalMovesDisplay.data({ totalMoves: this.totalMoves });

            this._scoreTween = new TWEEN.Tween({
                moves: _old,
            })
            .to({
                moves: _new,
            }, Math.max(Math.abs(_new - _old), 1) * 10)
            .easing(TWEEN.Easing.Quintic.Out)
            .onUpdate(function () {
                _this.$totalMovesDisplay.text(Math.round(this.moves));
            })
            .start();

            return this;
        }

        win () {
            this._isWon = true;
            this._isGameOver = true;
        }

        lose () {
            this._isGameOver = true;
            this.$gameBoard.css({
                filter: 'grayscale(1)',
            });
        }

        restart () {
            this._isWon = false;
            this._isGameOver = false;
            this._isMoved = false;

            this.totalScore = 0;
            this.totalMoves = 0;
            this.gameBoard = Array(16).fill(0);
            this.gameBoard[this._getRandomFreeCellIndex()] = this._createNumber();
            this.gameBoard[this._getRandomFreeCellIndex()] = this._createNumber();

            this.$scoreDisplay.data('score') || this.$scoreDisplay.data({ score: 0 });
            this.$highScoreDisplay.data('highScore') || this.$highScoreDisplay.data({ highScore: 0 });
            this.$totalMovesDisplay.data('totalMoves') || this.$totalMovesDisplay.data({ totalMoves: 0 });

            this.$gameBoard.css({
                filter: 'none',
            });

            this._$updateHighscore();
            this._$updateTotalMoves();
            this._$updateGameBoard();
            this._$updateScore();
        }
    }

    window._registerApp(Game2048)
})(jQuery);
