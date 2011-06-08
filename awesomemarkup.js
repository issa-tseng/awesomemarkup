;awesomemarkup = (function()
{
    var tag = function(tag)
    {
        if (isUndefined(tag) || (tag === null))
            return '';
        else if (isArray(tag))
            return _.map(tag, function(subtag) { return $.tag(subtag, true); }).join('');
        else if (isString(tag) || isNumber(tag))
            return tag.toString();

        var result = '<' + tag._;

        for (var attr in tag)
        {
            var value = tag[attr];

            // skip these; they're special
            if ((attr == '_') || (attr == 'contents'))
                return;

            var parsedValue = parseValue(value, attr);
            if (!isString(parsedValue) || (parsedValue !== ''))
                result += ' ' + attr + '="' + xmlEntityEncode(parsedValue) + '"';
        }

        if ((tag._ == 'input') || (tag._ == 'meta') || (tag._ == 'link') || (tag._ == 'img'))
            result += '/>';
        else
          result += '>' + $.tag(tag.contents, true) + '</' + tag._ + '>';

        return result;
    };

    var parseValue = function(value, attr)
    {
        if (isUndefined(value) || (value === null))
            return '';
        else if (isArray(value))
            return _.map(value, function(subvalue) { return parseValue(subvalue, attr); }).join(' ');
        else if (isString(value) || isNumber(value))
            return value.toString();

        // figure out boolean attrs
        if ((value === true) && (attr == 'checked' || attr == 'selected' || attr == 'disabled' ||
            attr == 'readonly' || attr == 'multiple' || attr == 'ismap' || attr == 'defer' ||
            attr == 'declare' || attr == 'noresize' || attr == 'nowrap' || attr == 'noshade' ||
            attr == 'compact'))
            return attr;
        if (value === false)
            return ''; // we don't care what this might have been

        // after this point, we assume that we're an object; all primitive types have been detected

        // figure out conditionals
        if (value.si === true)
            return parseValue(value.ergo);
        else if (value.si === false)
            return parseValue(value.alter);

        // figure out style
        if (attr == 'style')
        {
            var result = '';
            for (var key in value)
                result += key + ':' + parseValue(value[key]) + ';';
            return result;
        }
    };

    var xmlEntityEncode = function(str)
    {
        return str.replace(/"/g, '&quot;')
                  .replace(/'/g, '&squo;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;');
    };

    // duplicate some of underscore.js's excellent detection functions here
    var isUndefined = function(obj) { return obj === void 0; };
    var isNumber = function(obj) { return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed)); };
    var isString = function(obj) { return !!(obj === '' || (obj && obj.charCodeAt && obj.substr)); };
    var isArray = function(obj) { return toString.call(obj) === '[object Array]'; };

    return tag;
})();

