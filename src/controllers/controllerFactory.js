import asyncHandler from "express-async-handler";
import { where } from "sequelize";

export class ControllerFactory {
  constructor(model) {
    this.model = model;
  }

  //   create record
  create = asyncHandler(async (req, res) => {
    const saved = await this.model.create(req.body);
    res.status(201).json(saved);
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
    const records = await this.model.findAll();
    res.status(200).json({
      status: "success",
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
      throw new Error("Record Not Found");
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
      throw new Error("Record Not Found");
    }

    await record.destroy();

    res.status(200).json({
      status: "success",
      data: record,
    });
  });
}
