(async ($) => {
    let __playlistJSON = (await new Promise((resolve, reject) => {
        $.getJSON('https://raw.githubusercontent.com/JimmyBenKlieve/jimmybenklieve.github.io/master/music-list.json')
        .done(resolve)
        .fail(reject)
    })).result;

    let TrackList = __playlistJSON.tracks;

    let AudioPlayer = class AudioPlayer {
        constructor (selector) {
            this.$ = $(selector);

            this.currentTrackIndex = -1;
            this.$_player = this.$.find('.music-player');
            this.$_albumImage = this.$.find('.music-album-image');
            this.$_trackArtistAndTitle = this.$.find('.music-artist-and-title');
            this.$_toggler = this.$.find('.toggler');

            this.tracklist = TrackList;

            this._player = new Audio5js();

            this.$_ctrlPrev      = this.$.find('.music-control-prev');
            this.$_ctrlNext      = this.$.find('.music-control-next');
            this.$_ctrlPlaypause = this.$.find('.music-control-playback');

            this.$
            .on('click', '.music-control-prev', () => { this.playPreviousTrack(); })
            .on('click', '.music-control-next', () => { this.playNextTrack(); })
            .on('click', '.music-control-playpause', () => { this.playPause(); })

            this.$_timeinfoElapsed = this.$.find('.music-time-elapsed');
            this.$_timeinfoTotal   = this.$.find('.music-time-total');

            this.$_progressBar     = this.$.find('.music-progress > .music-progress-bar');

            this._player.on('ended', () => {
                this.playNextTrack();
            });

            this._player.on('timeupdate', (e) => {
                this.$_timeinfoElapsed.text(e);

                if (typeof this._player.duration === 'number') {
                    let totalTime   = this._player.audio.duration;
                    let elapsedTime = this._player.audio.position;

                    let totalDuration = Math.ceil(totalTime);
                    let totalMin, totalSec;
                    totalMin = ((totalMin = Math.ceil(totalDuration / 60)) < 10 ? '0' : '') + String(totalMin);
                    totalSec = ((totalSec = totalDuration % 60) < 10 ? '0' : '') + String(totalSec);

                    this.$_timeinfoTotal.text(`${totalMin}:${totalSec}`);
                    this.$_progressBar.css({ width: (100 * elapsedTime / totalTime) + '%' });
                }
                else {
                    this.$_timeinfoTotal.text('00:00');
                    this.$_progressBar.css({ width: 0 });
                }
            });

            this.playRandomTrack();
        }

        playPreviousTrack () {
            this.playRandomTrack();
        }

        playNextTrack () {
            this.playRandomTrack();
        }

        playRandomTrack () {
            let r = -Infinity;

            do {
                r = Math.floor(Math.random() * TrackList.length);
            } while (r === this.currentTrackIndex);

            this.playTrack(r);
        }

        playTrack (id) {
            let track = TrackList[id];
            let audioUrl        = track.mp3Url;
            let albumImageUrl   = track.album.picUrl;
            let trackTitle      = track.name;
            let artistsName     = track.artists.map((a) => a.name).join('/');

            this.pauseTrack();

            try {
                this._player.load(audioUrl);
                this._player.seek(0);

                this.$_albumImage.attr({ src: albumImageUrl });
                this.$_trackArtistAndTitle.text(`${artistsName} - ${trackTitle}`);

                this._player.play();
                this._player.volume(1);

                this.$.addClass('audio-playback');
            }
            catch (e) {
                this.playNextTrack();
            }
        }

        playPause () {
            if (this._player.playing) {
                this._player.pause();
                this.$.removeClass('audio-playback');
            }
            else {
                this._player.play();
                this.$.addClass('audio-playback');
            }
        }

        pauseTrack () {
            this._player.pause();
            this.$.removeClass('audio-playback');
        }
    }

    new AudioPlayer('#musicbox');
})(jQuery);
