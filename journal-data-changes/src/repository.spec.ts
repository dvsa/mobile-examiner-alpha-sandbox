import repository from './repository';

const repo = new repository('a', 'b', 'c');

describe('getExaminerSubset', () => {

  describe('when passed null input', () => {
    it('should return empty output', () => {
      const result = repo.getExaminerSubset(null, 3);
      expect(result.length).toBe(0);
    });
  });

  describe('when passed insufficient invalid input', () => {
    it('should return empty output', () => {
      const result = repo.getExaminerSubset([ { 'a': 1 }, { 'a': 2 } ], 3);
      expect(result.length).toBe(0);
    });
  });

  describe('when passed insufficient input', () => {
    it('should return all as output', () => {
      const result = repo.getExaminerSubset([ 
          { 'INDIVIDUAL_ID': 1, 'OTHER': 2 }, 
          { 'INDIVIDUAL_ID': 3, 'OTHER': 4 } ], 3);
      // expect(result.length).toBe(2);
      expect(result).toEqual([ 1, 3 ]);
    });
  });

  describe('when passed sufficient input', () => {
    it('should return subset as output', () => {
      const result = repo.getExaminerSubset([ 
        { 'INDIVIDUAL_ID': 10, 'OTHER': 1 }, 
        { 'INDIVIDUAL_ID': 20, 'OTHER': 2 },
        { 'INDIVIDUAL_ID': 30, 'OTHER': 3 },
        { 'INDIVIDUAL_ID': 40, 'OTHER': 4 }
       ], 3);
       // expect(result.length).toBe(3);
       expect(result).toEqual([ 10, 20, 30 ]);
    });
  });
});
