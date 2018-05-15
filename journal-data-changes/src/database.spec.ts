import { generateInClause } from './database';

describe('generateInClause', () => {

  describe('when passed no input', () => {
    it('should return empty output', () => {
      const result = generateInClause(null);
      expect(result).toBe('');
    });
  });

  describe('when passed one input', () => {
    it('should return one output', () => {
      const result = generateInClause(['aaa']);
      expect(result).toBe(':0');
    });
  });

  describe('when passed several inputs', () => {
    it('should return comma-separated output', () => {
      const result = generateInClause(['aaa', 'bbb', 'ccc']);
      expect(result).toBe(':0, :1, :2');
    });
  });
});
