declare const rules: {
    в: {
        byType: {
            vowel: (string | number)[];
            consonant: (string | number)[];
        };
        byChars: {
            ай: (string | number)[];
            ь: (string | number)[];
            ие: (string | number)[];
            ия: (string | number)[];
            ый: (string | number)[];
            ы: (string | number)[];
            и: (string | number)[];
        };
    };
    с: {
        byType: {
            vowel: (string | number)[];
            consonant: (string | number)[];
        };
        byChars: {
            ай: (string | number)[];
            ия: (string | number)[];
            ие: (string | number)[];
            о: (string | number)[];
            ь: (string | number)[];
            ый: (string | number)[];
            ы: (string | number)[];
            и: (string | number)[];
        };
    };
};
interface WordChangeRule {
    slice: number;
    replace: string;
}
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
export { SWord, rules };
