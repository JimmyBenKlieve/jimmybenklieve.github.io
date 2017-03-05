(($) => {
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

        console.log('%c' + asciiArt.toString(), 'font-weight: bold;');

        document.createSVGElement = function (tag, attributes) {
            let el = document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (let k in attributes) {
            el.setAttribute(k, attributes[k]);
            }

            return el;
        }

        let $logo = $('#icon-logo');

        $logo.children().wrap(document.createSVGElement('g'));

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

        animSequence.unshift(0);

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
    })();

    $('#sidebar-toggler').on('click', function (e) {
        e.preventDefault();
        let $this   = $(this);
        let $target = $($this.attr('href'));

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
