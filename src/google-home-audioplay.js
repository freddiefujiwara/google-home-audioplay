import {Client} from 'castv2-client';
import {DefaultMediaReceiver} from 'castv2-client';
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
                    contentType: 'audio/mp3',
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
