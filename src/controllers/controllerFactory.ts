import asyncHandler from "express-async-handler";
import fs from "fs";

import ApiError from "../utils/apiError.js";
import { ApiFeatures } from "../utils/apiFeatures.js";

class ControllerFactory {
  constructor(model: any) {
    this.model = model;
  }

  //   create record
  create = asyncHandler(async (req, res) => {
    const saved = await this.model.create(req.body);
    res.status(201).json({
      status: "success",
      data: saved,
    });
  });

  //   find record by id
  findOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await this.model.findOne({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: "success",
      data: record,
    });
  });

  //   find All records
  findAll = asyncHandler(async (req, res) => {
    const apiFeatures = new ApiFeatures(req.query);
    const whereClause = apiFeatures.search().paginate().sort().whereClause;
    console.log("whereClause", whereClause);
    const records = await this.model.findAll(whereClause);
    const results = records.length;
    res.status(200).json({
      status: "success",
      results,
      data: records,
    });
  });

  //   update record by id
  updateOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updatedRecord = await this.updateOneHelper(this.model, id, data);

    res.status(200).json({
      status: "success",
      data: updatedRecord,
    });
  });

  updateOneHelper = async (model, id, data) => {
    const record = await this.model.findOne({
      where: {
        id,
      },
    });

    if (!record) {
      throw new ApiError(400, "Record Not Found");
    }
    // check if this model saves images or files to delete the old file
    if (record.image) {
      try {
        fs.unlink(`uploads/${record.image}`, () => {});
      } catch (error) {
        throw new ApiError(400, error.message);
      }
    }

    await record.update(data);
    return record;
  };

  //   delete record by id
  deleteOne = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const record = await this.model.findOne({
      where: {
        id,
      },
    });

    if (!record) {
      throw new ApiError(400, "Record Not Found");
    }

    await record.destroy();

    res.status(200).json({
      status: "success",
      data: record,
    });
  });
}

export default ControllerFactory;
