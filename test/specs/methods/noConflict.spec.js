describe('noConflict', () => {
  it('should be a static method', () => {
    expect(Kompressor.noConflict).to.be.a('function');
  });

  it('should return the Kompressor class itself', () => {
    const { Kompressor } = window;
    const ImageKompressor = Kompressor.noConflict();

    expect(ImageKompressor).to.equal(Kompressor);
    expect(window.Kompressor).to.be.undefined;

    // Reverts it for the rest test suites
    window.Kompressor = ImageKompressor;
  });
});
