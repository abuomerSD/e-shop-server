import { ControllerFactory } from "./controllerFactory.js";
import User from "../models/user.model.js";

const factory = new ControllerFactory(User);

export const create = factory.create;

export const findOne = factory.findOne;

export const findAll = factory.findAll;

export const updateOne = factory.updateOne;

export const deleteOne = factory.deleteOne;
