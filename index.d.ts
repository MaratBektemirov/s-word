type WordChangeRule = [number, string];
interface WordChangeRules {
    byType: {
        vowel: WordChangeRule;
        consonant: WordChangeRule;
    };
    byChars: {
        [key: string]: WordChangeRule;
    };
}
declare class SWord {
    private rules;
    constructor(rules: {
        [key: string]: WordChangeRules;
    });
    wordAttrs(word: string): {
        endIndex: number;
        end: string;
        canModify: boolean;
        type: "consonant" | "vowel";
    };
    modifyWord(word: string, preposition: string): string;
    changeWordByPreposition(preposition: string, word: string, maxChangeIndex: number): string;
}
export { SWord, WordChangeRules };
