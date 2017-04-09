/**
 * @name Accomodations
 * @class Class for controlling displaying apartments by filter
 * @param dataToFilter {Array} array of objects for filtration
 **/

export default class Accomodations {
  constructor() {
    this.$accomodations = $('.js-apartment');
  }

  //Show apartments only by filter match
  filter(accommodations) {

    for (let key in accommodations) {
      $(`.js-apartment[data-apartment-id="${accommodations[key].id}"]`)
          .removeClass('_filter-hidden')
          .toggleClass('_filter-visible');
    }

    this.$accomodations.map((idx, el) => {
      if (!$(el).hasClass('_filter-visible')) {
        $(el).addClass('_filter-hidden');
      }
    });
  }

  //Show all apartments
  filterClear() {
    this.$accomodations.map((idx, el) => {
      $(el).removeClass('_filter-hidden _filter-visible');
    });
  }
}
