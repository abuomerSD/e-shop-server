import { Op } from "sequelize";

export class ApiFeatures {
  constructor(reqQuery: any) {
    this.reqQuery = reqQuery;
    this.whereClause = {};
  }

  reqQuery: any = null;
  whereClause: any = null;
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
    const allowedColumns = ["name", "email", "title", "categoryId", "brandId"];
    if (!allowedColumns.includes(this.reqQuery.searchCol)) return this; // to prevent SQL Injection

    if (this.reqQuery.search && this.reqQuery.searchCol) {
      const search = this.reqQuery.search;
      const searchCol = this.reqQuery.searchCol;
      this.whereClause.where = {
        [searchCol]: {
          [Op.like]: `%${search}%`,
        },
      };
    }
    return this;
  }
}
