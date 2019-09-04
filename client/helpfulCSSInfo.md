/*eslint-disable */
// HELPFUL CSS INFO:
//-----------------------------------------------
// General Notes:

  1)

//-----------------------------------------------
// CSS Selectors:

  1) Specificity points:
    The type selector has the lowest specificity weight and holds a point value of 0-0-1.
    The class selector has a medium specificity weight and holds a point value of 0-1-0.
    Lastly, the ID selector has a high specificity weight and holds a point value of 1-0-0. As

    id > class > type (lowest)

  2) Combining Selectors:

    Selects <p> child elements in elements with class hotdog
      .hotdog p {
        background: brown;
      }

    (Note: Spaces between selectors matters)
    (ex: p.mustard {} => means paragraph elements with class mustard)
    (ex: p .mustard {} => means elements within paragraphs that have class mustard)

    Best practice is to:
      a) select classes
      b) select ids
      c) select class+element
      d) select id+element
    to limit the scope of targeting

  3) Layering with classes as a way to limit scope:

    Elements within HTML can have more than one class attribute value so long as each value is space separated. With that, we can place certain styles on all elements of one sort while placing other styles only on specific elements of that sort.

    <a class="btn btn-danger">...</a>
    <a class="btn btn-success">...</a>

    .btn {
      font-size: 16px;
    }
    .btn-danger {
      background: red;
    }
    .btn-success {
      background: green;
    }

  4) separate selectors by comma to target different catagories of items:
    table#t01, #tagA, #tagB {}

    doing: table#01 tagA {} will combine the selectors into 1.


//-----------------------------------------------
// Common CSS property value types:

  Colors:
    Hex, RBG, ...

  Length:
    percentage = 10%
    pixel = 10px
    em => font-size: 10px; width: 10em; (em is a multiplier for the specified font-size => font-size x em = actual size)
//-----------------------------------------------
// Box Model:

  1) Display puts a div inline, on its own line, or doesn't display
    display: <block, inline-block, none>

  2) Box Model:
    div {
      width: 400px; //total width of the inner most box
      height: 100px;  //total width of the inner most box
      padding: 20px; //defines the buffer around the contents
      border: 6px solid #949599; //defines where the box's border is from the padding
      margin: 20px; //defines area around the box
    }

    height and/or width > padding > border > margin (farthest out)

    width and height, padding, and margin are all transparent and just specify length.

    border-radius is used to provide curvature. The value specified

  3) Ways of specifying values:
    a) width: <top> <right> <bottom> <left>;  //clockwise
    b) margin-top: #; margin-bottom: #;
    c) width: <top & bottom> <left & right>
    d) border: 10px solid black;

  4) use of 'auto' property to scale a property based on the content

    width: 0 auto;

//-----------------------------------------------
// Useful CSS properties:

    text-align: <center, left, right>

    //DON'T USE FLOATS TO ALIGN:
    //float right/left aligns elements, clear ensures elements don't overlap.
    //use float: left; for all inline elements so they will all float properly inline
    float:  <left, right>; clear: both;



//-----------------------------------------------
// CSS Grid:

  Use grids to layout content on a page.
  They are like table elements but can be used to
  layout content on a page into columns and rows.



#garden {
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 20% 20% 20% 20% 20%;
}

#element {
  grid-column-start: < 3; span 3; -1>; grid-column-end: < 4; span 4; -1>
  grid-row-start: < 3; span 3; -1>; grid-row-end: < 4; span 4; -1>
}

//------------------
justify-items: start | end | center | stretch
  This aligns grid items in the row direction (left/right)
//------------------
align-items: start | end | center | stretch
  This aligns grid items in the column direction (up/down)
//------------------
justify-content: start | end | center | stretch | space-around | space-between | space-evenly
  This aligns a group of grid items within the grid in the row direction if the group of items doesn't fill up the grid.
//------------------
align-content: start | end | center | stretch | space-around | space-between | space-evenly
  This aligns a group of grid items within the grid in the column direction if the group of items doesn't fill up the grid.

