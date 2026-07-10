import { ZeroEsquerdaPipe } from './zero-esquerda.pipe';

describe('ZeroEsquerdaPipe', () => {
  it('returns the value with zeros added to the left when the total length is greater than the value length', () => {
    const pipe = new ZeroEsquerdaPipe();
    expect(pipe.transform(5, 3)).toBe('005');
    expect(pipe.transform('42', 5)).toBe('00042');
  });

  it('returns the value unchanged when the total length is equal to the value length', () => {
    const pipe = new ZeroEsquerdaPipe();
    expect(pipe.transform(123, 3)).toBe('123');
    expect(pipe.transform('abc', 3)).toBe('abc');
  });

  it('returns the value unchanged when the total length is less than the value length', () => {
    const pipe = new ZeroEsquerdaPipe();
    expect(pipe.transform(12345, 3)).toBe('12345');
    expect(pipe.transform('abcdef', 4)).toBe('abcdef');
  });

  it('handles zero as the value correctly', () => {
    const pipe = new ZeroEsquerdaPipe();
    expect(pipe.transform(0, 3)).toBe('000');
    expect(pipe.transform('0', 5)).toBe('00000');
  });

  it('handles an empty string as the value correctly', () => {
    const pipe = new ZeroEsquerdaPipe();
    expect(pipe.transform('', 3)).toBe('000');
  });

  it('handles a total length of zero correctly', () => {
    const pipe = new ZeroEsquerdaPipe();
    expect(pipe.transform(123, 0)).toBe('123');
    expect(pipe.transform('abc', 0)).toBe('abc');
  });

  it('handles a negative total length correctly', () => {
    const pipe = new ZeroEsquerdaPipe();
    expect(pipe.transform(123, -1)).toBe('123');
    expect(pipe.transform('abc', -5)).toBe('abc');
  });
});
