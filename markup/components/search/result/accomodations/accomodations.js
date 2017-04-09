export default class Accomodations {
  constructor() {
    this.$accomodations = $('.js-apartment');
  }

  filter(accommodations) {

    for (let key in accommodations) {
      $(`.js-apartment[data-apartment-id="${accommodations[key].id}"]`)
          .removeClass('_filter-hidden')
          .addClass('_filter-visible');
    }

    this.$accomodations.map((idx, el) => {
      if (!$(el).hasClass('_filter-visible')) {
        $(el).addClass('_filter-hidden');
      }
    });
  }

  filterClear() {
    this.$accomodations.map((idx, el) => {
      $(el).removeClass('_filter-hidden _filter-visible');
    });
    console.log('filter:clear');
  }
}