//------------------
auto-fit and auto-fill + repeat() + minmax(min, max):

  To specify an unknown number of columns based on the width of the viewport, you can use =>

    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))

  This will auto-fit a number of grid items per row and WRAP THEM if they don't fit, and the minmax range is specified dictating the range of column widths. Without specifying auto-fit, the row will not wrap and just extend on past the viewport.

  The difference between auto-fill and auto-fit is:
    - auto-fill will calculate if an empty space is available for another element and will place a space there in the row regardless of whether there is another grid element to fill it.

    - auto-fit will too calculate if space is available for another grid item but will check to see if there is an element to place there. If there is no element, then it will distribute the extra space amongst the items in the row OR if each element is fixed width, it will just behave like auto-fill and leave an empty space unless there is another element to fill it.

  https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/


  *****
  THEREFORE, it is best to use this feature of a grid for a responsive design. And the way to use it is to specify:

  grid-template-columns: repeat(auto-fit, minmax());

  Specifying a min-max width range allows for a scaling each grid element which looks more responsive than a fixed width element that will leave the page unbalanced until another grid item can fit in the open space.

//-------------------------------------------------------
//CSS:

  Positioning has 2 states => being in normal flow or not in normal flow.

  Position:
    static; // this is the default value for all elements. It keeps elements in the normal flow of the page. Normal flow is the stacking of each element all on the same sheet. All elements have a default position on the page. Using position, you can move them around to be on a different layer than the static layer.

    fixed; // always appears at the same place relative to the browser window => then you can specify left:, right:, top:, bottom:. This removes the element from normal flow and can overlap other elements.

    absolute; // is set at those exact coordinates relative to its parent element. If there is no parent element, then it is positioned relative to the HTML tag which is the window. i.e., and does not move => then you can specify left:, right:, top:, bottom:. Absolute removes the element from normal flow and can overlap other elements.

    relative; // positions an element relative to its static default position in the normal flow of the page => then you can specify top/down...etc.

    z-index: -1,0,1,2,3,4... //specifies the layer on which an element that is outside the normal flow is positioned (absolute or fixed) will be on the page.

    When you place an absolute positioned object in a relative position element or static element, the absolute position is from the parent (in this case static or relative positioned element)

  Box-Model:

    When sizing a box, you can ridgidly set the boundaries of the box or ridgidly set them relative to maybe the viewport or %.
    Sizing metrics:
    rigid => width: 10px; height: 200px;

    Sizing value types:
    % => percentages are a percentage of the parent element

    max-width: ___px / __% / etc. // this property will override width. It sets the maximum width for the element, BUT when the window is resized to be small, the width also changes as a % of the total page. It is unlike setting a width as a % which will constantly scale as the window gets larger, max-width scales up until a point. Therefore, set max-width ONLY with px. If specified as a %, then it is no different than width: __%.

    Overflow: visible / scroll (i.e., create a scoll bar and box) / hidden (hid all content that doesn't fit within the confines of the width/height properties) / auto (if and only if the contents become too large, then create a scoll bar, otherwise don't)



  Sizing:
    Relative sizing units:

    They are based on:
    1) The parent's dimensions (%)
      - This is based on the % of the parent element.
    2) The currently declared font-size (em, rem, ex, ch)
      - em and rem are used the most
      - 1 em = 1x the FONT-SIZE of the parent element or of the element.
      - 1 rem = 1x root element's FONT-SIZE. You can specify the root element explicitly.
    3) Viewport dimensions (vw, vh, vmin, vmax)
      - these dimensions divide up the window into 100x100 grid and so 50vw = 50% of the width of the window
      - vmin and vmax variably select the smallest(vmin) or largest(vmax) dimension (width or height) and adjust the element based on that. So 50vmin means 50% of the smallest dimension (lets say it is the width initially) but lets say we move the height of the page to be less than the width of the page, then 50vmin means 50% of the height of the page and not the width. So it is variablized.
      - Uses for vh:
        min-height: 100vh => this means the minimum height of the element will always be the full view height even if you keep on expanding the page. The reason you want to use 100vh instead of 100% which would then reference 100% of the parent's height is because the <body> height is always variable and never set. So 100% of some variable number and it starts out as 0 instead of the view height or window height.

      - setting min height or max height => means you can scale the content-box based on some minimum or maximum value rather than fixing the height or width value if set to 100vh or 100vw.


  Box-sizing:
    By setting box-sizing to border-box, it takes the padding and further shrinks the content-box by not adding to the content box's dimensions but subtracting from it so that the border box = the width and height of the content-box instead of the width + padding and height + padding. This enables you to set the width and height and not have to account for the padding.


  Style inheritance:

  * {
    //anything specified within this select all is overwritten by more specific targeted CSS. Inline CSS is the most specific. Then delegates to the style sheets.

    Least to most important:
    Browser default
    External style sheet (<link>)
    Internal style sheet (<style> in the head or <body>)
    Inline style ()

    http: //monc.se/kitchen/38/cascading-order-and-inheritance-in-css

    element
    .class
    #id
  }


  INLINE ELEMENTS:
  <span> are default display:inline. Inline elements won't show unless it is a block (inline-block). So you have to manually display them.

  <span> you also need to define the height and width of unless you set them to "inheirit" the parent's properties. However, if the parent's properties are relative, then you are relative of a relative which like 10% of 10% = not good.

  PARENT ELEMENT IS BODY AND BODY DOESN'T HAVE A SET HEIGHT!

  Remember, that the parent of all elements is the Body. The body, by default, does not have a height. It only has a default width which is the window width. Therefore, if you want all initial divs to be responsive and relative to the window, you need to set the body to a default height of 100vh. The body height grows as the elements on the page grows unless it is set.

  SPACES BETWEEN INLINE ELEMENTS:
  There is a space that will appear between <span><span> which is caused by the HTML space between the elements. To remove this, one way is to literally remove all space between the HTML elements.

  INLINE / INLINE BLOCK / BLOCK:
  Spans are default inline elements. Divs are default block.
  Block level elements occupies the entire width of the parent element and ends with a newline before and after the element.

  <p> <h> <table> <ul> <ol> <li> are default block-level elements.

    Inline elements:
      respect left & right margins and padding, but not top & bottom
      cannot have a width and height set
      allow other elements to sit to their left and right.

    Block elements:
      respect all of those
      force a line break after the block element

    Inline-block elements:
      allow other elements to sit to their left and right
      respect top & bottom margins and padding
      respect height and width


  Div control:
    align:"left/right/center/justify" specifies the horizontal alignment of the content inside a <div> element.
    <div align:" "></div>



  Margin Top:
    margin-top: if specified as a %, it is a % of the width of the parent and not the height
    margin-bottom: is also specified as a % of the width, not the height


  Child Elements:
    To have it scale in relation to a parent, specify values in % or em or other relative coordinates.
    Use inherit when the parent has an absolute value or a relative.

  Inline Elements:
    They inherit content box size limits from the parent and possibly how they are aligned position wise within the content box of the parent.


  Alignment:
    position: absolute/relative/fixed/static (default)
      top: / left: / bottom: / right:

    vertical-align: middle/top/text-top/text-bottom/...
      The vertical-align CSS property specifies the vertical alignment of an inline or table-cell box.
      If specified using %, the percentage will refer to the line-height of the element itself
      This is typically used for alignment of images (on the image, style="vertical-align:middle" when inline);

    text-align: center
      If you set the parent to this then children are set to inline-block, the children will be centered width wise on the page.

  Margin Collapse:
    Margin collapsing is not visible in the Chrome Dev Tools. It will not show up on the box model of the parent or the child.
    For top block element over bottom block element(s), the bottom margin of the top and the top margin of the bottom elements will be compared. The larger of the 2 ends up being the margin between the top and bottom elements.

    This also happens when there is top margin overlap or bottom margin overlap between a parent and its child. In this case, the child's margin will exist outside of the parent IF the parent doesn't have a margin or padding of its own.

    One way to eliminate margin collapse is to make overflow = auto or overflow = hidden. This will make the child element

    https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing


  Overflow Auto vs Hidden vs Visible:
    The use of Auto or Hidden makes you have to really consider if the parent element has enough content box + padding to make sure the child elements fit. Using Visible allows you to be less diligent and not have to assign widths to everything if it looks aesthetically ok if the child is outside of the parent. So to make Auto or Hidden not create unwanted situations, add padding or width/height to the content box.

    https://bocoup.com/blog/new-overflow-default

    Overflow Auto should be used to eliminate margin collapse. Hidden is 2nd best at this because Auto will at least notify (show) you visibly if your contents exceed the parent AND it will constrain child elements to be within the parent element including all of the Child's top and bottom margins.




