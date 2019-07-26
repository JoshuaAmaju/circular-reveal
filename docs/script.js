const nextReveal = document.querySelector(".next-reveal");
const previousReveal = document.querySelector(".previous-reveal");

const revealObj = [
  {
    isActive: true,
    title: "Trees Near Swimming Pool",
    photographer: "Julie Aagaard",
    background:
      "https://images.pexels.com/photos/2096983/pexels-photo-2096983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    isActive: false,
    photographer: "David Florin",
    title: "Woman With Red Lipstick at the Pier",
    background:
      "https://images.pexels.com/photos/2561324/pexels-photo-2561324.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    isActive: false,
    title: "Two Female and Male Sketch Drawings on Wall",
    photographer: "Marta Dzedyshko",
    background:
      "https://images.pexels.com/photos/2067638/pexels-photo-2067638.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    isActive: false,
    photographer: "Todd Trapani",
    title: "Lake With Green Leafed Trees",
    background:
      "https://images.pexels.com/photos/1198817/pexels-photo-1198817.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  },
  {
    isActive: false,
    title: "Photo of Woman Laughing",
    photographer: "Caio Cardenas",
    background:
      "https://images.pexels.com/photos/2101841/pexels-photo-2101841.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }
];

class Revealer {
  constructor({ title, photographer, background }) {
    this.circularReveal = document.createElement("circular-reveal");
    const wrapper = document.createElement("div");
    const _title = document.createElement("h1");
    const _photographer = document.createElement("h3");
    _title.textContent = title;
    _photographer.textContent = photographer;
    this.circularReveal.style.backgroundImage = `url(${background})`;
    this.circularReveal.setAttribute("duration", "0.3");
    wrapper.appendChild(_title);
    wrapper.appendChild(_photographer);
    this.circularReveal.appendChild(wrapper);
  }

  remove() {
    this.circularReveal.remove();
  }

  setTarget(target) {
    this.circularReveal.setAttribute("target", target);
  }

  reveal() {
    this.circularReveal.setAttribute("reveal", "true");
  }

  close() {
    this.circularReveal.setAttribute("reveal", "false");
  }
}

class RevealController {
  constructor() {
    this.parent = document.querySelector(".reveal-wrapper");
    this.current = this.newReveal(0);
    this.current.reveal();
  }

  newReveal(index) {
    const item = revealObj[index];
    item.isActive = true;
    const revealer = new Revealer(item);
    this.parent.appendChild(revealer.circularReveal);
    return revealer;
  }

  next() {
    let index;

    revealObj.map((item, i) => {
      if (item.isActive) {
        if (i !== revealObj.length - 1) {
          index = i + 1;
        } else {
          index = 0;
        }
      }

      item.isActive = false;
    });

    const revealer = this.newReveal(index);
    const reveal = revealer.circularReveal;
    const current = this.current;

    revealer.setTarget(`.${nextReveal.className}`);
    setTimeout(() => revealer.reveal(), 100);

    reveal.addEventListener("afterreveal", () => {
      if (current) current.remove();
      this.current = revealer;
    });
  }

  previous() {
    let index;

    revealObj.map((item, i) => {
      if (item.isActive) {
        if (i !== 0) {
          index = i - 1;
        } else {
          index = revealObj.length - 1;
        }
      }

      item.isActive = false;
    });

    const revealer = this.newReveal(index);
    const reveal = revealer.circularReveal;
    const current = this.current;

    revealer.setTarget(`.${previousReveal.className}`);
    setTimeout(() => revealer.reveal(), 100);

    reveal.addEventListener("afterreveal", () => {
      if (current) current.remove();
      this.current = revealer;
    });
  }
}

const controller = new RevealController();
nextReveal.onclick = () => controller.next();
previousReveal.onclick = () => controller.previous();
