/* eslint require-jsdoc: 1 */
import chai from 'chai';
chai.should();
import GoogleHomeAudioplay from '../src/google-home-audioplay';
describe('GoogleHomeAudioplay test.', (suite) => {
    it('should have properties ', () => {
        const ghs = new GoogleHomeAudioplay('127.0.0.1', 'http://example.com/audio.mp3');
        ghs.should.be.a('object');
        ghs.should.have.property('host').with.equal('127.0.0.1');
        ghs.should.have.property('url').with.equal('http://example.com/audio.mp3');
        ghs.should.have.property('client').with.equal(undefined);
        ghs.should.have.property('reciever').with.equal(undefined);
    });
    it('should run properly ', async () => {
        const ghs = new GoogleHomeAudioplay();
        ghs.should.have.property('run').with.be.a('function');
    });
});

/**
 * request mock returns text/html
 * @param {string} url
 * @return {string} content-type
 */
const requestMockTextHTML = (url) => {
    return {
        statusCode: 200,
        headers: {
            'date': 'Sun, 24 Dec 2017 08:21:29 GMT',
            'expires': '-1',
            'cache-control': 'private, max-age=0',
            'content-type': 'text/html; charset=Shift_JIS',
            'p3p': 'CP="This is not a P3P policy! See g.co/p3phelp."',
            'server': 'gws',
            'x-xss-protection': '1; mode=block',
            'x-frame-options': 'SAMEORIGIN',
            'accept-ranges': 'none',
            'vary': 'Accept-Encoding',
            'connection': 'close',
        },
         body: '',
        url: undefined,
    };
};

/**
 * request mock returns video/mp4
 * @param {string} url
 * @return {string} content-type
 */
const requestMockVideoMp4 = (url) => {
    return {
        statusCode: 200,
        headers: {
            'content-type': 'video/mp4',
            'accept-ranges': 'bytes',
            'etag': '"2051876011"',
            'last-modified': 'Mon, 11 Dec 2017 00:51:16 GMT',
            'content-length': '142194818',
            'connection': 'close',
            'date': 'Sun, 24 Dec 2017 08:18:34 GMT',
            'server': 'lighttpd/1.4.45',
        },
        body: '',
        url: undefined,
    };
};

/**
 * request mock returns audio/x-mpeg
 * @param {string} url
 * @return {string} content-type
 */
const requestMockAudioXMpeg = (url) => {
    return {
        statusCode: 200,
        headers: {
            'date': 'Sun, 24 Dec 2017 08:28:21 GMT',
            'server': 'Apache/2.2.15 (Red Hat)',
            'x-cocoon-version': '2.2.0',
            'vary': 'User-Agent',
            'last-modified': 'Fri, 11 Feb 2011 20:12:25 GMT',
            'expires': 'Sun, 24 Dec 2017 09:28:21 GMT',
            'content-language': 'en-US',
            'content-length': '5920825',
            'connection': 'close',
            'content-type': 'audio/x-mpeg;charset=ISO-8859-1',
        },
        body: '',
        url: undefined,
    };
};