//-----------------------------------

FLEX BOX - Used for Layouts vs inline/block/inline-block and position top/left/bottom/right

Parent = .Container
  The parent needs to have:
    .container {
      display: flex => like a block element that fills the entire width of the available space / inline-flex => like inline block element which means it doesn't fill all the remaining space, it just fills what space it needs for the child element's size.
    }

  This makes all children elements of the container into flex-items which you can now add flex css to.

Parent properties:
.container {
  display: flex/inline-flex;

  flex-direction: row (default) => positions all child elements from left to right / column => positions child elements from top to bottom / row-reverse => right to left / column-reverse => bottom to top

  //----------------------------------------------
  flex-wrap:

  nowrap (default) => the flex-items will all be squeezed into the width of the flex-box even if the flex items width is larger than show. So no wrapping will override an elements width in order to smash all child elements within the width of the flex-box

    Nowrap does the following: it will override the child elements (flex-items) width and/or height to fit all the elements onto one row or one column UNLESS the text or child elements of the flex-items do not fit within the resized box that Nowrap shrinks all flex-items to. In that case where maybe child elements of the flex-items are too large for the resized flex-items, the flex-items will spill out of the flex-box in the flex-direction specified.

    wrap => given a flex-direction and a flex-box height and width, it will try and fit as many elements as possible horizontally and vertically and the wrapping for a flex-direction:row is in a left to right positioning direction. For flex-diretion: column, the direction is top to bottom stacking of elements.

      You can also use wrap-reverse which will reverse the direction of wrapping.
      Depending on the flex-direction:row/column, it may try to first align as many items widthwise instead of vertically and for column, it will try and fit as many items vertically based on an items height.

    Wrapping will NOT override the width or height values of flex-items in order to fit the elements into the flex-box width and height. Instead, if it wraps and can't fit them in, then it will add a scroll bar so you can access the additional items. This is unlike nowrap which will just override the child elements.

  //----------------------------------------------
  justify-content: This refers to the bunching of flex items at the start, end or have space in between.

    flex-start (default) => items are aligned to the start of the flex container

    flex-end => items are aligned to the end direction of the flex container

    center => center all flex-items into the center

    space-between => adds a space between the flex-items so that all the space inbetween the elements is evenly divided so the first flex-item touches the beginning of the flex box and the last flex-item touches the end of the flex-box.

    space-around => gives you space-between + a space before the first element and after the last element all fitted into the flex-box.

    space-around and space-between ONLY can add space between and before/after the elements IF there is the flex-items are small enough to allow space to be placed between them. If the content inside each flex-item when totalled, fills the width of the flex-box, then there will not be a space placed between items. ALSO, if wrap is used in conjunction with space-around and space-between, the parser will try and fill in as many items into a row or column before it wraps THEN it will see if there is space inbetween the items to then add space-between or space-around. SO the priority is to fit items into the flex-box THEN check to see if space is available then use it to space the items.

  //----------------------------------------------
  align-content (ONLY WORKS IF flex-wrap:WRAP IS SPECIIED): (while justify-content justifies in the flex-direction, align-content works in the other flex-direction (so if flex-direction is row, the align-content will adjust in the column direction))

  Align content refers to the bunching of the flex items to be beginning, end or have space inbetween. It does not refer to the alignment of items along an axis. That is the job of align-items.

    stretch (default)
    flex-start
    flex-end
    space-between
    space-around

    There are LIMITATIONS to align-content. It will NOT have an impact if there are not more than 2 lines in the flex-box meaning if the elements dont need to be wrapped and all flex-items fit onto one row, then aligning them vertically can be done instead by align-items:center. IF align-items:center is used when the items need to be wrapped, THEN the outcome is not pretty. So IF wrapped is used, then use align-content:center. IF wrapped is used, use align-items: center.

  //----------------------------------------------
  align-items:

  Align-items is for aligning the flex items along an axis.

    stretch (default) => this by default makes all flex-items try and fill either the width (if the flex-direction is column) or height (if the flex-direction is row) of the flex-box even if its content does not fill that space. Flex-items are like a block-element in that regard - taking up as much space as it can.

    center => centers all flex-items in the flex-box vertically if the flex-direction is row or horizontally if the flex-direction is column. CENTER REQUIRES A HEIGHT OF THE FLEX-CONTAINER otherwise it doesnt know how to align itself. This is good to center text in a vertical column.

    flex-start => will align the content at the start of the flex-box (top-right corner if the direction is row, left-wall if the direction is column)

    flex-end => will align the content at the end of the flex-box (bottomr-right corner if the direction is row, right-wall if the direction is column)

    baseline => will align flex-items on their baseline (for flex-direction:row + baseline, items with text will have their text on the same line no matter if the text size is larger for some flex-items and smaller for others. For flex-direction:column, the baseline will be the left edge of the text will all be aligned.)

}




