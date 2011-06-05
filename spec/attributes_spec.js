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

        expect(t.tag(config)).toEqual('<a title="&lt;terrible &quot;title&quot; for an &squo;a&squo;&gt;"></a>');
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
