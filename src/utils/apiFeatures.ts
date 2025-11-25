import { Op } from "sequelize";

export class ApiFeatures {
  constructor(reqQuery) {
    this.reqQuery = reqQuery;
    this.whereClause = {};
  }

  paginate() {
    if (this.reqQuery.page && this.reqQuery.limit) {
      const page = Number(this.reqQuery.page);
      const limit = Number(this.reqQuery.limit);
      const offset = (page - 1) * limit;
      this.whereClause.offset = offset;
      this.whereClause.limit = limit;
    }
    return this;
  }

  sort() {
    if (this.reqQuery.sort) {
      const sort = this.reqQuery.sort;
      if (sort.startsWith("-")) {
        this.whereClause.order = [[sort.substring(1), "DESC"]];
      } else {
        this.whereClause.order = [sort];
      }
    }
    return this;
  }

  search() {
    if (this.reqQuery.search && this.reqQuery.searchCol) {
      const search = this.reqQuery.search;
      const searchCol = this.reqQuery.searchCol;
      this.whereClause.where = {
        [searchCol]: {
          [Op.iLike]: `%${search}%`,
        },
      };
    }
    return this;
  }
}