Child Elements:
  Flex items by default are like inline-elements. They will only try and consume the space they need to fit their elements. However, they will stretch in the direction (either width for column flex-direction or height for row flex-direction) to fill up the row or column.

.flex-item {
  order: 1,2,3,4...-1,-2,-3 => Allows you to reorder the HTML elements visually even if they ordered in HTML.

  align-self: this is the equivalent of align-item in the parent flex-box container BUT it overrides the align-content set in the parent. This allows for customization of any individual flex-item.

  flex: 1/2/3/4...-1/-2/-3... => it specifies how to divy up the remaining empty space on a line amongst all the flex-items. So you can specify each flex-item with a flex:# to dictate who gets more or less of the empty space remaining in a flex-box on a given line. So this basically fills out the width (stetches each flex-item) so it can fill up the remaining space. Flex packs in 3 flex-item properties:

  flex:1 => equates to flex-grow =1, flex-shrink =1 and flex-basis=auto;
    flex-grow: # (0 is the default value meaning it wont grow if there is extra space) (this value dictates how much to grow in relation to other flex elements when there is extra space)

    flex-shrink: # (1 is the default for all flex-items meaning all shrink the same amount when smaller than the flex-basis) (this value dictates how much to shrink in relation to other flex elements when there is not enough space)

    flex-basis: # (this specifies the base size of a flex-item before it will grow/shrink based on the flex-shrink/grow parameters). Flex basis OVERRIDES the width (if flex-direction is row) or height (if the flex-direction is column) of a flex-item because it specifies the width at which it will grow or shrink (i.e., flex).

    Flex shrink and grow are calculated by totaling all of the grow and shrink values and dividing the empty space or lack there of by it.

    IF WRAP is used with FLEX:1, then the there will be different extra space on each line of the wrapped elements leading to variable sizing of elements on each line calculated using the variable amount of extra space.

    flex: #grow #shrink #basis => 1 1 400px => if you use short-hand by specifying the grow parameter only, the shrink and basis will be intelligently figured out (i.e., shrink=1 and basis=auto). But for full control, specify all 3 parameters.

    Therefore, it is best to specify a flex-item width and height and specify flex in short-hand so that basis=auto will default to the items width or height and not override it.


}

