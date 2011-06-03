/**
 * awesomemarkup - generate markup without all the headache.
 *  clint tseng (clint@dontexplain.com) - 2011-06-03
 *   Licensed under the WTFPL (http://sam.zoy.org/wtfpl/). Do what
 *   you want, but please do let me know what you think.
 */

;(function()
{
    var tag = function(options)
    {
        if (isUndefined(options) || (options === null))
        {
            return '';
        }
        else if (isArray(options))
        {
            var result = [];
            for (var i = 0; i < options.length; i++)
                result.push(tag(options[i]));
            return result.join('');
        }
        else if (isString(options) || isNumber(options))
        {
            return options.toString();
        }

        var elemType = options['_'],
            result = ['<', elemType];

        for (var attr in options)
        {
            // skip these; they're special
            if ((attr == '_') || (attr == 'contents'))
                continue;

            var parsedValue = parseValue(options[attr], attr);
            if (isString(parsedValue) && (parsedValue !== ''))
                result.push(' ' + attr + '="' + xmlEntityEncode(parsedValue) + '"');
        }

        if ((elemType == 'input') || (elemType == 'meta') || (elemType == 'link') || (elemType == 'img'))
            result.push('/>');
        else
          result.push('>' + tag(options['contents']) + '</' + elemType + '>');

        return result.join('');
    };

    var parseValue = function(value, attr)
    {
        if (isUndefined(value) || (value === null))
        {
            return '';
        }
        else if (isArray(value))
        {
            var result = [];
            for (var i = 0; i < value.length; i++)
                result.push(parseValue(value[i]));
            return result.join(' ');
        }
        else if (isString(value) || isNumber(value))
        {
            return value.toString();
        }

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
        if (value.i === true)
            return parseValue(value.t);
        else if (value.i === false)
            return parseValue(value.e);

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
                  .replace(/>/g, '&gt;')
                  .replace(/&(?!(?:[a-z0-9]{1,6}|#x?[a-f0-9]{1,4});)/ig, '&amp;');
    };

// duplicate some of underscore.js's excellent detection functions here
    var isUndefined = function(obj) { return obj === void 0; };
    var isNumber = function(obj) { return !!(obj === 0 || (obj && obj.toExponential && obj.toFixed)); };
    var isString = function(obj) { return !!(obj === '' || (obj && obj.charCodeAt && obj.substr)); };
    var isArray = function(obj) { return toString.call(obj) === '[object Array]'; };

// setup!
    var root = this;

    // export to commonjs/node module if we see one; otherwise add to global
    if (!isUndefined(module) && module['exports'])
        module['exports'] = { tag: tag };
    else
        root['awesomemarkup'] = tag;

    // attach ourselves to various frameworks if we find them
    //if (root['jQuery'])
})();

