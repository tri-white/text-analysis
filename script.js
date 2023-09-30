$(function () {
    $("#analyzeButton").click(function () {
        var inputText = $("#textInput").val();

        var wordCount = inputText.split(/\s+/).filter(Boolean).length;
        var punctuationCount = (inputText.match(/[.,!?;:'"]/g) || []).length;
        var charCount = inputText.length;
        var capitalCount = (inputText.match(/[А-Я]/g) || []).length+(inputText.match(/[A-Z]/g) || []).length;

        $("#wordCount").text(wordCount);
        $("#punctuationCount").text(punctuationCount);
        $("#charCount").text(charCount);
        $("#capitalCount").text(capitalCount);

        var language = detectLanguage(inputText);
        $("#language").text(language);  

        var topKeywords = extractKeywords(inputText, 10);
$("#keywords").text(topKeywords.join(", "));

var sentenceCount = (inputText.match(/[.!?]/g) || []).length;
$("#sentenceCount").text(sentenceCount);

var words = inputText.split(/\s+/).filter(Boolean);
var totalWordLength = words.reduce(function (sum, word) {
return sum + word.length;
}, 0);
var averageWordLength = totalWordLength / wordCount;
$("#averageWordLength").text(averageWordLength.toFixed(1));
    });
});
function detectLanguage(text) {
if (text.match(/[A-Za-z]/)) {
    return "Англійська";
} else if (text.match(/[А-Яа-я]/)) {
    return "Українська";
} else {
    return "Невідомо";
}
}
function extractKeywords(text, limit) {
var words = text.split(/\s+/).filter(Boolean);
var wordCountMap = {};

words.forEach(function (word) {
    var cleanWord = word.toLowerCase();
    if (wordCountMap[cleanWord]) {
        wordCountMap[cleanWord]++;
    } else {
        wordCountMap[cleanWord] = 1;
    }
});

var sortedWords = Object.keys(wordCountMap).sort(function (a, b) {
    return wordCountMap[b] - wordCountMap[a];
});

return sortedWords.slice(0, limit);
}