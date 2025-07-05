import { Fancybox } from "@fancyapps/ui";
import { Carousel } from "@fancyapps/ui/dist/carousel/";
import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.js";
import { Thumbs } from "@fancyapps/ui/dist/carousel/carousel.thumbs.js";
import { Arrows } from "@fancyapps/ui/dist/carousel/carousel.arrows.js";
import "../../../node_modules/@fancyapps/ui/dist/carousel/carousel.arrows.css";
import "../../../node_modules/@fancyapps/ui/dist/carousel/carousel.thumbs.css";
import "../../../node_modules/@fancyapps/ui/dist/carousel/carousel.css";
import "../../../node_modules/@fancyapps/ui/dist/fancybox/fancybox.css";
import "@fancyapps/ui/dist/carousel/carousel.autoplay.css";

const container = document.getElementById("gallery-carousel");
const options = {
  Autoplay: {
    timeout: 5000,
  },
  Thumbs: {
    type: "modern",
  },
};

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

Carousel(container, options, { Autoplay ,Thumbs, Arrows }).init();
