// -------------------------------------------------------------
//   Basic Navigation
// -------------------------------------------------------------
function createSlys(id) {
    //var $newFrame = $('#newFrame');
    //var $featFrame = $('#featFrame');
    var $frame = $(id);
    var $wrap = $frame.parent();
    //var $wrap2 = $featFrame.parent();

    var $options = {
        horizontal: 1,
        itemNav: 'basic',
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        pagesBar: $wrap.find('.pages'),
        activatePageOn: 'click',
    };

    var newSly = new Sly($frame, $options).init();
    //$options.pagesBar = $wrap2.find('.pages');
    //var featSly = new Sly($featFrame, $options).init();
}