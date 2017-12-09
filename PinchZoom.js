/**
 * Created by SHARAD on 09-Dec-17.
 */
/**
 * Pinch Zoom
 * creates a pinch zoom able image in a scrollable container
 *
 * 
 *
 * @example
 *     {
 *         xtype: 'pinchzoomimage',
 *         src: 'https://www.gstatic.com/webp/gallery3/2.png'
 *     }
 *
 * or with fixed sizes
 *
 *    {
 *         xtype: 'pinchzoomimage',
 *         src: 'https://www.gstatic.com/webp/gallery3/2.png',
 *         iWidth: 320,
 *         iHeight: 440
 *     }
 *
 *
 */
Ext.define('Ext.ux.modern.PinchZoom', {
    extend: 'Ext.Container',
    xtype: 'pinchzoomimage',
    alias: 'widget.pinchzoomimage',

    requires: [
        'Ext.layout.VBox'
    ],

    config: {
        src: '',
        layout: {
            type: 'hbox',
            //align: 'center',
            //pack: 'center',
            //overflow: 'scroller'
        },
        scrollable: true
    },

    initialize: function () {
        var me = this;
        me.addListener('painted', me.initImage, me);
    },

    initImage: function (newImageSrc) {
        var me = this,
            image = me.getComponent('imageItemId');

        if (image) {
            me.remove(image, true);
            image = me.createImageComponent(me);
            me.add(image);
        } else {
            image = me.createImageComponent(me);
            me.add(image);
        }
    },

    createImageComponent: function (me) {
        var height = me.iHeight,
            width = me.iWidth,
            src = me.getSrc() || 'https://www.gstatic.com/webp/gallery3/2.png';
        return Ext.create('Ext.Component', {
            itemId: 'imageItemId',
            mode: '',
            height: height || 330,
            width: width || 310,
            html: '<p align="center"><img src="' + src + '"style="max-width:100%;max-height: 100%;"/>',
            listeners: {
                pinch: {
                    element: 'element',
                    fn: this.onImagePinch,
                    scope: me
                },
                doubletap: {
                    element: 'element',
                    fn: this.onImageDoubletap,
                    scope: me
                }
            }
        });
    },

    onImageDoubletap: function (e) {
        var me = this,
            image = me.items.items[0],
            initialWidth = image.getInitialConfig('width'),
            initialHeight = image.getInitialConfig('height');

        image.setWidth(initialWidth);
        image.setHeight(initialHeight);
    },

    onImagePinch: function (e) {
        var me = this,
            initialWidth = image.getInitialConfig('width'),
            initialHeight = image.getInitialConfig('height'),
            image = me.items.items[0],
            width = image.getWidth(),
            height = image.getHeight(),
            newWidth = width * e.scale,
            newHeight = height * e.scale,
            scroller = me.getScrollable(),
            pos = scroller.getMaxPosition();

        if (e.scale > 0.5 && e.scale < 1.3) {
            if (newWidth >= initialWidth && newHeight >= initialHeight) {
                image.setWidth(newWidth);
                image.setHeight(newHeight);
                scroller.scrollTo(pos.x / 2, pos.y / 2);
            }
        }
    }

});
