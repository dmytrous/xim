/**
 * @name AmentitiesFilter
 * @class Class for filtration search results by amentities
 * @param dataToFilter {Array} array of objects for filtration
 **/

export default class AmentitiesFilter {
  constructor(dataToFilter) {
    this.apartmentsArray = dataToFilter;
    this.resultArray = [];
    this.filters = [];
    this.$amentitiesForm = $('.js-amentities-form');
    this.$amentitiesFilter = $('.js-amentities-filter');
    this.$filterTags = $('.js-search-filters');

    //Remove filter by click on filter tag
    this.$filterTags.on('click', '.js-filter-tag-close', (e) => {
      let $target = $(e.target);
      let filterValue = $target.parent().data('filter').trim();
      this.removeFilter(filterValue);
    });

    //Make filtration on filter check
    this.$amentitiesForm.on('change', this.$amentitiesFilter, (e) => {
      let filter = $(e.target).val().trim();

      if (this.filters.indexOf(filter) === -1) {
        this.addFilter(filter);
        this.filteringApartments();
      } else {
        this.removeFilter(filter);
        if (!this.filters.length) return;
        this.filteringApartments();
      }

    });
  }

  /**@method Add filter to filtration criteria
   * @name addFilter
   * @param filter {string} name of filter criteria
   * */
  addFilter(filter) {
    this.filters.push(filter);
    this.addFilterTag(filter);
  }

  /**@method Remove filter to filtration criteria
   * @name removeFilter
   * @param filter {string} name of filter criteria
   * */
  removeFilter(filter) {
    this.filters.splice(this.filters.indexOf(filter), 1);
    this.removeFilterTag(filter);
    //Make clear if no filters
    if (!this.filters.length) this.flush();
  }

  /**@method Add selected filter tag to tag panel
   * @name addFilterTag
   * @param filter {string} name of filter criteria
   * */
  addFilterTag(filter) {
    let $filterTag = `<span class="filter-tag js-filter-tag" data-filter="${filter}">${filter}<button type="button" class="btn filter-tag__close js-filter-tag-close"></button></span>`;
    this.$filterTags.append($filterTag).fadeIn();
  };

  /**@method Add selected filter tag to tag panel
   * @name removeFilterTag
   * @param filter {string} name of filter criteria
   * */
  removeFilterTag(filter) {
    this.$filterTags.find(`[data-filter="${filter}"]`).fadeOut().remove();
    this.uncheck(filter);
  }

  /**@method Uncheck filter checkbox on filter tag delete
   * @name uncheck
   * @param filter {string} name of filter criteria
   * */
  uncheck(filter) {
    this.$amentitiesForm.find(`input[value="${filter}"]`).prop('checked', false);
  }

  /**@method Make filtration by array and return results in new array
   * @name filteringApartments
   * */
  filteringApartments() {
    this.resultArray = this.apartmentsArray.filter((item) => {
          for (let i = 0; i < this.filters.length; i++) {
            if (item.amentities.indexOf(this.filters[i]) === -1) {
              return false;
            }
          }

          return true;
        }
    );

    //If no results bootstrap event
    if (!this.resultArray.length) {
      $(document).trigger('filter:no-result');
      return;
    }

    //Trigger custom event which reports on successful filtering
    $(document).trigger('filter:amentities', [this.resultArray]);
  }

  /**@method Bootstrap message about no results or clear
   * */
  flush() {
    $(document).trigger('filter:clear');
  }

}
