
export default class AmentitiesFilter {
  constructor(filterData) {
    this.apartmentsArray = filterData;
    this.resultArray = [];
    this.filters = [];
    this.$amentitiesForm = $('.js-amentities-form');
    this.$amentitiesFilter = $('.js-amentities-filter');
    this.$filterTags = $('.js-search-filters');

    this.$filterTags.on('click', '.js-filter-tag-close', (e) => {
      let $target = $(e.target);
      let filterValue = $target.parent().data('filter').trim();
      this.removeFilter(filterValue);
      this.removeTag(filterValue);
      console.log(this.filters);
    });

    this.$amentitiesFilter.on('change', (e) => {
      let filter = $(e.target).val().trim();

      if (this.filters.indexOf(filter) === -1) {

        this.filters.push(filter);
        this.addFilterTag(filter);
        this.filterApartments();
        console.log(this.filters);

      } else {

        this.removeFilter(filter);
        this.removeTag(filter);

        if (!this.filters.length) {
          $(document).trigger('filter:clear');
          return;
        }

        this.filterApartments();
      };

    });
  }

  addFilterTag(name) {
    let $filterTag = `<span class="filter-tag js-filter-tag"  data-filter="${name}">${name}<button type="button" class="btn filter-tag__close js-filter-tag-close"></button></span>`;
    this.$filterTags.append($filterTag);
  };

  removeFilter(filter) {
    this.filters.splice(this.filters.indexOf(filter), 1);
    if (!this.filters.length) {
      $(document).trigger('filter:clear');
    }
  }

  removeTag(filterName) {
    this.$filterTags.find(`[data-filter="${filterName}"]`).remove();
  }

  filterApartments() {
    this.resultArray = this.apartmentsArray.filter((item) => {
          for (let i = 0; i < this.filters.length; i++) {
            if (item.amentities.indexOf(this.filters[i]) === -1) {
              return false;
            } else {
              return true;
            }
          }
        }
    );
    $(document).trigger('filter:amentities', [this.resultArray]);
  }
}
