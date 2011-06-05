var t = require('../awesomemarkup');

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

