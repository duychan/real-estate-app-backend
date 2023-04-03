const APIFeatures = class {
  // querytring = req.query;
  // query = model.find();
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'province',
      'priceMin',
      'priceMax',
      'areaMin',
      'areaMax',
      'maxOfBedRoom',
      'minOfBedRoom',
      'maxOfBathRoom',
      'minOfBathRoom',
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|in|regex)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const pageDefault = 1;
    const limitDefault = 10;
    const page = this.queryString.page * 1 || pageDefault;
    const limit = this.queryString.limit * 1 || limitDefault;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  searchAllEstatesInSection() {
    if (this.queryString.section) {
      const { section } = this.queryString;
      this.query = this.query.find({
        address: { $regex: new RegExp(section) },
      });
    }
    return this;
  }
  searchInRange(fieldName, rangeMax, rangeMin) {
    const condition = {};
    rangeMax = parseInt(rangeMax);
    rangeMin = parseInt(rangeMin);
    if (rangeMax && rangeMin) {
      //search in range
      condition[fieldName] = { $lte: rangeMax, $gte: rangeMin };
    } else if (rangeMin) {
      // get all greater
      condition[fieldName] = { $gte: rangeMin };
    } else if (rangeMax) {
      // get all less than
      condition[fieldName] = { $lte: rangeMax };
    }
    return condition;
  }
  searchInRangePriceAndAreaAndBathRoomAndBedRoom() {
    const {
      priceMin,
      priceMax,
      areaMin,
      areaMax,
      maxOfBedRoom,
      minOfBedRoom,
      maxOfBathRoom,
      minOfBathRoom,
    } = this.queryString;
    this.query = this.query.find(
      this.searchInRange('price', priceMax, priceMin)
    );
    this.query = this.query.find(this.searchInRange('area', areaMax, areaMin));
    this.query = this.query.find(
      this.searchInRange('bedRoom', maxOfBedRoom, minOfBedRoom)
    );
    this.query = this.query.find(
      this.searchInRange('bathRoom', maxOfBathRoom, minOfBathRoom)
    );

    return this;
  }
};
export default APIFeatures;
