(($) => {
    let playlistId = 427756070;

    let playlistLoader = new Promise((resolve, reject) => {
        $.ajax({
            url: 'http://music.163.com/api/playlist/detail',
            type: 'GET',
            dataType: 'JSON',
            data: {
                id: playlistId,
            },
            headers: {
                Referer: 'http://music.163.com',
                Cookie: 'appver=1.5.0.75771',
            }
        })
        .done(resolve)
        .fail(reject)
    });

    playlistLoader.then();
})(jQuery);