USER OF AN AUTO PREFIXER:
  This is used during the build-stage where you add on all the different permutations of the css you just entered (e.g., since there are many browsers supporting various different versions of flex-box, the auto prefixer will append all the different versions so the user's browser will be able to find the applicable one.)

//----------------------------------------------------
// LINKING WITH ANCHORS:

  Linking with Anchors <a></a>

    Use relative or absolute address:
      - relatives will have the current path prepended to the relative path
      - absolute paths must start with href="http://..." or href="https://..."

    Link to email while setting to: / subject: / body: of the email:
      <a href="mailto:shay@awesome.com?subject=Reaching%20Out&body=How%20are%20you">Email Me</a>

    Link to open a brand new tab:
      <a href="http://shayhowe.com/" target="_blank">Shay Howe</a>

    Link to spot within a page:
      <a href="#top">Back to top</a> //where #top refers to the element with id="top"


//----------------------------------------------------
  CSS DESIGN:

  => When to use text-align VS flex + align-items center

  For:
    <div>
      <p>Row1</p>
      <p>Row2</p>
      <p>Row3</p>
    </div>

  Where every row is a block element, the text can be centered using text-align to style the div. However, this can lead to overlap between the margins + padding of the <p> elements. If this happens, it is better to use a flex box and center the items using justify-content and align-items both set to center.This adds more lines to the CSS but also offers clear distinction between each element in the div since every element becomes a flex item and won't overlap.

  However, using text-align is good when you want everything centered because setting the div to a flex box will only center the elements relative to the div. It won't center the text inside the p tags unless you explicitly style the p tags as well.


=> When to use Flex and Grid:

  Flex is useful in aligning elements in a row or column.