import {Client} from 'castv2-client';
import {DefaultMediaReceiver} from 'castv2-client';
import request from 'sync-request';
/**
 ** main class of GoogleHomeAudioplay
 */
export default class GoogleHomeAudioplay {
    /**
     * @constructor
     * @param {string} host
     * @param {string} url
     */
    constructor(host, url) {
        this.host = host;
        this.url = url;
        this.client = undefined;
        this.reciever = undefined;
        this.request = undefined;
    }
    /**
     * fetch contentType to confirm content type
     * @param {string} url
     * @return {string}
     */
    fetchContentType(url) {
        if ( typeof this.request === 'undefined') {
            this.request = request;
        }
        let res = this.request('HEAD', url);
        if (res.hasOwnProperty('headers') &&
            res['headers'].hasOwnProperty('content-type')) {
            let types = res['headers']['content-type'].split(';');
            if (types.length > 0 ) {
                return types[0];
            }
        }
        return 'audio/mp3';
    }
    /**
     * run commands
     * @return {void}
     */
    async run() {
        if ( typeof this.client === 'undefined') {
            this.client = new Client();
        }
        if ( typeof this.reciever === 'undefined') {
            this.reciever = DefaultMediaReceiver;
        }
        this.client.connect(this.host, () => {
            console.log('host:%s', this.host);
            console.log('url:%s', this.url);
            this.client.launch(this.reciever, (err, player) => {
                let media = {
                    contentId: this.url,
                    contentType: this.fetchContentType(this.url),
                    streamType: 'BUFFERED',
                };
                player.on('status', (status) => {
                    console.log('status:%s',
                        status.playerState);
                });

                console.log('displayName:%s', player.session.displayName);
                console.log('url:%s', media.contentId);
                player.load(media, {autoplay: true}, (err, status) => {
                    if (err === null) {
                        console.log('status:%s',
                            status.playerState);
                        console.log('spoke');
                    } else {
                        console.error(err);
                    }
                    this.client.close();
                });
            });
        });
        this.client.on('error', (err) => {
            console.log('Error:%s', err.message);
            this.client.close();
        });
    }
}
