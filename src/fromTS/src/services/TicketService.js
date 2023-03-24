import { getData, getFirst, isValid, OrderClient, TicketClient } from 'clients';
import { HTTP_STATUS } from 'constants/Enums';

const getListTicket = async ({ ctx, offset, limit, createdFrom, createdTo }) => {
  const result = await TicketClient.getListTicket({ ctx, offset, limit, getTotal: true, createdFrom, createdTo });
  if (!isValid(result)) return result;
  const tickets = getData(result);

  const ticketList = await Promise.all(
    tickets.map(async (ticket) => {
      if (!ticket.orderId) return { ...ticket, isOrderExist: false };
      const orderRes = await OrderClient.getOrderById({ id: ticket.orderId, ctx });
      const order = getFirst(orderRes);
      return { ...ticket, isOrderExist: isValid(orderRes), statusOrder: order?.status || '' };
    }),
  );
  return {
    status: HTTP_STATUS.Ok,
    data: ticketList,
    total: result.total,
  };
};

export default { getListTicket };
