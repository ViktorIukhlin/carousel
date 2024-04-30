import { MarkupService } from './markup.service';

describe('MarkupService', () => {
  it("should replace all '**' symbols with '<span/>' tag", () => {
    const markupService = new MarkupService();
    const input = 'This is a test**with multiple**lines';
    const expectedOutput =
      'This is a test<span class="yellow">with multiple</span>lines';
    const actualOutput = markupService.formatText(input);
    console.log('actualOutput', actualOutput);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it('should handle empty string input', () => {
    const markupService = new MarkupService();
    const input = '';
    const expectedOutput = '';
    const actualOutput = markupService.formatText(input);
    expect(actualOutput).toEqual(expectedOutput);
  });
});
