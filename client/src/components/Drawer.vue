<template>
  <div class="mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-cell--6-col-phone" style="min-height: 550px;">
    <div style="height: 100%; padding: 5px" class="wrapper-element">
      <div id="canvas-editor">
      </div>
    </div>
  </div>
</template>

<script>
  window.$(document).ready(function($) {
    const drawerPlugins = [
      // Drawing tools
      'Pencil',
      'Eraser',
      'Text',
      'Line',
      'ArrowOneSide',
      'ArrowTwoSide',
      'Triangle',
      'Rectangle',
      'Circle',
      //'Image',
      //'BackgroundImage',
      'Polygon',

      // Drawing options
      //'ColorHtml5',
      'Color',
      'ShapeBorder',
      'BrushSize',
      'OpacityOption',
      'LineWidth',
      'StrokeWidth',

      //'Resize',
      'ShapeContextMenu',
      //'CloseButton',
      'OvercanvasPopup',
      'OpenPopupButton',
      //'MinimizeButton',
      'ToggleVisibilityButton',
      //'MovableFloatingMode',

      'TextLineHeight',
      'TextAlign',

      'TextFontFamily',
      'TextFontSize',
      'TextFontWeight',
      'TextFontStyle',
      'TextDecoration',
      'TextColor',
      'TextBackgroundColor'
    ];

    // drawer is created as global property solely for debug purposes.
    // doing  in production is considered as bad practice
    window.drawer = new window.DrawerJs.Drawer(null, {
      plugins: drawerPlugins,
      pluginsConfig: {
        Image: {
          scaleDownLargeImage: true,
          maxImageSizeKb: 1024 //1MB
        },
        BackgroundImage: {
          scaleDownLargeImage: true,
          maxImageSizeKb: 1024, //1MB
          //fixedBackgroundUrl: '/examples/redactor/images/vanGogh.jpg',
          imagePosition: 'stretch',  // one of  'center', 'stretch', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
          acceptedMIMETypes: ['image/jpeg', 'image/png', 'image/gif'] ,
          dynamicRepositionImage: true,
          dynamicRepositionImageThrottle: 100
        },
        Text : {
          editIconMode : true,
          editIconSize : 'large'
        }
      },
      defaultImageUrl: '/examples/redactor/images/drawer.jpg',
      defaultActivePlugin : { name : 'Pencil', mode : 'lastUsed'},
      debug: true,
      transparentBackground: true,
      align: 'floating',  //one of 'left', 'right', 'center', 'inline', 'floating'
      lineAngleTooltip: { enabled: true, color: 'blue',  fontSize: 15},
      exitOnOutsideClick: false,
      editOnClick: false,
    });

    $('#canvas-editor').append(window.drawer.getHtml());
    window.drawer.onInsert();
  });
  export default {
    name: 'Drawer',
    methods: {
    },
    computed: {
    },
  }
</script>
