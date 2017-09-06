
/*
Tipue Search 5.0
Copyright (c) 2015 Tipue
Tipue Search is released under the MIT License
http://www.tipue.com/search
*/


/*
Stop words
Stop words list from http://www.ranks.nl/stopwords
*/

var tipuesearch_stop_words = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"];


// Word replace

var tipuesearch_replace = {'words': [
     {'word': 'tipua', 'replace_with': 'tipue'},
     {'word': 'javscript', 'replace_with': 'javascript'},
     {'word': 'jqeury', 'replace_with': 'jquery'}
]};


// Weighting

var tipuesearch_weight = {'weight': [
     {'url': 'http://www.tipue.com', 'score': 200},
     {'url': 'http://www.tipue.com/search', 'score': 100},
     {'url': 'http://www.tipue.com/about', 'score': 100}
]};


// Stemming

var tipuesearch_stem = {'words': [
     {'word': 'e-mail', 'stem': 'email'},
     {'word': 'javascript', 'stem': 'jquery'},
     {'word': 'javascript', 'stem': 'js'}
]};


// Internal strings
var tipuesearch_i18n = {
    en: {
        tipuesearch_string_1: 'No title',
        tipuesearch_string_2: 'Showing results for',
        tipuesearch_string_3: 'Search instead for',
        tipuesearch_string_4: '1 result',
        tipuesearch_string_5: 'results',
        tipuesearch_string_6: 'Prev',
        tipuesearch_string_7: 'Next',
        tipuesearch_string_8: 'Nothing found',
        tipuesearch_string_9: 'Common words are largely ignored',
        tipuesearch_string_10: 'Search too short',
        tipuesearch_string_11: 'Should be one character or more',
        tipuesearch_string_12: 'Should be',
        tipuesearch_string_13: 'characters or more'
    },
    pl: {
        tipuesearch_string_1: 'Bez tytułu',
        tipuesearch_string_2: 'Rezultaty dla',
        tipuesearch_string_3: 'Zamiast tego wyszukaj',
        tipuesearch_string_4: '1 wynik',
        tipuesearch_string_5: 'wyniki',
        tipuesearch_string_6: 'Poprzedni',
        tipuesearch_string_7: 'Następny',
        tipuesearch_string_8: 'Brak rezultatów',
        tipuesearch_string_9: 'Pospolite słowa są w większości ignorowane',
        tipuesearch_string_10: 'Zapytanie zbyt krótkie',
        tipuesearch_string_11: 'Powinien być jeden znak lub więcej',
        tipuesearch_string_12: 'Powinno być',
        tipuesearch_string_13: 'znaków lub więcej'
    }
};
