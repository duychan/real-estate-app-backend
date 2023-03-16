import { estateService } from '../services/index.js';
import { handleError } from '../utils/errHandler.js';
import status from 'http-status';
import factory from './handleFactory.js';
import EstateModel from '../models/estate.js';

const createEstate = async (req, res) => {
  try {
    const estateAdded = await estateService.createEstate({
      salerId: req.user.id,
      body: req.body,
      files: req.files,
    });
    return res.status(status.OK).json({
      message: status[status.CREATED],
      data: { records: estateAdded },
    });
  } catch (error) {
    handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
  }
};

const getAllEstate = factory.getAll(EstateModel);

const getInfoEstate = async (req, res) => {
  try {
    const estateId = req.params.id;
    const estate = await estateService.getInfoEstate(estateId);
    return res.status(status.OK).json({
      message: status[status.OK],
      data: {
        records: estate,
      },
    });
  } catch (error) {
    handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
  }
};

const updateEstate = async (req, res) => {
  const estateId = req.params.id;
  try {
    const estateUpdated = await estateService.updateEstate({
      estateId,
      body: req.body,
      files: req.files,
    });
    return res.status(status.OK).json({
      message: status[status.OK],
      data: { records: estateUpdated },
    });
  } catch (error) {
    handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
  }
};

const deleteEstate = async (req, res) => {
  try {
    const estateId = req.params.id;
    const estateDeleted = await estateService.deleteEstate(estateId);
    return res.status(status.OK).json({
      message: status[status.OK],
      data: { records: estateDeleted },
    });
  } catch (error) {
    handleError(error.message, res, status.INTERNAL_SERVER_ERROR);
  }
};

export {
  createEstate,
  getInfoEstate,
  deleteEstate,
  getAllEstate,
  updateEstate,
};
