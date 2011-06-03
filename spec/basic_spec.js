var t = require('../awesomemarkup')

describe('just tags', function()
{
    it('should render a simple div', function()
    {
        var config = {
            _: 'div'
        };

        expect(t.tag(config)).toEqual('<div></div>');
    });

    it('should render a self-closing tag for certain elements', function()
    {
        var selfClosingElems = [ 'input', 'meta', 'link', 'img' ];

        for (var i = 0; i < selfClosingElems.length; i++)
        {
            var config = {
                _: selfClosingElems[i]
            };

            expect(t.tag(config)).toEqual('<' + selfClosingElems[i] + '/>');
        }
    });
});

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
            title: '&#x09af;&not entity;'
        }

        expect(t.tag(config)).toEqual('<a title="&#x09af;&amp;not entity;"></a>');
    });
});

