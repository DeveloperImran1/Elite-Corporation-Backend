import { Order } from '../order/order.model';

const now = new Date();
const sevenDaysAgo = new Date(now).setDate(now.getDate() - 7); // ajker date theke 7 din ager date ke get korbe.
const thirtyDaysAgo = new Date(now).setDate(now.getDate() - 30);

const getOrderStats = async () => {
  const totalOrderPromise = Order.countDocuments().lean(); // last a .lean() use korle aro better hoi.

  const totalRequestedOrderPromise = Order.countDocuments({
    status: 'Pending',
  });

  const totalDeliveredOrderPromise = Order.countDocuments({
    status: 'Delivered',
  });
  const totalCancelledOrderPromise = Order.countDocuments({
    status: 'Cancelled',
  });

  const newOrderInLast7DaysPromise = Order.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });

  const newOrderInLast30DaysPromise = Order.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  });

  const [
    totalOrder,
    totalRequestedOrder,
    totalDeliveredOrder,
    totalCancelledOrder,
    newOrderInLast7Days,
    newOrderInLast30Days,
  ] = await Promise.all([
    totalOrderPromise,
    totalRequestedOrderPromise,
    totalDeliveredOrderPromise,
    totalCancelledOrderPromise,
    newOrderInLast7DaysPromise,
    newOrderInLast30DaysPromise,
  ]);
  return {
    totalOrder,
    totalRequestedOrder,
    totalDeliveredOrder,
    totalCancelledOrder,
    newOrderInLast7Days,
    newOrderInLast30Days,
  };
};

export const StatsServices = {
  getOrderStats,
};
