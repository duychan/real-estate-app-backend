import { getAllRoles } from './role.controller.js';
import { getAllOrderStatus } from './orderStatus.controller.js';
import { getAllEstateStatus } from './estateStatus.controller.js';
import { getAllEstateType } from './estateType.controller.js';
import { createEstate } from './estate.controller.js';

const roleController = {
  getAllRoles,
};

const orderStatusController = {
  getAllOrderStatus,
};

const estateStatusController = {
  getAllEstateStatus,
};

const estateTypeController = {
  getAllEstateType,
};
const estateController = {
  createEstate,
};

export {
  roleController,
  orderStatusController,
  estateStatusController,
  estateTypeController,
  estateController,
};
