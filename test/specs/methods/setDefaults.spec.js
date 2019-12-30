describe('setDefaults', () => {
  it('should be a static method', () => {
    expect(Kompressor.setDefaults).to.be.a('function');
  });

  it('should change the global default options', (done) => {
    Kompressor.setDefaults({
      strict: false,
    });

    window.loadImageAsBlob('/base/docs/images/picture.png', (image) => {
      new Kompressor(image, {
        quality: 1,
        success(result) {
          expect(result).to.not.equal(image);

          // Reverts it for the rest test suites
          Kompressor.setDefaults({
            strict: true,
          });
          done();
        },
      });
    });
  });
});
