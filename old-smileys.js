function weWantOldSmileys() {
    var newEmoticons = document.getElementsByClassName("_1ift");
    var toDelete = [];
    for (var i = 0; i < newEmoticons.length; i++) {
        if (newEmoticons[i].getAttribute("data-processed") === "true") break;
        var newEmoticon = {
            node: newEmoticons[i].parentNode,
            text: newEmoticons[i].getAttribute("title")
        };

        newEmoticon.node.setAttribute("data-processed", "true");
        if (newEmoticons[i].classList.contains('_1ifu')) {
            newEmoticon.created = createBigEmoticon(newEmoticon.node.getAttribute("title"));
        } else {
            newEmoticon.type = extractEmoticonType(newEmoticon.node.firstChild.textContent);
            newEmoticon.created = createOldEmoticon(newEmoticon.type, newEmoticon.text)
        }

        if (newEmoticon.created !== null) {
            newEmoticon.node.parentNode.insertBefore(newEmoticon.created, newEmoticon.node);
            toDelete.push(newEmoticon.node);
        }
    }
    for (var d = 0; d < toDelete.length; d++) {
        toDelete[d].parentNode.removeChild(toDelete[d]);
    }
}

function createOldEmoticon(type, text) {
    var converted = getOldEmoticonType(text);
    if (converted !== undefined && converted !== null) type = converted;
    if (!type || !text) {
        return null;
    }
    var span = document.createElement("span");
    span.setAttribute("class", "_lew");
    span.setAttribute("title", type + "-emoticon");
    var innerSpan1 = document.createElement("span");
    innerSpan1.setAttribute("class", "emoticon emoticon_" + type);
    innerSpan1.setAttribute("aria-hidden", "true");
    var innerSpan2 = document.createElement("span");
    innerSpan2.setAttribute("class", "_4mcd");
    innerSpan2.setAttribute("aria-hidden", "true");
    innerSpan2.appendChild(document.createTextNode(text));
    span.appendChild(innerSpan1);
    span.appendChild(innerSpan2);
    return span;
}

function extractEmoticonType(type) {
    return type.substring(0, type.indexOf("-emoticon"));
}

function createBigEmoticon(text) {
    return createOldEmoticon(getOldEmoticonType(text), text);
}

function getOldEmoticonType(text) {
    var converter = {
        ":p": "tongue",
        ":)": "smile",
        ":-)": "smile",
        ":D": "grin",
        ":(": "frown",
        ":-(": "frown",
        ";)": "wink",
        ";-)": "wink"
    };
    return converter[text];
}

setInterval(weWantOldSmileys, 10);