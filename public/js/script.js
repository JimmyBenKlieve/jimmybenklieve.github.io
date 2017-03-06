(($) => {
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
