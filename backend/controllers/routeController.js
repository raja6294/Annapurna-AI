const Route = require('../models/Route');
const { calculateRoute } = require('../services/logistics/routeService');

const calculateRouteBetween = async (req, res, next) => {
  try {
    const { originLat, originLng, destLat, destLng } = req.query;
    if (!originLat || !originLng || !destLat || !destLng) {
      return res.status(400).json({ success: false, message: 'Origin and destination coordinates required' });
    }

    const route = await calculateRoute(
      Number(originLat),
      Number(originLng),
      Number(destLat),
      Number(destLng)
    );

    res.json({ success: true, data: route });
  } catch (error) {
    next(error);
  }
};

const getRouteByPickup = async (req, res, next) => {
  try {
    const route = await Route.findOne({ pickupId: req.params.pickupId });
    if (!route) {
      return res.status(404).json({ success: false, message: 'Route not found' });
    }
    res.json({ success: true, data: route });
  } catch (error) {
    next(error);
  }
};

module.exports = { calculateRouteBetween, getRouteByPickup };
