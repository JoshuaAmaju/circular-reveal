import {
  Component,
  Prop,
  h,
  Element,
  Watch,
  Event,
  EventEmitter
} from "@stencil/core";
import { getRect, getBounds } from "../../utils/utils";

@Component({
  shadow: true,
  tag: "circular-reveal",
  styleUrl: "circular-reveal.css"
})
export class CircularReveal {
  targetRect: any;

  actualTop: number;
  actualLeft: number;
  actualWidth: number;
  actualHeight: number;

  @Element() host: any;

  @Prop() target: string;
  @Prop() easing: string;
  @Prop() duration: number;
  @Prop() reveal: boolean = false;
  @Prop({ attribute: "target-bounds" }) targetBounds: string;

  @Prop({ attribute: "final-width" }) finalWidth: number;
  @Prop({ attribute: "final-height" }) finalHeight: number;

  @Event({ eventName: "afterhide" }) afterHideEvent: EventEmitter;
  @Event({ eventName: "afterreveal" }) afterRevealEvent: EventEmitter;

  @Event({ eventName: "beforehide" }) beforeHideEvent: EventEmitter;
  @Event({ eventName: "beforereveal" }) beforeRevealEvent: EventEmitter;

  componentDidLoad() {
    let target = this.host;
    this.targetRect = getRect(target);

    this.actualTop = this.targetRect.top;
    this.actualLeft = this.targetRect.left;
    this.actualWidth = this.targetRect.width;
    this.actualHeight = this.targetRect.height;

    if (this.finalWidth) this.actualWidth = this.finalWidth;
    if (this.finalHeight) this.actualHeight = this.finalHeight;

    let hostStyle = ":host {";

    if (this.duration) {
      hostStyle += `transition-duration: ${this.duration}s;`;
    }

    if (this.easing) {
      hostStyle += `transition-timing-function: ${this.easing};`;
    }

    if (this.duration || this.easing) {
      const root = this.host.shadowRoot;
      const style = document.createElement("style");

      hostStyle += "}";
      style.innerHTML = hostStyle;
      root.appendChild(style);
    }

    if (this.target) {
      target = document.querySelector(this.target);
      this.targetRect = getRect(target);
    }

    if (this.targetBounds) {
      this.targetRect = getBounds(this.targetBounds);
    }

    const { top, left, radius } = this.calcRevealCenter(this.targetRect);
    this.clip({ top, left, radius: `${radius}px` });
  }

  hide() {
    this.beforeHideEvent.emit();
    const { top, left, radius } = this.calcRevealCenter(this.targetRect);
    this.clip({ top, left, radius: `${radius}px` });

    const hideEnd = () => {
      this.afterHideEvent.emit();
      this.host.removeEventListener("transitionend", hideEnd);
    };

    this.host.addEventListener("transitionend", hideEnd);
  }

  show() {
    this.beforeRevealEvent.emit();
    this.clip({
      ...this.calcRevealCenter({
        top: this.actualTop,
        left: this.actualLeft,
        width: this.actualWidth,
        height: this.actualHeight
      }),
      radius: `100%`
    });

    const revealEnd = () => {
      this.afterRevealEvent.emit();
      this.host.removeEventListener("transitionend", revealEnd);
    };

    this.host.addEventListener("transitionend", revealEnd);
  }

  /**
   * Calculates the top, left and radius of
   * the circular reveal from target position.
   * @param rect
   */
  calcRevealCenter(rect: any): any {
    const { top, left, width, height } = rect;
    const radius = width / 2;
    const positionedTop = height / 2 + top;
    const positionedLeft = width / 2 + left;
    return {
      radius,
      top: positionedTop,
      left: positionedLeft
    };
  }

  /**
   *
   * @param element
   * @param points: {top, left, radius}
   */
  clip(points: any) {
    const { radius, top, left } = points;
    const root = this.host.shadowRoot;
    let style = root.querySelector("#clip-style");

    if (!style) {
      style = document.createElement("style");
      style.id = "clip-style";
      root.appendChild(style);
    }

    style.innerHTML = `
      :host {clip-path: circle(${radius} at ${left}px ${top}px)}
    `;
  }

  @Watch("reveal")
  shouldReveal(reveal: boolean) {
    if (reveal) {
      this.show();
    } else {
      this.hide();
    }
  }

  @Watch("target")
  updateTarget(newTarget: string) {
    const target = document.querySelector(newTarget);
    this.targetRect = getRect(target);
  }

  @Watch("targetBounds")
  setBounds(newBounds: string) {
    if (newBounds) {
      this.targetBounds = newBounds;
      this.targetRect = getBounds(newBounds);
    }
  }

  render() {
    return <slot />;
  }
}
