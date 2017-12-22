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
