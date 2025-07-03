import EmblaCarousel, { type EmblaOptionsType } from 'embla-carousel'
import { setupTweenParallax } from './EmblaCarouselTweenParallax'
import { addPrevNextBtnsClickHandlers } from './EmblaCarouselArrowButtons'
import Autoplay from "embla-carousel-autoplay";
import '../../styles/embla.css'

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }

const emblaNode = <HTMLElement>document.querySelector('.embla')
const viewportNode = <HTMLElement>emblaNode.querySelector('.embla__viewport')
const prevBtn = <HTMLElement>emblaNode.querySelector('.embla__button--prev')
const nextBtn = <HTMLElement>emblaNode.querySelector('.embla__button--next')

const plugins = [Autoplay()];

const emblaApi = EmblaCarousel(viewportNode, OPTIONS, plugins)
const removeTweenParallax = setupTweenParallax(emblaApi)

const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
  emblaApi,
  prevBtn,
  nextBtn
)

emblaApi
  .on('destroy', removeTweenParallax)
  .on('destroy', removePrevNextBtnsClickHandlers)
