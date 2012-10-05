var t = require('../awesomemarkup');

describe('basic attributes', function()
{
    it('should render a simple attribute', function()
    {
        var config = {
            _: 'div',
            id: 'myDiv'
        };

        expect(t.tag(config)).toEqual('<div id="myDiv"></div>');
    });

    it('should escape attributes', function()
    {
        var config = {
            _: 'a',
            title: '<terrible "title" for an \'a\'>'
        };

        expect(t.tag(config)).toEqual('<a title="&lt;terrible &quot;title&quot; for an &#39;a&#39;&gt;"></a>');
    });

    it('should not escape &s that are entities already', function()
    {
        var config = {
            _: 'a',
            title: '&#x09af;&not entity;&amp;'
        }

        expect(t.tag(config)).toEqual('<a title="&#x09af;&amp;not entity;&amp;"></a>');
    });

    it('should render attributes with self-closing tags', function()
    {
        var config = {
            _: 'img',
            src: '/images/icon.png'
        };

        expect(t.tag(config)).toEqual('<img src="/images/icon.png"/>');
    });

    it('shouldnt choke on nully values', function()
    {
        var config = {
            _: 'div',
            id: undefined,
            'class': null
        };

        expect(t.tag(config)).toEqual('<div></div>');
    });
});

describe('special attributes', function()
{
    it('should handle boolean attributes', function()
    {
        var booleanAttributes = ['checked', 'selected', 'disabled', 'readonly',
                                 'multiple', 'ismap', 'defer', 'declare', 'noresize',
                                 'nowrap', 'noshade', 'compact'];

        for (var i = 0; i < booleanAttributes.length; i++)
        {
            var baseConfig = { _: 'div' };

            baseConfig[booleanAttributes[i]] = true;
            expect(t.tag(baseConfig)).toEqual('<div ' + booleanAttributes[i] + '="' +
                                                        booleanAttributes[i] + '"></div>');

            baseConfig[booleanAttributes[i]] = false;
            expect(t.tag(baseConfig)).toEqual('<div></div>');
        }
    });

    it('shouldnt try to handle boolean values for nonboolean attributes', function()
    {
        var config = {
            _: 'div',
            id: true
        };

        expect(t.tag(config)).toEqual('<div id="true"></div>');
    });

    it('should output class given className', function()
    {
        var config = {
            _: 'div',
            className: 'myClass'
        };

        expect(t.tag(config)).toEqual('<div class="myClass"></div>');
    });

    it('should take a k/v hash for style attributes', function()
    {
        var config = {
            _: 'div',
            style: {
                display: 'none',
                position: 'absolute'
            }
        };

        expect(t.tag(config)).toEqual('<div style="display:none;position:absolute"></div>');
    });

    it('should handle both methods of style attribute compound words', function()
    {
        var config = {
            _: 'div',
            style: {
                marginTop: '1em',
                'margin-bottom': '0.5em'
            }
        };

        expect(t.tag(config)).toEqual('<div style="margin-top:1em;margin-bottom:0.5em"></div>');
    });
});

describe('special attribute values', function()
{
    it('should handle conditionals properly', function()
    {
        var config = {
            _: 'div',
            id: { i: true, t: 'idTrue', e: 'idFalse' },
            name: { i: false, t: 'nameTrue', e: 'nameFalse' }
        };

        expect(t.tag(config)).toEqual('<div id="idTrue" name="nameFalse"></div>');
    });

    it('should be able to nest conditionals', function()
    {
        var config = {
            _: 'div',
            id: { i: true, t: { i: false, t: 'idTrueTrue', e: 'idTrueFalse' }, e: 'idFalse' }
        };

        expect(t.tag(config)).toEqual('<div id="idTrueFalse"></div>');
    });

    it('should handle empty conditional results gracefully', function()
    {
        var config = {
            _: 'div',
            id: { i: true }
        };

        expect(t.tag(config)).toEqual('<div></div>');
    });

    it('should be able to take arrays', function()
    {
        var config = {
            _: 'span',
            'class': [ 'some', 'class', 'names', 'here' ]
        };

        expect(t.tag(config)).toEqual('<span class="some class names here"></span>');
    });

    it('should be able to nest arrays and conditionals', function()
    {
        var config = {
            _: 'span',
            'class': [ 'alwaysHere', { i: true, t: 'sometimesHere' } ]
        };

        expect(t.tag(config)).toEqual('<span class="alwaysHere sometimesHere"></span>');
    });

    it('should take fancy user-defined objects that have toString', function()
    {
        var config = {
            _: 'h1',
            'id': { toString: function() { return 'myToString'; } }
        };

        expect(t.tag(config)).toEqual('<h1 id="myToString"></h1>');
    });
});

