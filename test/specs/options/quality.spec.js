describe('quality', () => {
  it('should be `0.8` by default', (done) => {
    window.loadImageAsBlob('/base/docs/images/picture.jpg', (image) => {
      const compressor = new Kompressor(image);

      expect(compressor.options.quality).to.equal(0.8);
      done();
    });
  });

  it('should change the size of the output image', (done) => {
    window.loadImageAsBlob('/base/docs/images/picture.jpg', (image) => {
      const compressor = new Kompressor(image, {
        quality: 0.6,
        success(result) {
          expect(result.size).to.below(image.size);

          new Kompressor(image, {
            quality: 0.4,
            success(result1) {
              expect(result1.size).to.below(result.size);

              new Kompressor(image, {
                quality: 0.2,
                success(result2) {
                  expect(result2.size).to.below(result1.size);
                  done();
                },
              });
            },
          });
        },
      });

      expect(compressor.options.quality).to.equal(0.6);
    });
  });
});
