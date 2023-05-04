const letters = {
  vowel: {
    а: "а",
    и: "и",
    о: "о",
    у: "у",
    ы: "ы",
    э: "э",
    е: "е",
    я: "я",
  },
  consonant: {
    б: "б",
    в: "в",
    г: "г",
    д: "д",
    ж: "ж",
    з: "з",
    й: "й",
    к: "к",
    л: "л",
    м: "м",
    н: "н",
    п: "п",
    р: "р",
    с: "с",
    т: "т",
    ф: "ф",
    х: "х",
    ц: "ц",
    ч: "ч",
    ш: "ш",
    щ: "щ",
  },
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

class SWord {
  constructor(private rules: { [key: string]: WordChangeRules }) {}

  wordAttrs(word: string) {
    let endIndex = word.length - 1;

    let last = word[endIndex];

    if (last === ",") {
      endIndex--;
      last = word[endIndex];
    }

    const lastL = last.toLowerCase();

    let type: "consonant" | "vowel" = "consonant";

    if (letters.vowel[lastL]) {
      type = "vowel";
    }

    const beforeLast = word[endIndex - 1];
    const beforeLastL = beforeLast.toLowerCase();

    let end = lastL;

    if (letters.vowel[beforeLast]) {
      end = beforeLastL + end;
    }

    return {
      endIndex,
      end,
      canModify: last === lastL,
      type,
    };
  }

  modifyWord(word: string, preposition: string) {
    const config = this.rules[preposition];

    if (config) {
      const attrs = this.wordAttrs(word);

      if (attrs.canModify) {
        const rule = config.byChars[attrs.end] || config.byType[attrs.type];
        return (
          word.slice(0, attrs.endIndex + 1 + rule[0]) +
          rule[1] +
          word.slice(attrs.endIndex + 1, word.length)
        );
      }
    }

    return word;
  }

  changeWordByPreposition(
    preposition: string,
    word: string,
    maxChangeIndex: number
  ) {
    const nextWords = word.split(/\s/g).filter((v) => v);

    let i = 0;

    while (nextWords[i] && i <= maxChangeIndex) {
      nextWords[i] = this.modifyWord(nextWords[i], preposition);
      i++;
    }

    return `${preposition} ${nextWords.join(" ")}`;
  }
}

export { SWord };
