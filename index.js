"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SWord = void 0;
var letters = {
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
var SWord = /** @class */ (function () {
    function SWord(rules) {
        this.rules = rules;
    }
    SWord.prototype.wordAttrs = function (word) {
        var endIndex = word.length - 1;
        var last = word[endIndex];
        if (last === ",") {
            endIndex--;
            last = word[endIndex];
        }
        var lastL = last.toLowerCase();
        var type = "consonant";
        if (letters.vowel[lastL]) {
            type = "vowel";
        }
        var beforeLast = word[endIndex - 1];
        var beforeLastL = beforeLast.toLowerCase();
        var end = lastL;
        if (letters.vowel[beforeLast]) {
            end = beforeLastL + end;
        }
        return {
            endIndex: endIndex,
            end: end,
            canModify: last === lastL,
            type: type,
        };
    };
    SWord.prototype.modifyWord = function (word, preposition) {
        var config = this.rules[preposition];
        if (config) {
            var attrs = this.wordAttrs(word);
            if (attrs.canModify) {
                var rule = config.byChars[attrs.end] || config.byType[attrs.type];
                return (word.slice(0, attrs.endIndex + 1 + rule[0]) +
                    rule[1] +
                    word.slice(attrs.endIndex + 1, word.length));
            }
        }
        return word;
    };
    SWord.prototype.changeWordByPreposition = function (preposition, word, maxChangeIndex) {
        var nextWords = word.split(/\s/g).filter(function (v) { return v; });
        var i = 0;
        while (nextWords[i] && i <= maxChangeIndex) {
            nextWords[i] = this.modifyWord(nextWords[i], preposition);
            i++;
        }
        return "".concat(preposition, " ").concat(nextWords.join(" "));
    };
    return SWord;
}());
exports.SWord = SWord;
//# sourceMappingURL=index.js.map