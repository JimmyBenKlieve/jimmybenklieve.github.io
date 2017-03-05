(($) => {
    let playlistId = 427756070;

    let playlistLoader = new Promise((resolve, reject) => {
        $.getJSON('music-list.json')
        .done(resolve)
        .fail(reject)
    });

    playlistLoader.then();
})(jQuery);
