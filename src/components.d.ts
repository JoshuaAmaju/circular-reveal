/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface CircularReveal {
    'duration': number;
    'easing': string;
    'finalHeight': number;
    'finalWidth': number;
    'reveal': boolean;
    'target': string;
    'targetBounds': string;
  }
}

declare global {


  interface HTMLCircularRevealElement extends Components.CircularReveal, HTMLStencilElement {}
  var HTMLCircularRevealElement: {
    prototype: HTMLCircularRevealElement;
    new (): HTMLCircularRevealElement;
  };
  interface HTMLElementTagNameMap {
    'circular-reveal': HTMLCircularRevealElement;
  }
}

declare namespace LocalJSX {
  interface CircularReveal extends JSXBase.HTMLAttributes<HTMLCircularRevealElement> {
    'duration'?: number;
    'easing'?: string;
    'finalHeight'?: number;
    'finalWidth'?: number;
    'onAfterhide'?: (event: CustomEvent<any>) => void;
    'onAfterreveal'?: (event: CustomEvent<any>) => void;
    'onBeforehide'?: (event: CustomEvent<any>) => void;
    'onBeforereveal'?: (event: CustomEvent<any>) => void;
    'reveal'?: boolean;
    'target'?: string;
    'targetBounds'?: string;
  }

  interface IntrinsicElements {
    'circular-reveal': CircularReveal;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


