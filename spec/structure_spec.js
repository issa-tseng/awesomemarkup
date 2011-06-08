var t = require('../awesomemarkup');

describe('toplevel structure', function()
{
    it('should take an array at the top level', function()
    {
        var config = [{
            _: 'div'
        }, 'hello world']

        expect(t.tag(config)).toEqual('<div></div>hello world');
    });


    it('should take a string at the top level', function()
    {
        var config = 'testing';

        expect(t.tag(config)).toEqual('testing');
    });

    it('should take a conditional at the top level', function()
    {
        var config = {
            i: true,
            t: 'success'
        };

        expect(t.tag(config)).toEqual('success');
    });

    it('should take a child', function()
    {
        var config = [{
            _: 'div',
            contents: {
                _: 'span'
            }
        }];

        expect(t.tag(config)).toEqual('<div><span></span></div>');
    });

    it('should take many children', function()
    {
        var config = [{
            _: 'div',
            contents: [{
                _: 'a',
                href: '#',
                contents: 'testing'
            },
            'one two three']
        }];

        expect(t.tag(config)).toEqual('<div><a href="#">testing</a>one two three</div>');
    });

    it('should ignore children for selfclosing tags', function()
    {
        var config = [{
            _: 'input',
            contents: 'innerText'
        }];

        expect(t.tag(config)).toEqual('<input/>');
    });
});

